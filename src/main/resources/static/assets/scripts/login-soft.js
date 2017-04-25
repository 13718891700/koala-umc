var Login = function () {

	var handleLogin = function() {
		$('.login-form').validate({
	            errorElement: 'span', //default input error message container
	            errorClass: 'help-block', // default input error message class
	            focusInvalid: false, // do not focus the last invalid input
	            rules: {
	            	username: {
	                    required: true
	                },
	                password: {
	                    required: true
	                },
	                remember: {
	                    required: false
	                },
	                verifyCode:{
	                	required: true
	                }
	            },

	            messages: {
	            	username: {
	                    required: "用户名不能为空."
	                },
	                password: {
	                    required: "密码不能为空."
	                },
	                verifyCode: {
	                    required: "验证码不能为空."
	                }
	            },

	            invalidHandler: function (event, validator) { //display error alert on form submit   
	                $('.alert-danger', $('.login-form')).show();
	            },

	            highlight: function (element) { // hightlight error inputs
	                $(element)
	                    .closest('.form-group').addClass('has-error'); // set error class to the control group
	            },

	            success: function (label) {
	                label.closest('.form-group').removeClass('has-error');
	                label.remove();
	            },

	            errorPlacement: function (error, element) {
	                error.insertAfter(element.closest('.input-icon'));
	            },

	            submitHandler: function (form) {
	                form.submit();
	            }
	        });

	        $('.login-form input').keypress(function (e) {
	            if (e.which == 13) {
	                if ($('.login-form').validate().form()) {
	                    $('.login-form').submit();
	                }
	                return false;
	            }
	        });
	}
	var handleResetPwd = function () {
		$('.login-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: true, // do not focus the last invalid input
            rules: {
                password: {
                    required: true
                },
                confirmpassword:{
                	required: true,
                	equalTo: "#password"
                }
            },

            messages: {
                password: {
                    required: "密码不能为空."
                },
                confirmpassword: {
                    required: "确认密码不能为空.",
                    equalTo: "两次密码必须一致"	
                }
            },

            highlight: function (element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            success: function (label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },

            errorPlacement: function (error, element) {
                error.insertAfter(element.closest('.input-icon'));
            },

            submitHandler: function (form) {
                form.submit();
            }
        });

        $('.login-form input').keypress(function (e) {
            if (e.which == 13) {
                if ($('.login-form').validate().form()) {
                    $('.login-form').submit();
                }
                return false;
            }
        });
	}
	
	var handleForgetPassword = function () {
		$('.forget-form').validate({
	            errorElement: 'span', //default input error message container
	            errorClass: 'help-block', // default input error message class
	            focusInvalid: false, // do not focus the last invalid input
	            ignore: "",
	            rules: {
	                email: {
	                    required: true,
	                    email: true
	                }
	            },

	            messages: {
	                email: {
	                    required: "邮箱不能为空。"
	                }
	            },

	            invalidHandler: function (event, validator) { //display error alert on form submit   

	            },

	            highlight: function (element) { // hightlight error inputs
	                $(element)
	                    .closest('.form-group').addClass('has-error'); // set error class to the control group
	            },

	            success: function (label) {
	                label.closest('.form-group').removeClass('has-error');
	                label.remove();
	            },

	            errorPlacement: function (error, element) {
	                error.insertAfter(element.closest('.input-icon'));
	            },

	            submitHandler: function (form) {
	                form.submit();
	            }
	        });

	        $('.forget-form input').keypress(function (e) {
	            if (e.which == 13) {
	                if ($('.forget-form').validate().form()) {
	                    $('.forget-form').submit();
	                }
	                return false;
	            }
	        });

	        jQuery('#forget-password').click(function () {
	            jQuery('.login-form').hide();
	            jQuery('.forget-form').show();
	        });

	        jQuery('#back-btn').click(function () {
	            jQuery('.login-form').show();
	            jQuery('.forget-form').hide();
	        });

	}

	var handleRegister = function () {

		function format(state) {
            if (!state.id) return state.text; // optgroup
            return "<img class='flag' src='assets/img/flags/" + state.id.toLowerCase() + ".png'/>&nbsp;&nbsp;" + state.text;
        }


		$("#select2_sample4").select2({
		  	placeholder: '<i class="fa fa-map-marker"></i>&nbsp;请选择国家',
            allowClear: true,
            formatResult: format,
            formatSelection: format,
            escapeMarkup: function (m) {
                return m;
            }
        });

		$('#select2_sample4').change(function () {
            $('.register-form').validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
        });

		$("#select_sex").select2({
		  	placeholder: '<i class="fa  fa-female"></i>&nbsp;请选择性别',
            allowClear: true,
            formatResult: format,
            formatSelection: format,
            escapeMarkup: function (m) {
                return m;
            }
        });

         $('.register-form').validate({
	            errorElement: 'span', //default input error message container
	            errorClass: 'help-block', // default input error message class
	            focusInvalid: false, // do not focus the last invalid input
	            ignore: "",
	            rules: {
	                
	                realname: {
	                    required: true
	                },
	                sex: {
	                    required: true
	                },
	                age: {
	                    required: true,
	                },
	                birthdate: {
	                    required: true
	                },
	                cellPhone: {
	                	required: true
	                },
	                email: {
	                    required: true,
	                    email: true
	                },
	                address: {
	                    required: true
	                },
	                city: {
	                    required: true
	                },
	                country: {
	                    required: true
	                },

	                username: {
	                    required: true
	                },
	                password: {
	                    required: true
	                },
	                rpassword: {
	                    equalTo: "#register_password"
	                },

	                tnc: {
	                    required: true
	                }
	            },

	            messages: { // custom messages for radio buttons and checkboxes
	            	 	realname: {
		                    required: "真实姓名不能为空。"
		                },
		                sex: {
		                    required: "性別不能为空。"
		                },
		                age: {
		                    required: "年龄不能为空。",
		                },
		                birthdate: {
		                    required: "生日不能为空。"
		                },
		                cellPhone: {
		                	required: "手机号码不能为空。"
		                },
		                email: {
		                    required: "邮箱不能为空。"
		                },
		                address: {
		                    required: "地址不能为空。"
		                },
		                city: {
		                    required: "所在城市不能为空。"
		                },
		                country: {
		                    required: "所属国家不能为空。"
		                },
		                address: {
		                    required: "地址不能为空。"
		                },
		                username: {
		                    required: "用户名不能为空。"
		                },
		                password: {
		                    required: "密码不能 为空。"
		                },
		                rpassword: {
		                    equalTo: "两次密码必须一致。"
		                },
		                tnc: {
		                    required: "必须同意以上协议。"
		                }
	               
	            },

	            invalidHandler: function (event, validator) { //display error alert on form submit   

	            },

	            highlight: function (element) { // hightlight error inputs
	                $(element)
	                    .closest('.form-group').addClass('has-error'); // set error class to the control group
	            },

	            success: function (label) {
	                label.closest('.form-group').removeClass('has-error');
	                label.remove();
	            },

	            errorPlacement: function (error, element) {
	                if (element.attr("name") == "tnc") { // insert checkbox errors after the container                  
	                    error.insertAfter($('#register_tnc_error'));
	                } else if (element.closest('.input-icon').size() === 1) {
	                    error.insertAfter(element.closest('.input-icon'));
	                } else {
	                	error.insertAfter(element);
	                }
	            },

	            submitHandler: function (form) {
	                form.submit();
	            }
	        });

			$('.register-form input').keypress(function (e) {
	            if (e.which == 13) {
	                if ($('.register-form').validate().form()) {
	                    $('.register-form').submit();
	                }
	                return false;
	            }
	        });

	        jQuery('#register-btn').click(function () {
	            jQuery('.login-form').hide();
	            jQuery('.register-form').show();
	        });

	        jQuery('#register-back-btn').click(function () {
	            jQuery('.login-form').show();
	            jQuery('.register-form').hide();
	        });
	}
    
    return {
        //main function to initiate the module
        init: function () {
        	
            handleLogin();
            handleForgetPassword();
            handleRegister();        
	       
	       	$.backstretch([
		        "assets/img/bg/1.jpg",
		        "assets/img/bg/2.jpg",
		        "assets/img/bg/3.jpg",
		        "assets/img/bg/4.jpg"
		        ], {
		          fade: 1000,
		          duration: 8000
		    });
        },
	    initOfResetPwd: function () {
	    	
	        handleResetPwd();      
	       
	       	$.backstretch([
		        "../assets/img/bg/1.jpg",
		        "../assets/img/bg/2.jpg",
		        "../assets/img/bg/3.jpg",
		        "../assets/img/bg/4.jpg"
		        ], {
		          fade: 1000,
		          duration: 8000
		    });
	    }

    };

}();