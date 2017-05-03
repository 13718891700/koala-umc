
<script type="text/javascript">
    $(document).ready(main);
    var sys;
    function main() {
        sys = sys || {};
        sys.addrPath = "${addrUrl!}";
        sys.rootPath = "${request.getContextPath()}";
        sys.pageNum = 20;
    }


$(document).ajaxSend( function(event,jqXHR){
        jqXHR.setRequestHeader('Authorization',"Bearer " + window.localStorage.getItem('token'));
    });

    $(document).ajaxComplete( function(event,jqXHR){
        var newSpm = jqXHR.getResponseHeader('newtoken');
        if(newSpm){
        	window.localStorage.setItem('token',newSpm);
        }
    });
</script>