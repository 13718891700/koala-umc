
function Select2Util() {
}
/**
 *
 * @param dom dom节点
 * @param url 请求url
 * @param placeholder placeholder
 */
Select2Util.singleSelectInit = function (dom, url, placeholder, codeDom) {

    if (!dom || !url) {
        return;
    }

    if(placeholder){
        placeholder = '';
    }

    $(dom).select2({
        ajax: {
            type: 'GET',
            url: url,
            dataType: 'json',
            delay: 250,
            data: function (term, page) {
                return {
                    name: term,
                    pageNum: page,
                    pageSize: 10
                };
            },
            // processResults: function (data, params) {
            //     params.page = params.page || 1;
            //     console.info("params: " + params.page);
            //     return {
            //         results: data.result.list,
            //         pagination: {
            //             more: (params.page * 10) < data.result.total
            //         }
            //     };
            // },
            results: function (data, page) {
                var more = (page * 10) < data.result.total;
                return {results: data.result.list, more: more};
            },
            cache: true
        },
        multiple: false,
        allowClear: true,
        placeholder: placeholder,//默认文字提示
        language: "zh-CN",
        escapeMarkup: function (markup) {
            return markup;
        }, // 自定义格式化防止xss注入
        minimumInputLength: 0,//最少输入多少个字符后开始查询
        formatResult: function formatRepo(repo) {
            // console.info("formatResult: " + JSON.stringify(repo));
            return repo.name;
        }, // 函数用来渲染结果
        formatSelection: function formatRepoSelection(repo) {
            // console.info("formatSelection: " + JSON.stringify(repo));
            $(dom).val(repo.name);
            $(codeDom).val(repo.code);
            var s2Id = "#s2id_"+$(dom).attr("id");
            var value = $(dom).val();
            if (value == null || value == ""){
                $("#s2id_"+$(dom).attr("id")).find(".select2-search-choice-close").css({"display":"none"});
                $(s2Id).removeClass("select2-allowclear");
            }else{
                $("#s2id_"+$(dom).attr("id")).find(".select2-search-choice-close").css({"display":"block"});
                $(s2Id).addClass("select2-allowclear");
            }
            return repo.name;
        }// 函数用于呈现当前的选择
    });

    $("#s2id_"+$(dom).attr("id")).find(".select2-search-choice-close").on("click",function(){
        $(codeDom).val("");
        $(this).css({"display":"none"})
    });
};