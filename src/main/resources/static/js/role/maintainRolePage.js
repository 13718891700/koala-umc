$('.page-content-area').ace_ajax('loadScripts', scripts, function() {
	$(document).ready(main);
});

function main(){
	//初始化页面数据
	initPageData();
	// 查询
	$("#queryBtn").click(function() {
		queryData(1);
	});
	
}


//页面数据初始化
function initPageData(){
	var active_class = 'active';
	$('#simple-table > thead > tr > th input[type=checkbox]').eq(0).on('click', function(){
		var th_checked = this.checked;//checkbox inside "TH" table header
		
		$(this).closest('table').find('tbody > tr').each(function(){
			var row = this;
			if(th_checked) $(row).addClass(active_class).find('input[type=checkbox]').eq(0).prop('checked', true);
			else $(row).removeClass(active_class).find('input[type=checkbox]').eq(0).prop('checked', false);
		});
	});
	$('#simple-table').on('click', 'td input[type=checkbox]' , function(){
		var $row = $(this).closest('tr');
		if($row.is('.detail-row ')) return;
		if(this.checked) $row.addClass(active_class);
		else $row.removeClass(active_class);
	});
	queryData(1);
}


//初始化默认查询时间
function initQueryDate(){
	
}


function validateQueryForm(){
	return true;
}


function queryData(pageNum) {

	var param = {};
	
	param.pageNum = pageNum;
	param.pageSize = 10;
	

	CommonClient.post(sys.rootPath + "/sys/role/queryRoleListWithPage", param, function(result) {

		if (result == undefined || result == null) {
			alert("HTTP请求无数据返回！");
		} else if (result.code == 200) {// 1:normal
			reloadGrid(result);// 刷新页面数据
		} else {
			$("#dataTbody").html("");
		}
	});
}

function reloadGrid(data) {
	var htmlText = "";
	
	var length = data.result.list.length;
	
	if(length < 1){
		return;
	}
	
	for ( var i = 0; i < data.result.list.length; i++) {
		var item = data.result.list[i];
		htmlText +="<tr>"
			+ "<td class='center' ><label class='pos-rel'><input type='checkbox' name='ids' class='ace' value='"+ item.id +"' id='"+ item.id +"' alt='"+ item.Rolename +"'/><span class='lbl'></span></label></td>"
			    + "<td >" + StringUtil.nullToEmpty(item.code) + "</td>"
			    + "<td >" + StringUtil.nullToEmpty(item.name) + "</td>"
				+ "<td >" 
				+ "<span class=\"label label-sm label-warning\">" 
				+ StringUtil.nullToEmpty(item.status) 
				+ "</span>"
				+ "</td>"
				+ "<td >" + StringUtil.nullToEmpty(item.lastOperator) + "</td>"
				+ "<td >" + StringUtil.nullToEmpty(item.updateTime) + "</td>"
				+ "<td >" + StringUtil.nullToEmpty(item.description) + "</td>"
				+ "<td >" + 操作 + "</td>"
				+ "</tr class='center'>";
	}
	$("#dataTbody").html(htmlText);
}
