<script type="text/javascript">
    $(document).ajaxSend(function (event, jqXHR) {
      var token = getJwtToken();
      jqXHR.setRequestHeader('Authorization', "Bearer " + token);
    });
    $(document).ajaxComplete( function(event,jqXHR){
        var token = jqXHR.getResponseHeader('token');
        if(token){
        	setJwtToken(token)
        }
    });
</script>