/*!
 * jQuery Validation Plugin v1.13.1
 *
 * http://jqueryvalidation.org/
 *
 * Copyright (c) 2014 Jörn Zaefferer
 * Released under the MIT license
 * 学习地址：http://www.w3cschool.cc/jquery/jquery-plugin-validate.html
 */
(function(factory) {
	if (typeof define === "function" && define.amd) {
		define(["jquery"], factory);
	} else {
		factory(jQuery);
	}
}(function($) {

	$.extend($.fn, {
		// http://jqueryvalidation.org/validate/
		validate: function(options) {

			// if nothing is selected, return nothing; can't chain anyway
			if (!this.length) {
				if (options && options.debug && window.console) {
					console.warn("Nothing selected, can't validate, returning nothing.");
				}
				return;
			}

			// check if a validator for this form was already created
			var validator = $.data(this[0], "validator");
			if (validator) {
				return validator;
			}

			// Add novalidate tag if HTML5.
			this.attr("novalidate", "novalidate");

			validator = new $.validator(options, this[0]);
			$.data(this[0], "validator", validator);

			if (validator.settings.onsubmit) {

				this.validateDelegate(":submit", "click change", function(event) {
					if (validator.settings.submitHandler) {
						validator.submitButton = event.target;
					}
					// allow suppressing validation by adding a cancel class to the submit button
					if ($(event.target).hasClass("cancel")) {
						validator.cancelSubmit = true;
					}

					// allow suppressing validation by adding the html5 formnovalidate attribute to the submit button
					if ($(event.target).attr("formnovalidate") !== undefined) {
						validator.cancelSubmit = true;
					}
				});

				// validate the form on submit
				this.submit(function(event) {
					if (validator.settings.debug) {
						// prevent form submit to be able to see console output
						event.preventDefault();
					}

					function handle() {
						var hidden, result;
						if (validator.settings.submitHandler) {
							if (validator.submitButton) {
								// insert a hidden input as a replacement for the missing submit button
								hidden = $("<input type='hidden'/>")
									.attr("name", validator.submitButton.name)
									.val($(validator.submitButton).val())
									.appendTo(validator.currentForm);
							}
							result = validator.settings.submitHandler.call(validator, validator.currentForm, event);
							if (validator.submitButton) {
								// and clean up afterwards; thanks to no-block-scope, hidden can be referenced
								hidden.remove();
							}
							if (result !== undefined) {
								return result;
							}
							return false;
						}
						return true;
					}

					// prevent submit for invalid forms or custom submit handlers
					if (validator.cancelSubmit) {
						validator.cancelSubmit = false;
						return handle();
					}
					if (validator.form()) {
						if (validator.pendingRequest) {
							validator.formSubmitted = true;
							return false;
						}
						return handle();
					} else {
						validator.focusInvalid();
						return false;
					}
				});
			}

			return validator;
		},
		// http://jqueryvalidation.org/valid/
		valid: function() {
			var valid, validator;

			if ($(this[0]).is("form")) {
				valid = this.validate().form();
			} else {
				valid = true;
				validator = $(this[0].form).validate();
				this.each(function() {
					valid = validator.element(this) && valid;
				});
			}
			return valid;
		},
		// attributes: space separated list of attributes to retrieve and remove
		removeAttrs: function(attributes) {
			var result = {},
				$element = this;
			$.each(attributes.split(/\s/), function(index, value) {
				result[value] = $element.attr(value);
				$element.removeAttr(value);
			});
			return result;
		},
		// http://jqueryvalidation.org/rules/
		rules: function(command, argument) {
			var element = this[0],
				settings, staticRules, existingRules, data, param, filtered;

			if (command) {
				settings = $.data(element.form, "validator").settings;
				staticRules = settings.rules;
				existingRules = $.validator.staticRules(element);
				switch (command) {
					case "add":
						$.extend(existingRules, $.validator.normalizeRule(argument));
						// remove messages from rules, but allow them to be set separately
						delete existingRules.messages;
						staticRules[element.name] = existingRules;
						if (argument.messages) {
							settings.messages[element.name] = $.extend(settings.messages[element.name], argument.messages);
						}
						break;
					case "remove":
						if (!argument) {
							delete staticRules[element.name];
							return existingRules;
						}
						filtered = {};
						$.each(argument.split(/\s/), function(index, method) {
							filtered[method] = existingRules[method];
							delete existingRules[method];
							if (method === "required") {
								$(element).removeAttr("aria-required");
							}
						});
						return filtered;
				}
			}

			data = $.validator.normalizeRules(
				$.extend({},
					$.validator.classRules(element),
					$.validator.attributeRules(element),
					$.validator.dataRules(element),
					$.validator.staticRules(element)
				), element);

			// make sure required is at front
			if (data.required) {
				param = data.required;
				delete data.required;
				data = $.extend({
					required: param
				}, data);
				$(element).attr("aria-required", "true");
			}

			// make sure remote is at back
			if (data.remote) {
				param = data.remote;
				delete data.remote;
				data = $.extend(data, {
					remote: param
				});
			}

			return data;
		}
	});

	// Custom selectors
	$.extend($.expr[":"], {
		// http://jqueryvalidation.org/blank-selector/
		blank: function(a) {
			return !$.trim("" + $(a).val());
		},
		// http://jqueryvalidation.org/filled-selector/
		filled: function(a) {
			return !!$.trim("" + $(a).val());
		},
		// http://jqueryvalidation.org/unchecked-selector/
		unchecked: function(a) {
			return !$(a).prop("checked");
		}
	});

	// constructor for validator
	$.validator = function(options, form) {
		this.settings = $.extend(true, {}, $.validator.defaults, options);
		this.currentForm = form;
		this.init();
	};

	// http://jqueryvalidation.org/jQuery.validator.format/
	$.validator.format = function(source, params) {
		if (arguments.length === 1) {
			return function() {
				var args = $.makeArray(arguments);
				args.unshift(source);
				return $.validator.format.apply(this, args);
			};
		}
		if (arguments.length > 2 && params.constructor !== Array) {
			params = $.makeArray(arguments).slice(1);
		}
		if (params.constructor !== Array) {
			params = [params];
		}
		$.each(params, function(i, n) {
			source = source.replace(new RegExp("\\{" + i + "\\}", "g"), function() {
				return n;
			});
		});
		return source;
	};

	$.extend($.validator, {

		defaults: {
			messages: {},
			groups: {},
			rules: {},
			errorClass: "error",
			validClass: "valid",
			errorElement: "label",
			focusCleanup: false,
			focusInvalid: true,
			errorContainer: $([]),
			errorLabelContainer: $([]),
			onsubmit: true,
			ignore: ":hidden",
			ignoreTitle: false,
			onfocusin: function(element) {
				this.lastActive = element;

				// Hide error label and remove error class on focus if enabled
				if (this.settings.focusCleanup) {
					if (this.settings.unhighlight) {
						this.settings.unhighlight.call(this, element, this.settings.errorClass, this.settings.validClass);
					}
					this.hideThese(this.errorsFor(element));
				}
			},
			onfocusout: function(element) {
				if (!this.checkable(element) && (element.name in this.submitted || !this.optional(element))) {
					this.element(element);
				}
			},
			onkeyup: function(element, event) {
				if (event.which === 9 && this.elementValue(element) === "") {
					return;
				} else if (element.name in this.submitted || element === this.lastElement) {
					this.element(element);
				}
			},
			onclick: function(element) {
				// click on selects, radiobuttons and checkboxes
				if (element.name in this.submitted) {
					this.element(element);

					// or option elements, check parent select in that case
				} else if (element.parentNode.name in this.submitted) {
					this.element(element.parentNode);
				}
			},
			onchange: function(element) {
				// change on selects, radiobuttons and checkboxes
				if (element.name in this.submitted) {
					this.element(element);

					// or option elements, check parent select in that case
				} else if (element.parentNode.name in this.submitted) {
					this.element(element.parentNode);
				}
			},
			highlight: function(element, errorClass, validClass) {
				if (element.type === "radio") {
					this.findByName(element.name).addClass(errorClass).removeClass(validClass);
				} else {
					$(element).addClass(errorClass).removeClass(validClass);
				}
			},
			unhighlight: function(element, errorClass, validClass) {
				if (element.type === "radio") {
					this.findByName(element.name).removeClass(errorClass).addClass(validClass);
				} else {
					$(element).removeClass(errorClass).addClass(validClass);
				}
			}
		},

		// http://jqueryvalidation.org/jQuery.validator.setDefaults/
		setDefaults: function(settings) {
			$.extend($.validator.defaults, settings);
		},

		messages: {
			required: "This field is required.",
			remote: "Please fix this field.",
			email: "Please enter a valid email address.",
			url: "Please enter a valid URL.",
			date: "Please enter a valid date.",
			dateISO: "Please enter a valid date ( ISO ).",
			number: "Please enter a valid number.",
			digits: "Please enter only digits.",
			creditcard: "Please enter a valid credit card number.",
			equalTo: "Please enter the same value again.",
			maxlength: $.validator.format("Please enter no more than {0} characters."),
			minlength: $.validator.format("Please enter at least {0} characters."),
			rangelength: $.validator.format("Please enter a value between {0} and {1} characters long."),
			range: $.validator.format("Please enter a value between {0} and {1}."),
			max: $.validator.format("Please enter a value less than or equal to {0}."),
			min: $.validator.format("Please enter a value greater than or equal to {0}.")
		},

		autoCreateRanges: false,

		prototype: {

			init: function() {
				this.labelContainer = $(this.settings.errorLabelContainer);
				this.errorContext = this.labelContainer.length && this.labelContainer || $(this.currentForm);
				this.containers = $(this.settings.errorContainer).add(this.settings.errorLabelContainer);
				this.submitted = {};
				this.valueCache = {};
				this.pendingRequest = 0;
				this.pending = {};
				this.invalid = {};
				this.reset();

				var groups = (this.groups = {}),
					rules;
				$.each(this.settings.groups, function(key, value) {
					if (typeof value === "string") {
						value = value.split(/\s/);
					}
					$.each(value, function(index, name) {
						groups[name] = key;
					});
				});
				rules = this.settings.rules;
				$.each(rules, function(key, value) {
					rules[key] = $.validator.normalizeRule(value);
				});

				function delegate(event) {
					var validator = $.data(this[0].form, "validator"),
						eventType = "on" + event.type.replace(/^validate/, ""),
						settings = validator.settings;
					if (settings[eventType] && !this.is(settings.ignore)) {
						settings[eventType].call(validator, this[0], event);
					}
				}
				$(this.currentForm)
					.validateDelegate(":text, [type='password'], [type='file'], select, textarea, " +
						"[type='number'], [type='search'] ,[type='tel'], [type='url'], " +
						"[type='email'], [type='datetime'], [type='date'], [type='month'], " +
						"[type='week'], [type='time'], [type='datetime-local'], " +
						"[type='range'], [type='color'], [type='radio'], [type='checkbox']",
						"focusin focusout keyup", delegate)
					// Support: Chrome, oldIE
					// "select" is provided as event.target when clicking a option
					.validateDelegate("select, option, [type='radio'], [type='checkbox']", "click change", delegate);

				if (this.settings.invalidHandler) {
					$(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler);
				}

				// Add aria-required to any Static/Data/Class required fields before first validation
				// Screen readers require this attribute to be present before the initial submission http://www.w3.org/TR/WCAG-TECHS/ARIA2.html
				$(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true");
			},

			// http://jqueryvalidation.org/Validator.form/
			form: function() {
				this.checkForm();
				$.extend(this.submitted, this.errorMap);
				this.invalid = $.extend({}, this.errorMap);
				if (!this.valid()) {
					$(this.currentForm).triggerHandler("invalid-form", [this]);
				}
				this.showErrors();
				return this.valid();
			},

			checkForm: function() {
				this.prepareForm();
				for (var i = 0, elements = (this.currentElements = this.elements()); elements[i]; i++) {
					this.check(elements[i]);
				}
				return this.valid();
			},

			// http://jqueryvalidation.org/Validator.element/
			element: function(element) {
				var cleanElement = this.clean(element),
					checkElement = this.validationTargetFor(cleanElement),
					result = true;

				this.lastElement = checkElement;

				if (checkElement === undefined) {
					delete this.invalid[cleanElement.name];
				} else {
					this.prepareElement(checkElement);
					this.currentElements = $(checkElement);

					result = this.check(checkElement) !== false;
					if (result) {
						delete this.invalid[checkElement.name];
					} else {
						this.invalid[checkElement.name] = true;
					}
				}
				// Add aria-invalid status for screen readers
				$(element).attr("aria-invalid", !result);

				if (!this.numberOfInvalids()) {
					// Hide error containers on last error
					this.toHide = this.toHide.add(this.containers);
				}
				this.showErrors();
				return result;
			},

			// http://jqueryvalidation.org/Validator.showErrors/
			showErrors: function(errors) {
				if (errors) {
					// add items to error list and map
					$.extend(this.errorMap, errors);
					this.errorList = [];
					for (var name in errors) {
						this.errorList.push({
							message: errors[name],
							element: this.findByName(name)[0]
						});
					}
					// remove items from success list
					this.successList = $.grep(this.successList, function(element) {
						return !(element.name in errors);
					});
				}
				if (this.settings.showErrors) {
					this.settings.showErrors.call(this, this.errorMap, this.errorList);
				} else {
					this.defaultShowErrors();
				}
			},

			// http://jqueryvalidation.org/Validator.resetForm/
			resetForm: function() {
				if ($.fn.resetForm) {
					$(this.currentForm).resetForm();
				}
				this.submitted = {};
				this.lastElement = null;
				this.prepareForm();
				this.hideErrors();
				this.elements()
					.removeClass(this.settings.errorClass)
					.removeData("previousValue")
					.removeAttr("aria-invalid")
					.showMsg(0);
				//.showMsg(0);为后添加wufeng
			},

			numberOfInvalids: function() {
				return this.objectLength(this.invalid);
			},

			objectLength: function(obj) {
				/* jshint unused: false */
				var count = 0,
					i;
				for (i in obj) {
					count++;
				}
				return count;
			},

			hideErrors: function() {
				this.hideThese(this.toHide);
			},

			hideThese: function(errors) {
				errors.not(this.containers).text("");
				this.addWrapper(errors).hide();
			},

			valid: function() {
				return this.size() === 0;
			},

			size: function() {
				return this.errorList.length;
			},

			focusInvalid: function() {
				if (this.settings.focusInvalid) {
					try {
						$(this.findLastActive() || this.errorList.length && this.errorList[0].element || [])
							.filter(":visible")
							.focus()
							// manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
							.trigger("focusin");
					} catch (e) {
						// ignore IE throwing errors when focusing hidden elements
					}
				}
			},

			findLastActive: function() {
				var lastActive = this.lastActive;
				return lastActive && $.grep(this.errorList, function(n) {
					return n.element.name === lastActive.name;
				}).length === 1 && lastActive;
			},

			elements: function() {
				var validator = this,
					rulesCache = {};

				// select all valid inputs inside the form (no submit or reset buttons)
				return $(this.currentForm)
					.find("input, select, textarea")
					.not(":submit, :reset, :image, [disabled], [readonly]")
					.not(this.settings.ignore)
					.filter(function() {
						if (!this.name && validator.settings.debug && window.console) {
							console.error("%o has no name assigned", this);
						}

						// select only the first element for each name, and only those with rules specified
						if (this.name in rulesCache || !validator.objectLength($(this).rules())) {
							return false;
						}

						rulesCache[this.name] = true;
						return true;
					});
			},

			clean: function(selector) {
				return $(selector)[0];
			},

			errors: function() {
				var errorClass = this.settings.errorClass.split(" ").join(".");
				return $(this.settings.errorElement + "." + errorClass, this.errorContext);
			},

			reset: function() {
				this.successList = [];
				this.errorList = [];
				this.errorMap = {};
				this.toShow = $([]);
				this.toHide = $([]);
				this.currentElements = $([]);
			},

			prepareForm: function() {
				this.reset();
				this.toHide = this.errors().add(this.containers);
			},

			prepareElement: function(element) {
				this.reset();
				this.toHide = this.errorsFor(element);
			},

			elementValue: function(element) {
				var val,
					$element = $(element),
					type = element.type;

				if (type === "radio" || type === "checkbox") {
					return $("input[name='" + element.name + "']:checked").val();
				} else if (type === "number" && typeof element.validity !== "undefined") {
					return element.validity.badInput ? false : $element.val();
				}

				val = $element.val();
				if (typeof val === "string") {
					return val.replace(/\r/g, "");
				}
				return val;
			},

			check: function(element) {
				element = this.validationTargetFor(this.clean(element));

				var rules = $(element).rules(),
					rulesCount = $.map(rules, function(n, i) {
						return i;
					}).length,
					dependencyMismatch = false,
					val = this.elementValue(element),
					result, method, rule;

				for (method in rules) {
					rule = {
						method: method,
						parameters: rules[method]
					};
					try {

						result = $.validator.methods[method].call(this, val, element, rule.parameters);

						// if a method indicates that the field is optional and therefore valid,
						// don't mark it as valid when there are no other rules
						if (result === "dependency-mismatch" && rulesCount === 1) {
							dependencyMismatch = true;
							continue;
						}
						dependencyMismatch = false;

						if (result === "pending") {
							this.toHide = this.toHide.not(this.errorsFor(element));
							return;
						}

						if (!result) {
							this.formatAndAdd(element, rule);
							return false;
						}
					} catch (e) {
						if (this.settings.debug && window.console) {
							console.log("Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.", e);
						}
						throw e;
					}
				}
				if (dependencyMismatch) {
					return;
				}
				if (this.objectLength(rules)) {
					this.successList.push(element);
				}
				return true;
			},

			// return the custom message for the given element and validation method
			// specified in the element's HTML5 data attribute
			// return the generic message if present and no method specific message is present
			customDataMessage: function(element, method) {
				return $(element).data("msg" + method.charAt(0).toUpperCase() +
					method.substring(1).toLowerCase()) || $(element).data("msg");
			},

			// return the custom message for the given element name and validation method
			customMessage: function(name, method) {
				var m = this.settings.messages[name];
				return m && (m.constructor === String ? m : m[method]);
			},

			// return the first defined argument, allowing empty strings
			findDefined: function() {
				for (var i = 0; i < arguments.length; i++) {
					if (arguments[i] !== undefined) {
						return arguments[i];
					}
				}
				return undefined;
			},

			defaultMessage: function(element, method) {
				return this.findDefined(
					this.customMessage(element.name, method),
					this.customDataMessage(element, method),
					// title is never undefined, so handle empty string as undefined
					!this.settings.ignoreTitle && element.title || undefined,
					$.validator.messages[method],
					"<strong>Warning: No message defined for " + element.name + "</strong>"
				);
			},

			formatAndAdd: function(element, rule) {
				var message = this.defaultMessage(element, rule.method),
					theregex = /\$?\{(\d+)\}/g;
				if (typeof message === "function") {
					message = message.call(this, rule.parameters, element);
				} else if (theregex.test(message)) {
					message = $.validator.format(message.replace(theregex, "{$1}"), rule.parameters);
				}
				this.errorList.push({
					message: message,
					element: element,
					method: rule.method
				});

				this.errorMap[element.name] = message;
				this.submitted[element.name] = message;
			},

			addWrapper: function(toToggle) {
				if (this.settings.wrapper) {
					toToggle = toToggle.add(toToggle.parent(this.settings.wrapper));
				}
				return toToggle;
			},

			defaultShowErrors: function() {
				var i, elements, error;
				for (i = 0; this.errorList[i]; i++) {
					error = this.errorList[i];
					if (this.settings.highlight) {
						this.settings.highlight.call(this, error.element, this.settings.errorClass, this.settings.validClass);
					}
					this.showLabel(error.element, error.message);
				}
				if (this.errorList.length) {
					this.toShow = this.toShow.add(this.containers);
				}
				if (this.settings.success) {
					for (i = 0; this.successList[i]; i++) {
						this.showLabel(this.successList[i]);
					}
				}
				if (this.settings.unhighlight) {
					for (i = 0, elements = this.validElements(); elements[i]; i++) {
						this.settings.unhighlight.call(this, elements[i], this.settings.errorClass, this.settings.validClass);
					}
				}
				this.toHide = this.toHide.not(this.toShow);
				this.hideErrors();
				this.addWrapper(this.toShow).show();
			},

			validElements: function() {
				return this.currentElements.not(this.invalidElements());
			},

			invalidElements: function() {
				return $(this.errorList).map(function() {
					return this.element;
				});
			},

			showLabel: function(element, message) {
				//wf修改		START
				$(element).showMsg({
					i: 1,
					msg: message
				});
				//wf修改		END

				var place, group, errorID,
					error = this.errorsFor(element),
					elementID = this.idOrName(element),
					describedBy = $(element).attr("aria-describedby");
				if (error.length) {
					// refresh error/success class
					error.removeClass(this.settings.validClass).addClass(this.settings.errorClass);
					// replace message on existing label
					//wf注释掉的下一行
					error.html(message);
				} else {
					// create error element
					error = $("<" + this.settings.errorElement + ">")
						.attr("id", elementID + "-error")
						.addClass(this.settings.errorClass)
						.html(message || "");
					// Maintain reference to the element to be placed into the DOM
					place = error;
					if (this.settings.wrapper) {
						// make sure the element is visible, even in IE
						// actually showing the wrapped element is handled elsewhere
						place = error.hide().show().wrap("<" + this.settings.wrapper + "/>").parent();
					}
					//wufeng注释
					/*if ( this.labelContainer.length ) {
						this.labelContainer.append( place );
					} else if ( this.settings.errorPlacement ) {
						this.settings.errorPlacement( place, $( element ) );
					} else {
						place.insertAfter( element );
					}*/

					// Link error back to the element
					if (error.is("label")) {
						// If the error is a label, then associate using 'for'
						error.attr("for", elementID);
					} else if (error.parents("label[for='" + elementID + "']").length === 0) {
						// If the element is not a child of an associated label, then it's necessary
						// to explicitly apply aria-describedby

						errorID = error.attr("id").replace(/(:|\.|\[|\])/g, "\\$1");
						// Respect existing non-error aria-describedby
						if (!describedBy) {
							describedBy = errorID;
						} else if (!describedBy.match(new RegExp("\\b" + errorID + "\\b"))) {
							// Add to end of list if not already present
							describedBy += " " + errorID;
						}
						$(element).attr("aria-describedby", describedBy);

						// If this element is grouped, then assign to all elements in the same group
						group = this.groups[element.name];
						if (group) {
							$.each(this.groups, function(name, testgroup) {
								if (testgroup === group) {
									$("[name='" + name + "']", this.currentForm)
										.attr("aria-describedby", error.attr("id"));
								}
							});
						}
					}
				}
				if (!message && this.settings.success) {
					error.text("");
					if (typeof this.settings.success === "string") {
						error.addClass(this.settings.success);
					} else {
						this.settings.success(error, element);
					}
				}
				this.toShow = this.toShow.add(error);
			},

			errorsFor: function(element) {
				var name = this.idOrName(element),
					describer = $(element).attr("aria-describedby"),
					selector = "label[for='" + name + "'], label[for='" + name + "'] *";

				// aria-describedby should directly reference the error element
				if (describer) {
					selector = selector + ", #" + describer.replace(/\s+/g, ", #");
				}
				return this
					.errors()
					.filter(selector);
			},

			idOrName: function(element) {
				return this.groups[element.name] || (this.checkable(element) ? element.name : element.id || element.name);
			},

			validationTargetFor: function(element) {

				// If radio/checkbox, validate first element in group instead
				if (this.checkable(element)) {
					element = this.findByName(element.name);
				}

				// Always apply ignore filter
				return $(element).not(this.settings.ignore)[0];
			},

			checkable: function(element) {
				return (/radio|checkbox/i).test(element.type);
			},

			findByName: function(name) {
				return $(this.currentForm).find("[name='" + name + "']");
			},

			getLength: function(value, element) {
				switch (element.nodeName.toLowerCase()) {
					case "select":
						return $("option:selected", element).length;
					case "input":
						if (this.checkable(element)) {
							return this.findByName(element.name).filter(":checked").length;
						}
				}
				return value.length;
			},

			depend: function(param, element) {
				return this.dependTypes[typeof param] ? this.dependTypes[typeof param](param, element) : true;
			},

			dependTypes: {
				"boolean": function(param) {
					return param;
				},
				"string": function(param, element) {
					return !!$(param, element.form).length;
				},
				"function": function(param, element) {
					return param(element);
				}
			},

			optional: function(element) {
				var val = this.elementValue(element);
				return !$.validator.methods.required.call(this, val, element) && "dependency-mismatch";
			},

			startRequest: function(element) {
				if (!this.pending[element.name]) {
					this.pendingRequest++;
					this.pending[element.name] = true;
				}
			},

			stopRequest: function(element, valid) {
				this.pendingRequest--;
				// sometimes synchronization fails, make sure pendingRequest is never < 0
				if (this.pendingRequest < 0) {
					this.pendingRequest = 0;
				}
				delete this.pending[element.name];
				if (valid && this.pendingRequest === 0 && this.formSubmitted && this.form()) {
					$(this.currentForm).submit();
					this.formSubmitted = false;
				} else if (!valid && this.pendingRequest === 0 && this.formSubmitted) {
					$(this.currentForm).triggerHandler("invalid-form", [this]);
					this.formSubmitted = false;
				}
			},

			previousValue: function(element) {
				return $.data(element, "previousValue") || $.data(element, "previousValue", {
					old: null,
					valid: true,
					message: this.defaultMessage(element, "remote")
				});
			}

		},

		classRuleSettings: {
			required: {
				required: true
			},
			email: {
				email: true
			},
			url: {
				url: true
			},
			date: {
				date: true
			},
			dateISO: {
				dateISO: true
			},
			number: {
				number: true
			},
			digits: {
				digits: true
			},
			creditcard: {
				creditcard: true
			}
		},

		addClassRules: function(className, rules) {
			if (className.constructor === String) {
				this.classRuleSettings[className] = rules;
			} else {
				$.extend(this.classRuleSettings, className);
			}
		},

		classRules: function(element) {
			var rules = {},
				classes = $(element).attr("class");

			if (classes) {
				$.each(classes.split(" "), function() {
					if (this in $.validator.classRuleSettings) {
						$.extend(rules, $.validator.classRuleSettings[this]);
					}
				});
			}
			return rules;
		},

		attributeRules: function(element) {
			var rules = {},
				$element = $(element),
				type = element.getAttribute("type"),
				method, value;

			for (method in $.validator.methods) {

				// support for <input required> in both html5 and older browsers
				if (method === "required") {
					value = element.getAttribute(method);
					// Some browsers return an empty string for the required attribute
					// and non-HTML5 browsers might have required="" markup
					if (value === "") {
						value = true;
					}
					// force non-HTML5 browsers to return bool
					value = !!value;
				} else {
					value = $element.attr(method);
				}

				// convert the value to a number for number inputs, and for text for backwards compability
				// allows type="date" and others to be compared as strings
				if (/min|max/.test(method) && (type === null || /number|range|text/.test(type))) {
					value = Number(value);
				}

				if (value || value === 0) {
					rules[method] = value;
				} else if (type === method && type !== "range") {
					// exception: the jquery validate 'range' method
					// does not test for the html5 'range' type
					rules[method] = true;
				}
			}

			// maxlength may be returned as -1, 2147483647 ( IE ) and 524288 ( safari ) for text inputs
			if (rules.maxlength && /-1|2147483647|524288/.test(rules.maxlength)) {
				delete rules.maxlength;
			}

			return rules;
		},

		dataRules: function(element) {
			var method, value,
				rules = {},
				$element = $(element);
			for (method in $.validator.methods) {
				value = $element.data("rule" + method.charAt(0).toUpperCase() + method.substring(1).toLowerCase());
				if (value !== undefined) {
					rules[method] = value;
				}
			}
			return rules;
		},

		staticRules: function(element) {
			var rules = {},
				validator = $.data(element.form, "validator");

			if (validator.settings.rules) {
				rules = $.validator.normalizeRule(validator.settings.rules[element.name]) || {};
			}
			return rules;
		},

		normalizeRules: function(rules, element) {
			// handle dependency check
			$.each(rules, function(prop, val) {
				// ignore rule when param is explicitly false, eg. required:false
				if (val === false) {
					delete rules[prop];
					return;
				}
				if (val.param || val.depends) {
					var keepRule = true;
					switch (typeof val.depends) {
						case "string":
							keepRule = !!$(val.depends, element.form).length;
							break;
						case "function":
							keepRule = val.depends.call(element, element);
							break;
					}
					if (keepRule) {
						rules[prop] = val.param !== undefined ? val.param : true;
					} else {
						delete rules[prop];
					}
				}
			});

			// evaluate parameters
			$.each(rules, function(rule, parameter) {
				rules[rule] = $.isFunction(parameter) ? parameter(element) : parameter;
			});

			// clean number parameters
			$.each(["minlength", "maxlength"], function() {
				if (rules[this]) {
					rules[this] = Number(rules[this]);
				}
			});
			$.each(["rangelength", "range"], function() {
				var parts;
				if (rules[this]) {
					if ($.isArray(rules[this])) {
						rules[this] = [Number(rules[this][0]), Number(rules[this][1])];
					} else if (typeof rules[this] === "string") {
						parts = rules[this].replace(/[\[\]]/g, "").split(/[\s,]+/);
						rules[this] = [Number(parts[0]), Number(parts[1])];
					}
				}
			});

			if ($.validator.autoCreateRanges) {
				// auto-create ranges
				if (rules.min != null && rules.max != null) {
					rules.range = [rules.min, rules.max];
					delete rules.min;
					delete rules.max;
				}
				if (rules.minlength != null && rules.maxlength != null) {
					rules.rangelength = [rules.minlength, rules.maxlength];
					delete rules.minlength;
					delete rules.maxlength;
				}
			}

			return rules;
		},

		// Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
		normalizeRule: function(data) {
			if (typeof data === "string") {
				var transformed = {};
				$.each(data.split(/\s/), function() {
					transformed[this] = true;
				});
				data = transformed;
			}
			return data;
		},

		// http://jqueryvalidation.org/jQuery.validator.addMethod/
		addMethod: function(name, method, message) {
			$.validator.methods[name] = method;
			$.validator.messages[name] = message !== undefined ? message : $.validator.messages[name];
			if (method.length < 3) {
				$.validator.addClassRules(name, $.validator.normalizeRule(name));
			}
		},

		methods: {

			// http://jqueryvalidation.org/required-method/
			required: function(value, element, param) {
				// check if dependency is met
				if (!this.depend(param, element)) {
					return "dependency-mismatch";
				}
				if (element.nodeName.toLowerCase() === "select") {
					// could be an array for select-multiple or a string, both are fine this way
					var val = $(element).val();
					return val && val.length > 0;
				}
				if (this.checkable(element)) {
					return this.getLength(value, element) > 0;
				}
				return $.trim(value).length > 0;
			},

			// http://jqueryvalidation.org/email-method/
			email: function(value, element) {
				// From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
				// Retrieved 2014-01-14
				// If you have a problem with this implementation, report a bug against the above spec
				// Or use custom methods to implement your own email validation
				value = $.trim(value);
//				return this.optional(element) || /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(value);
				return this.optional(element) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value);
			},

			// http://jqueryvalidation.org/url-method/
			url: function(value, element) {
				// contributed by Scott Gonzalez: http://projects.scottsplayground.com/iri/
				return this.optional(element) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
			},

			// http://jqueryvalidation.org/date-method/
			date: function(value, element) {
				return this.optional(element) || !/Invalid|NaN/.test(new Date(value).toString());
			},

			// http://jqueryvalidation.org/dateISO-method/
			dateISO: function(value, element) {
				return this.optional(element) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
			},

			// http://jqueryvalidation.org/number-method/
			number: function(value, element) {
				return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
			},

			// http://jqueryvalidation.org/digits-method/
			digits: function(value, element) {
				return this.optional(element) || /^\d+$/.test(value);
			},

			// http://jqueryvalidation.org/creditcard-method/
			// based on http://en.wikipedia.org/wiki/Luhn/
			creditcard: function(value, element) {
				if (this.optional(element)) {
					return "dependency-mismatch";
				}
				// accept only spaces, digits and dashes
				if (/[^0-9 \-]+/.test(value)) {
					return false;
				}
				var nCheck = 0,
					nDigit = 0,
					bEven = false,
					n, cDigit;

				value = value.replace(/\D/g, "");

				// Basing min and max length on
				// http://developer.ean.com/general_info/Valid_Credit_Card_Types
				if (value.length < 13 || value.length > 19) {
					return false;
				}

				for (n = value.length - 1; n >= 0; n--) {
					cDigit = value.charAt(n);
					nDigit = parseInt(cDigit, 10);
					if (bEven) {
						if ((nDigit *= 2) > 9) {
							nDigit -= 9;
						}
					}
					nCheck += nDigit;
					bEven = !bEven;
				}

				return (nCheck % 10) === 0;
			},

			// http://jqueryvalidation.org/minlength-method/
			minlength: function(value, element, param) {
				var length = $.isArray(value) ? value.length : this.getLength(value, element);
				return this.optional(element) || length >= param;
			},

			// http://jqueryvalidation.org/maxlength-method/
			maxlength: function(value, element, param) {
				var length = $.isArray(value) ? value.length : this.getLength(value, element);
				return this.optional(element) || length <= param;
			},

			// http://jqueryvalidation.org/rangelength-method/
			rangelength: function(value, element, param) {
				var length = $.isArray(value) ? value.length : this.getLength(value, element);
				return this.optional(element) || (length >= param[0] && length <= param[1]);
			},

			// http://jqueryvalidation.org/min-method/
			min: function(value, element, param) {
				return this.optional(element) || value >= param;
			},

			// http://jqueryvalidation.org/max-method/
			max: function(value, element, param) {
				return this.optional(element) || value <= param;
			},

			// http://jqueryvalidation.org/range-method/
			range: function(value, element, param) {
				return this.optional(element) || (value >= param[0] && value <= param[1]);
			},

			// http://jqueryvalidation.org/equalTo-method/
			equalTo: function(value, element, param) {
				// bind to the blur event of the target in order to revalidate whenever the target field is updated
				// TODO find a way to bind the event just once, avoiding the unbind-rebind overhead
				var target = $(param);
				if (this.settings.onfocusout) {
					target.unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
						$(element).valid();
					});
				}
				return value === target.val();
			},

			// http://jqueryvalidation.org/remote-method/
			remote: function(value, element, param) {
				if (this.optional(element)) {
					return "dependency-mismatch";
				}

				var previous = this.previousValue(element),
					validator, data;

				if (!this.settings.messages[element.name]) {
					this.settings.messages[element.name] = {};
				}
				previous.originalMessage = this.settings.messages[element.name].remote;
				this.settings.messages[element.name].remote = previous.message;

				param = typeof param === "string" && {
					url: param
				} || param;

				if (previous.old === value) {
					return previous.valid;
				}

				previous.old = value;
				validator = this;
				this.startRequest(element);
				data = {};
				data[element.name] = value;
				$.ajax($.extend(true, {
					url: param,
					mode: "abort",
					port: "validate" + element.name,
					dataType: "json",
					data: data,
					context: validator.currentForm,
					success: function(response) {
						var valid = response === true || response === "true",
							errors, message, submitted;

						validator.settings.messages[element.name].remote = previous.originalMessage;
						if (valid) {
							submitted = validator.formSubmitted;
							validator.prepareElement(element);
							validator.formSubmitted = submitted;
							validator.successList.push(element);
							delete validator.invalid[element.name];
							validator.showErrors();
						} else {
							errors = {};
							message = response || validator.defaultMessage(element, "remote");
							errors[element.name] = previous.message = $.isFunction(message) ? message(value) : message;
							validator.invalid[element.name] = true;
							validator.showErrors(errors);
						}
						previous.valid = valid;
						validator.stopRequest(element, valid);
					}
				}, param));
				return "pending";
			}

		}

	});

	$.format = function deprecated() {
		throw "$.format has been deprecated. Please use $.validator.format instead.";
	};

	// ajax mode: abort
	// usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
	// if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort()

	var pendingRequests = {},
		ajax;
	// Use a prefilter if available (1.5+)
	if ($.ajaxPrefilter) {
		$.ajaxPrefilter(function(settings, _, xhr) {
			var port = settings.port;
			if (settings.mode === "abort") {
				if (pendingRequests[port]) {
					pendingRequests[port].abort();
				}
				pendingRequests[port] = xhr;
			}
		});
	} else {
		// Proxy ajax
		ajax = $.ajax;
		$.ajax = function(settings) {
			var mode = ("mode" in settings ? settings : $.ajaxSettings).mode,
				port = ("port" in settings ? settings : $.ajaxSettings).port;
			if (mode === "abort") {
				if (pendingRequests[port]) {
					pendingRequests[port].abort();
				}
				pendingRequests[port] = ajax.apply(this, arguments);
				return pendingRequests[port];
			}
			return ajax.apply(this, arguments);
		};
	}

	// provides delegate(type: String, delegate: Selector, handler: Callback) plugin for easier event delegation
	// handler is only called when $(event.target).is(delegate), in the scope of the jquery-object for event.target

	$.extend($.fn, {
		validateDelegate: function(delegate, type, handler) {
			return this.bind(type, function(event) {
				var target = $(event.target);
				if (target.is(delegate)) {
					return handler.apply(target, arguments);
				}
			});
		}
	});

}));









