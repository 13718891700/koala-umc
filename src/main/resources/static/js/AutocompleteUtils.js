function AutocompleteUtil() {
}

/**
 * autocomplete 下拉组件
 *
 * @param nameDom 名称的dom节点 eg: #customerName
 * @param url 请求地址
 * @param notice 匹配不到数据显示的文字
 * @param codeDom 需要回传编码的dom节点 eg: #customerCode
 */
AutocompleteUtil.init = function(nameDom, url, notice, codeDom) {

    if(!nameDom || !url || !notice){
        return;
    }

    $(nameDom).autocomplete({
        mustMatch : true,
        minChars  : 0,
        paramName : 'key',
        dataType  : 'json',
        deferRequestBy : 300,
        serviceUrl: url,
        autoSelectFirst: true,
        showNoSuggestionNotice: true,
        noSuggestionNotice: notice,
        max: 10,
        onInvalidateSelection: function(){
        },
        formatResult: function (suggestion, currentValue){
            return suggestion.display;
        },
        transformResult: function(response) {
            return {
                suggestions: $.map(response.result.result, function(dataItem) {
                    return { value: dataItem.value, code:dataItem.key, data: null, display: dataItem.display };
                })
            };
        },
        onSelect: function (suggestion) {
            $(nameDom).val(suggestion.display);
            $(codeDom).val(suggestion.code);
        }
    });

};