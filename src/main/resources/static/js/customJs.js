//打开提示模态框
var selectIds=new Array();
var ids = new Array();
		function  openModal(msg){
			 $('#msgText').html(msg);
			 $('#msgModal').modal({
				 keyboard: false,
					backdrop:false,
					show:true
			 });
		 }
		function  openModalLoad(msg,url){
			 $('#msgText').html(msg);
			 $('#msgModal').modal({
				 keyboard: false,
					backdrop:false,
					show:true
			 });
			 $('#msgModal').on('hidden.bs.modal', function () {  
				 loadJsp(url);  
			   }); 
		 }
		function getSelectIds(){
			//不能用=号直接赋值，那样会导致set ids的时候改变selectIds的值//引用。
			 for(var i=0;i<ids.length;i++){
				 selectIds[i]=ids[i];
			 }
		}
		//阻止事件冒泡
		function stopPropagation(e) {  
		    e = e || window.event;  
		    if(e.stopPropagation) { //W3C阻止冒泡方法  
		        e.stopPropagation();  
		    } else {  
		        e.cancelBubble = true; //IE阻止冒泡方法  
		    }  
		}
		
		function loadJsp(url){
			$("#content").load(url,function(response,status){
				
			});
		}
		
	
		 
 