//
$(function() {

	/**
	 * wufeng	加
	 * addMethod: function(name, method, message) {
			$.validator.methods[name] = method;
			$.validator.messages[name] = message !== undefined ? message : $.validator.messages[name];
			if (method.length < 3) {
				$.validator.addClassRules(name, $.validator.normalizeRule(name));
			}
		},
	 */
	$.format = $.validator.format;

	$.validator.addMethod("mechanismNo", function(value, element) {
		return this.optional(element) || /^[0-9\-]{12,30}$/.test(value);
	}, "组织机构代码只能为数字加-，且长度为11位");

	$.validator.addMethod("chinese", function(value, element) {
		return this.optional(element) || /^[\u4e00-\u9faf]+$/.test(value);
	}, "请输入汉字");

	$.validator.addMethod("uclowerAndNum", function(value, element) {
		return this.optional(element) || /^[A-Z0-9]{14,30}$/.test(value);
	}, "大写字母和数字");

	$.validator.addMethod("alpha_numeric", function(value, element) {
		return this.optional(element) || /^[A-Za-z0-9]+$/.test(value);
	}, "请使用字母和数字组合！");

	$.validator.addMethod("rname", function(value, element) {
		return this.optional(element) || /^[^`~!@#$%^&*()+=|\\\][\]\{\}:;'\,.<>/?]{1}[^`~!@$%^&()+=|\\\][\]\{\}:;'\,.<>?]{0,19}$/.test(value);
	}, "请输入正确真实姓名！");

	$.validator.addMethod("p_number", function(value, element) {
		return this.optional(element) || /^\d+(\.\d+)?$/.test(value);
	}, "请输入正确格式的数值！");

	$.validator.addMethod("bankcard", function(value, element) {
		return this.optional(element) || /^\d+[-]?\d+$/.test(value);
	}, "请输入正确的银行卡号！");

	$.validator.addMethod("exclude", function(value, element, param) {
		return this.optional(element) || value != param;
	}, "请选择一个选项");

	$.validator.addMethod("attachTo", function(value, element, param) {
		var target = $(param).val();
		return $.trim(value).length > 0 || $.trim(target).length > 0;
	}, "请至少填写其中一项");

	$.validator.addMethod("maxto", function(value, element, param) {
		return this.optional(element) || parseFloat(value) <= parseFloat($(param).val());
	}, "输入数值过大");

	$.validator.addMethod("minto", function(value, element, param) {
		return this.optional(element) || parseFloat(value) >= parseFloat($(param).val());
	}, "输入数值过小");

	$.validator.addMethod("images", function(value, element) {
		var exts = '.jpg.jpeg.gif.bmp.png.';
		return this.optional(element) || exts.indexOf('.' + value.substring(value.lastIndexOf(".") + 1).toLowerCase() + '.') != -1;
	}, "图片格式不正确");

	$.validator.addMethod("compress", function(value, element) {
		var exts = '.zip.rar.';
		return this.optional(element) || exts.indexOf('.' + value.substring(value.lastIndexOf(".") + 1).toLowerCase() + '.') != -1;
	}, "压缩文件格式不正确");

	$.validator.addMethod("favicon", function(value, element) {
		var exts = '.ico.';
		return this.optional(element) || exts.indexOf('.' + value.substring(value.lastIndexOf(".") + 1).toLowerCase() + '.') != -1;
	}, "图标格式不正确");

	$.validator.addMethod("video", function(value, element) {
		var exts = '.flv.';
		return this.optional(element) || exts.indexOf('.' + value.substring(value.lastIndexOf(".") + 1).toLowerCase() + '.') != -1;
	}, "视频格式不正确");

	$.validator.addMethod("phone", function(value, element) {
		return this.optional(element) || /^\d{3,4}-\d{3,8}(-\d{3,4})?$/.test(value);
	}, "请输入正确的电话号码，带区号");

	$.validator.addMethod("telephone", function(value, element) {
		return this.optional(element) || /^1\d{10}$/.test(value);
	}, "请输入正确的手机号码");

	$.validator.addMethod("istel", function(value, element) {
		return this.optional(element) || /^\d{3,4}-\d{3,8}(-\d{3,4})?$/.test(value) || /^1\d{10}$/.test(value);
	}, "请输入正确的联系方式");

	$.validator.addMethod("idCart", function(value, element) {
		return this.optional(element) || /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}|\d{3}[Xx]$/.test(value);
	}, "请输入正确的身份证号码");

	$.validator.addMethod("zipCode", function(value, element) {
		return this.optional(element) || /^[0-9]{6}$/.test(value);
	}, "请输入正确的邮政编码");

	$.validator.addMethod("accept", function(value, element, param) {
		var typeParam = typeof param === "string" ? param.replace(/\s/g, '').replace(/,/g, '|') : "image/*",
			optionalValue = this.optional(element),
			i, file, resultFlag = true,
			regExp;
		if (optionalValue) {
			return optionalValue;
		}
		if ($(element).attr("type") === "file") {
			typeParam = typeParam.replace(/\*/g, ".*");
			regExp = new RegExp(".?(" + typeParam + ")$", "i");
			//---zhangyq add
			if (KUI.browser && KUI.browser == "Msie") {
				if (value != "" && value.lastIndexOf(".") != -1) {
					var extendFile = value.substring(value.lastIndexOf(".") + 1, value.length);
					resultFlag = extendFile.match(regExp);
				} else {
					resultFlag = false;
				}
			} else {
				if (element.files && element.files.length) {
					for (i = 0; i < element.files.length; i++) {
						file = element.files[i];
						if (!file.type.match(regExp)) {
							resultFlag = false;
						}
					}
				}

			}
		} else {
			resultFlag = false;
		}
		return resultFlag;
	}, jQuery.format("请选择正确的上传文件类型"));

	$.validator.addMethod("extension", function(value, element, param) {
		param = typeof param === "string" ? param.replace(/,/g, '|') : "png|jpe?g|gif";
		return this.optional(element) || value.match(new RegExp(".(" + param + ")$", "i"));
	}, '文件格式不正确');

	$.validator.addMethod("decimal", function(a, b) {
		return this.optional(b) || ((a.indexOf(".") > 0 && a.substring(a.indexOf(".")).length <= 3) || (a.indexOf(".") == -1))
	}, '金额保留两位小数');

	$.validator.addMethod("cardNo", function(value, element) {
		return this.optional(element) || isIdCardNo(value)
	}, "请输入正确的身份证号");


	$.validator.addMethod("certifies", function(value, element) {
		return this.optional(element) || /^[a-zA-Z\d]{8}\-[a-zA-Z\d]$/.test(value);
	}, "请输入正确的组织机构代码");

	// 验证值小数位数不能超过两位
	$.validator.addMethod("passwordLevel", function(value, element) {
		var rn = 0;
		var Modes = 0;
		for (i = 0; i < value.length; i++) {
			Modes |= CharMode(value.charCodeAt(i));
		}
		rn = bitTotal(Modes);
		// CharMode函数
		function CharMode(iN) {
			if (iN >= 48 && iN <= 57)// 数字
				return 1;
			if ((iN >= 97 && iN <= 122) || (iN >= 65 && iN <= 90))
				// 大小写
				return 4;
			else
				return 8; // 特殊字符
		}
		// bitTotal函数
		function bitTotal(num) {
			modes = 0;
			for (i = 0; i < 4; i++) {
				if (num & 1)
					modes++;
				num >>>= 1;
			}
			return modes;
		}
		if(rn < 2)
		{
			return false;
		}
		else
		{
			return true;
		}
	}, $.validator.format("请输入字母加数字或字符至少两种以上组合的6-20位密码"));

	$.validator.setDefaults({
		success: function(label, element) {
			$(element).showMsg(2);
		}
	});

	// 身份证
	function isIdCardNo(num) {
        var factorArr = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1);
		var parityBit = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2");
		var varArray = new Array();
		var intValue;
		var lngProduct = 0;
		var intCheckDigit;
		var intStrLen = num.length;
		var idNumber = num;
		// initialize
		if ((intStrLen != 15) && (intStrLen != 18)) {
			return false;
		}
		// check and set value
		for (i = 0; i < intStrLen; i++) {
			varArray[i] = idNumber.charAt(i);
			if ((varArray[i] < '0' || varArray[i] > '9') && (i != 17)) {
				return false;
			} else if (i < 17) {
				varArray[i] = varArray[i] * factorArr[i];
			}
		}
		if (intStrLen == 18) {
			//check date
			var date8 = idNumber.substring(6, 14);
			if (isDate8(date8) == false) {
				return false;
			}
			// calculate the sum of the products
			for (i = 0; i < 17; i++) {
				lngProduct = lngProduct + varArray[i];
			}
			// calculate the check digit
			intCheckDigit = parityBit[lngProduct % 11];
			// check last digit
			if (varArray[17] != intCheckDigit) {
				return false;
			}
		} else {
			//length is 15
			//check date
			var date6 = idNumber.substring(6, 12);
			if (isDate6(date6) == false) {
				return false;
			}
		}
		return true;
    }

	function isDate6(sDate) {
		if (!/^[0-9]{6}$/.test(sDate)) {
			return false;
		}
		var year, month, day;
		year = sDate.substring(0, 4);
		month = sDate.substring(4, 6);
		if (year < 1700 || year > 2500) return false
		if (month < 1 || month > 12) return false
		return true
	}

	function isDate8(sDate) {
		if (!/^[0-9]{8}$/.test(sDate)) {
			return false;
		}
		var year, month, day;
		year = sDate.substring(0, 4);
		month = sDate.substring(4, 6);
		day = sDate.substring(6, 8);
		var iaMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
		if (year < 1700 || year > 2500) return false
		if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) iaMonthDays[1] = 29;
		if (month < 1 || month > 12) return false
		if (day < 1 || day > iaMonthDays[month - 1]) return false
		return true
	}

})

$.fn.extend({
    /**
     * 显示表单提示信息
     * @param {Object} op
     */
    showMsg: function(op) {
        return this.each(function() {
            var $this = $(this),
                _type = this.type,
                list = $this.data("msgList"),
                index = op ? (typeof op == "number" ? op : op.i) : 0,
                $li;
            var showMsgEle = $this.attr("validate-ele-id");
            if (typeof list == "undefined") {
                if (typeof showMsgEle == "undefined" || showMsgEle == "") {
                    list = ((_type === "radio" || _type === "checkbox") ? $this.parent() : $this).nextAll(".u-msg").children()
                } else {
                    list = $("#" + showMsgEle).children();
                }
                $this.data("msgList", list);
            }
            $li = $(this).parents(".validate-parent").find(".u-msg li").removeClass("active").eq(index).addClass("active");
            if (typeof op == "object" && typeof op.msg == "string") {
                $li.find("span").html(op.msg);
            }
        })
    }
});
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){a.extend(a.fn,{validate:function(b){if(!this.length)return void(b&&b.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing."));var c=a.data(this[0],"validator");return c?c:(this.attr("novalidate","novalidate"),c=new a.validator(b,this[0]),a.data(this[0],"validator",c),c.settings.onsubmit&&(this.on("click.validate",":submit",function(b){c.settings.submitHandler&&(c.submitButton=b.target),a(this).hasClass("cancel")&&(c.cancelSubmit=!0),void 0!==a(this).attr("formnovalidate")&&(c.cancelSubmit=!0)}),this.on("submit.validate",function(b){function d(){var d,e;return c.settings.submitHandler?(c.submitButton&&(d=a("<input type='hidden'/>").attr("name",c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)),e=c.settings.submitHandler.call(c,c.currentForm,b),c.submitButton&&d.remove(),void 0!==e?e:!1):!0}return c.settings.debug&&b.preventDefault(),c.cancelSubmit?(c.cancelSubmit=!1,d()):c.form()?c.pendingRequest?(c.formSubmitted=!0,!1):d():(c.focusInvalid(),!1)})),c)},valid:function(){var b,c,d;return a(this[0]).is("form")?b=this.validate().form():(d=[],b=!0,c=a(this[0].form).validate(),this.each(function(){b=c.element(this)&&b,d=d.concat(c.errorList)}),c.errorList=d),b},rules:function(b,c){var d,e,f,g,h,i,j=this[0];if(b)switch(d=a.data(j.form,"validator").settings,e=d.rules,f=a.validator.staticRules(j),b){case"add":a.extend(f,a.validator.normalizeRule(c)),delete f.messages,e[j.name]=f,c.messages&&(d.messages[j.name]=a.extend(d.messages[j.name],c.messages));break;case"remove":return c?(i={},a.each(c.split(/\s/),function(b,c){i[c]=f[c],delete f[c],"required"===c&&a(j).removeAttr("aria-required")}),i):(delete e[j.name],f)}return g=a.validator.normalizeRules(a.extend({},a.validator.classRules(j),a.validator.attributeRules(j),a.validator.dataRules(j),a.validator.staticRules(j)),j),g.required&&(h=g.required,delete g.required,g=a.extend({required:h},g),a(j).attr("aria-required","true")),g.remote&&(h=g.remote,delete g.remote,g=a.extend(g,{remote:h})),g}}),a.extend(a.expr[":"],{blank:function(b){return!a.trim(""+a(b).val())},filled:function(b){return!!a.trim(""+a(b).val())},unchecked:function(b){return!a(b).prop("checked")}}),a.validator=function(b,c){this.settings=a.extend(!0,{},a.validator.defaults,b),this.currentForm=c,this.init()},a.validator.format=function(b,c){return 1===arguments.length?function(){var c=a.makeArray(arguments);return c.unshift(b),a.validator.format.apply(this,c)}:(arguments.length>2&&c.constructor!==Array&&(c=a.makeArray(arguments).slice(1)),c.constructor!==Array&&(c=[c]),a.each(c,function(a,c){b=b.replace(new RegExp("\\{"+a+"\\}","g"),function(){return c})}),b)},a.extend(a.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusCleanup:!1,focusInvalid:!0,errorContainer:a([]),errorLabelContainer:a([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(a){this.lastActive=a,this.settings.focusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,a,this.settings.errorClass,this.settings.validClass),this.hideThese(this.errorsFor(a)))},onfocusout:function(a){this.checkable(a)||!(a.name in this.submitted)&&this.optional(a)||this.element(a)},onkeyup:function(b,c){var d=[16,17,18,20,35,36,37,38,39,40,45,144,225];9===c.which&&""===this.elementValue(b)||-1!==a.inArray(c.keyCode,d)||(b.name in this.submitted||b===this.lastElement)&&this.element(b)},onclick:function(a){a.name in this.submitted?this.element(a):a.parentNode.name in this.submitted&&this.element(a.parentNode)},highlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).addClass(c).removeClass(d):a(b).addClass(c).removeClass(d)},unhighlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).removeClass(c).addClass(d):a(b).removeClass(c).addClass(d)}},setDefaults:function(b){a.extend(a.validator.defaults,b)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date ( ISO ).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",maxlength:a.validator.format("Please enter no more than {0} characters."),minlength:a.validator.format("Please enter at least {0} characters."),rangelength:a.validator.format("Please enter a value between {0} and {1} characters long."),range:a.validator.format("Please enter a value between {0} and {1}."),max:a.validator.format("Please enter a value less than or equal to {0}."),min:a.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:!1,prototype:{init:function(){function b(b){var c=a.data(this.form,"validator"),d="on"+b.type.replace(/^validate/,""),e=c.settings;e[d]&&!a(this).is(e.ignore)&&e[d].call(c,this,b)}this.labelContainer=a(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||a(this.currentForm),this.containers=a(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset();var c,d=this.groups={};a.each(this.settings.groups,function(b,c){"string"==typeof c&&(c=c.split(/\s/)),a.each(c,function(a,c){d[c]=b})}),c=this.settings.rules,a.each(c,function(b,d){c[b]=a.validator.normalizeRule(d)}),a(this.currentForm).on("focusin.validate focusout.validate keyup.validate",":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox']",b).on("click.validate","select, option, [type='radio'], [type='checkbox']",b),this.settings.invalidHandler&&a(this.currentForm).on("invalid-form.validate",this.settings.invalidHandler),a(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required","true")},form:function(){return this.checkForm(),a.extend(this.submitted,this.errorMap),this.invalid=a.extend({},this.errorMap),this.valid()||a(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var a=0,b=this.currentElements=this.elements();b[a];a++)this.check(b[a]);return this.valid()},element:function(b){var c=this.clean(b),d=this.validationTargetFor(c),e=!0;return this.lastElement=d,void 0===d?delete this.invalid[c.name]:(this.prepareElement(d),this.currentElements=a(d),e=this.check(d)!==!1,e?delete this.invalid[d.name]:this.invalid[d.name]=!0),a(b).attr("aria-invalid",!e),this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),e},showErrors:function(b){if(b){a.extend(this.errorMap,b),this.errorList=[];for(var c in b)this.errorList.push({message:b[c],element:this.findByName(c)[0]});this.successList=a.grep(this.successList,function(a){return!(a.name in b)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){a.fn.resetForm&&a(this.currentForm).resetForm(),this.submitted={},this.lastElement=null,this.prepareForm(),this.hideErrors();var b,c=this.elements().removeData("previousValue").removeAttr("aria-invalid");if(this.settings.unhighlight)for(b=0;c[b];b++)this.settings.unhighlight.call(this,c[b],this.settings.errorClass,"");else c.removeClass(this.settings.errorClass)},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(a){var b,c=0;for(b in a)c++;return c},hideErrors:function(){this.hideThese(this.toHide)},hideThese:function(a){a.not(this.containers).text(""),this.addWrapper(a).hide()},valid:function(){return 0===this.size()},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{a(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(b){}},findLastActive:function(){var b=this.lastActive;return b&&1===a.grep(this.errorList,function(a){return a.element.name===b.name}).length&&b},elements:function(){var b=this,c={};return a(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function(){return!this.name&&b.settings.debug&&window.console&&console.error("%o has no name assigned",this),this.name in c||!b.objectLength(a(this).rules())?!1:(c[this.name]=!0,!0)})},clean:function(b){return a(b)[0]},errors:function(){var b=this.settings.errorClass.split(" ").join(".");return a(this.settings.errorElement+"."+b,this.errorContext)},reset:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=a([]),this.toHide=a([]),this.currentElements=a([])},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)},prepareElement:function(a){this.reset(),this.toHide=this.errorsFor(a)},elementValue:function(b){var c,d=a(b),e=b.type;return"radio"===e||"checkbox"===e?this.findByName(b.name).filter(":checked").val():"number"===e&&"undefined"!=typeof b.validity?b.validity.badInput?!1:d.val():(c=d.val(),"string"==typeof c?c.replace(/\r/g,""):c)},check:function(b){b=this.validationTargetFor(this.clean(b));var c,d,e,f=a(b).rules(),g=a.map(f,function(a,b){return b}).length,h=!1,i=this.elementValue(b);for(d in f){e={method:d,parameters:f[d]};try{if(c=a.validator.methods[d].call(this,i,b,e.parameters),"dependency-mismatch"===c&&1===g){h=!0;continue}if(h=!1,"pending"===c)return void(this.toHide=this.toHide.not(this.errorsFor(b)));if(!c)return this.formatAndAdd(b,e),!1}catch(j){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+b.id+", check the '"+e.method+"' method.",j),j instanceof TypeError&&(j.message+=".  Exception occurred when checking element "+b.id+", check the '"+e.method+"' method."),j}}if(!h)return this.objectLength(f)&&this.successList.push(b),!0},customDataMessage:function(b,c){return a(b).data("msg"+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase())||a(b).data("msg")},customMessage:function(a,b){var c=this.settings.messages[a];return c&&(c.constructor===String?c:c[b])},findDefined:function(){for(var a=0;a<arguments.length;a++)if(void 0!==arguments[a])return arguments[a];return void 0},defaultMessage:function(b,c){return this.findDefined(this.customMessage(b.name,c),this.customDataMessage(b,c),!this.settings.ignoreTitle&&b.title||void 0,a.validator.messages[c],"<strong>Warning: No message defined for "+b.name+"</strong>")},formatAndAdd:function(b,c){var d=this.defaultMessage(b,c.method),e=/\$?\{(\d+)\}/g;"function"==typeof d?d=d.call(this,c.parameters,b):e.test(d)&&(d=a.validator.format(d.replace(e,"{$1}"),c.parameters)),this.errorList.push({message:d,element:b,method:c.method}),this.errorMap[b.name]=d,this.submitted[b.name]=d},addWrapper:function(a){return this.settings.wrapper&&(a=a.add(a.parent(this.settings.wrapper))),a},defaultShowErrors:function(){var a,b,c;for(a=0;this.errorList[a];a++)c=this.errorList[a],this.settings.highlight&&this.settings.highlight.call(this,c.element,this.settings.errorClass,this.settings.validClass),this.showLabel(c.element,c.message);if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(a=0;this.successList[a];a++)this.showLabel(this.successList[a]);if(this.settings.unhighlight)for(a=0,b=this.validElements();b[a];a++)this.settings.unhighlight.call(this,b[a],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return a(this.errorList).map(function(){return this.element})},showLabel:function(b,c){var d,e,f,g=this.errorsFor(b),h=this.idOrName(b),i=a(b).attr("aria-describedby");g.length?(g.removeClass(this.settings.validClass).addClass(this.settings.errorClass),g.html(c)):(g=a("<"+this.settings.errorElement+">").attr("id",h+"-error").addClass(this.settings.errorClass).html(c||""),d=g,this.settings.wrapper&&(d=g.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.length?this.labelContainer.append(d):this.settings.errorPlacement?this.settings.errorPlacement(d,a(b)):d.insertAfter(b),g.is("label")?g.attr("for",h):0===g.parents("label[for='"+h+"']").length&&(f=g.attr("id").replace(/(:|\.|\[|\]|\$)/g,"\\$1"),i?i.match(new RegExp("\\b"+f+"\\b"))||(i+=" "+f):i=f,a(b).attr("aria-describedby",i),e=this.groups[b.name],e&&a.each(this.groups,function(b,c){c===e&&a("[name='"+b+"']",this.currentForm).attr("aria-describedby",g.attr("id"))}))),!c&&this.settings.success&&(g.text(""),"string"==typeof this.settings.success?g.addClass(this.settings.success):this.settings.success(g,b)),this.toShow=this.toShow.add(g)},errorsFor:function(b){var c=this.idOrName(b),d=a(b).attr("aria-describedby"),e="label[for='"+c+"'], label[for='"+c+"'] *";return d&&(e=e+", #"+d.replace(/\s+/g,", #")),this.errors().filter(e)},idOrName:function(a){return this.groups[a.name]||(this.checkable(a)?a.name:a.id||a.name)},validationTargetFor:function(b){return this.checkable(b)&&(b=this.findByName(b.name)),a(b).not(this.settings.ignore)[0]},checkable:function(a){return/radio|checkbox/i.test(a.type)},findByName:function(b){return a(this.currentForm).find("[name='"+b+"']")},getLength:function(b,c){switch(c.nodeName.toLowerCase()){case"select":return a("option:selected",c).length;case"input":if(this.checkable(c))return this.findByName(c.name).filter(":checked").length}return b.length},depend:function(a,b){return this.dependTypes[typeof a]?this.dependTypes[typeof a](a,b):!0},dependTypes:{"boolean":function(a){return a},string:function(b,c){return!!a(b,c.form).length},"function":function(a,b){return a(b)}},optional:function(b){var c=this.elementValue(b);return!a.validator.methods.required.call(this,c,b)&&"dependency-mismatch"},startRequest:function(a){this.pending[a.name]||(this.pendingRequest++,this.pending[a.name]=!0)},stopRequest:function(b,c){this.pendingRequest--,this.pendingRequest<0&&(this.pendingRequest=0),delete this.pending[b.name],c&&0===this.pendingRequest&&this.formSubmitted&&this.form()?(a(this.currentForm).submit(),this.formSubmitted=!1):!c&&0===this.pendingRequest&&this.formSubmitted&&(a(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(b){return a.data(b,"previousValue")||a.data(b,"previousValue",{old:null,valid:!0,message:this.defaultMessage(b,"remote")})},destroy:function(){this.resetForm(),a(this.currentForm).off(".validate").removeData("validator")}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(b,c){b.constructor===String?this.classRuleSettings[b]=c:a.extend(this.classRuleSettings,b)},classRules:function(b){var c={},d=a(b).attr("class");return d&&a.each(d.split(" "),function(){this in a.validator.classRuleSettings&&a.extend(c,a.validator.classRuleSettings[this])}),c},normalizeAttributeRule:function(a,b,c,d){/min|max/.test(c)&&(null===b||/number|range|text/.test(b))&&(d=Number(d),isNaN(d)&&(d=void 0)),d||0===d?a[c]=d:b===c&&"range"!==b&&(a[c]=!0)},attributeRules:function(b){var c,d,e={},f=a(b),g=b.getAttribute("type");for(c in a.validator.methods)"required"===c?(d=b.getAttribute(c),""===d&&(d=!0),d=!!d):d=f.attr(c),this.normalizeAttributeRule(e,g,c,d);return e.maxlength&&/-1|2147483647|524288/.test(e.maxlength)&&delete e.maxlength,e},dataRules:function(b){var c,d,e={},f=a(b),g=b.getAttribute("type");for(c in a.validator.methods)d=f.data("rule"+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase()),this.normalizeAttributeRule(e,g,c,d);return e},staticRules:function(b){var c={},d=a.data(b.form,"validator");return d.settings.rules&&(c=a.validator.normalizeRule(d.settings.rules[b.name])||{}),c},normalizeRules:function(b,c){return a.each(b,function(d,e){if(e===!1)return void delete b[d];if(e.param||e.depends){var f=!0;switch(typeof e.depends){case"string":f=!!a(e.depends,c.form).length;break;case"function":f=e.depends.call(c,c)}f?b[d]=void 0!==e.param?e.param:!0:delete b[d]}}),a.each(b,function(d,e){b[d]=a.isFunction(e)?e(c):e}),a.each(["minlength","maxlength"],function(){b[this]&&(b[this]=Number(b[this]))}),a.each(["rangelength","range"],function(){var c;b[this]&&(a.isArray(b[this])?b[this]=[Number(b[this][0]),Number(b[this][1])]:"string"==typeof b[this]&&(c=b[this].replace(/[\[\]]/g,"").split(/[\s,]+/),b[this]=[Number(c[0]),Number(c[1])]))}),a.validator.autoCreateRanges&&(null!=b.min&&null!=b.max&&(b.range=[b.min,b.max],delete b.min,delete b.max),null!=b.minlength&&null!=b.maxlength&&(b.rangelength=[b.minlength,b.maxlength],delete b.minlength,delete b.maxlength)),b},normalizeRule:function(b){if("string"==typeof b){var c={};a.each(b.split(/\s/),function(){c[this]=!0}),b=c}return b},addMethod:function(b,c,d){a.validator.methods[b]=c,a.validator.messages[b]=void 0!==d?d:a.validator.messages[b],c.length<3&&a.validator.addClassRules(b,a.validator.normalizeRule(b))},methods:{required:function(b,c,d){if(!this.depend(d,c))return"dependency-mismatch";if("select"===c.nodeName.toLowerCase()){var e=a(c).val();return e&&e.length>0}return this.checkable(c)?this.getLength(b,c)>0:b.length>0},email:function(a,b){return this.optional(b)||/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a)},url:function(a,b){return this.optional(b)||/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(a)},date:function(a,b){return this.optional(b)||!/Invalid|NaN/.test(new Date(a).toString())},dateISO:function(a,b){return this.optional(b)||/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a)},number:function(a,b){return this.optional(b)||/^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)},digits:function(a,b){return this.optional(b)||/^\d+$/.test(a)},creditcard:function(a,b){if(this.optional(b))return"dependency-mismatch";if(/[^0-9 \-]+/.test(a))return!1;var c,d,e=0,f=0,g=!1;if(a=a.replace(/\D/g,""),a.length<13||a.length>19)return!1;for(c=a.length-1;c>=0;c--)d=a.charAt(c),f=parseInt(d,10),g&&(f*=2)>9&&(f-=9),e+=f,g=!g;return e%10===0},minlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||e>=d},maxlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||d>=e},rangelength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||e>=d[0]&&e<=d[1]},min:function(a,b,c){return this.optional(b)||a>=c},max:function(a,b,c){return this.optional(b)||c>=a},range:function(a,b,c){return this.optional(b)||a>=c[0]&&a<=c[1]},equalTo:function(b,c,d){var e=a(d);return this.settings.onfocusout&&e.off(".validate-equalTo").on("blur.validate-equalTo",function(){a(c).valid()}),b===e.val()},remote:function(b,c,d){if(this.optional(c))return"dependency-mismatch";var e,f,g=this.previousValue(c);return this.settings.messages[c.name]||(this.settings.messages[c.name]={}),g.originalMessage=this.settings.messages[c.name].remote,this.settings.messages[c.name].remote=g.message,d="string"==typeof d&&{url:d}||d,g.old===b?g.valid:(g.old=b,e=this,this.startRequest(c),f={},f[c.name]=b,a.ajax(a.extend(!0,{mode:"abort",port:"validate"+c.name,dataType:"json",data:f,context:e.currentForm,success:function(d){var f,h,i,j=d===!0||"true"===d;e.settings.messages[c.name].remote=g.originalMessage,j?(i=e.formSubmitted,e.prepareElement(c),e.formSubmitted=i,e.successList.push(c),delete e.invalid[c.name],e.showErrors()):(f={},h=d||e.defaultMessage(c,"remote"),f[c.name]=g.message=a.isFunction(h)?h(b):h,e.invalid[c.name]=!0,e.showErrors(f)),g.valid=j,e.stopRequest(c,j)}},d)),"pending")}}});var b,c={};a.ajaxPrefilter?a.ajaxPrefilter(function(a,b,d){var e=a.port;"abort"===a.mode&&(c[e]&&c[e].abort(),c[e]=d)}):(b=a.ajax,a.ajax=function(d){var e=("mode"in d?d:a.ajaxSettings).mode,f=("port"in d?d:a.ajaxSettings).port;return"abort"===e?(c[f]&&c[f].abort(),c[f]=b.apply(this,arguments),c[f]):b.apply(this,arguments)})});
