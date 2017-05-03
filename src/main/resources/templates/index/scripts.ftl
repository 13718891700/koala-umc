<!-- js库 -->
<script src="js/jquery-2.1.0.js"></script>
<script src="js/highcharts.js"></script>
<script src="js/highcharts-3d.js"></script>
<script src="js/lib/raphael-min.js"></script>
<script src="js/lib/roRoBanner.js"></script>
<script src="js/lib/Num_selec.js"></script>
<script src="js/res/chinaMapConfig.js"></script>
<script src="js/map-min.js"></script>
<!-- js单页面 -->
<script src="js/index.js"></script>
<script src="js/chart_animate.js"></script>
<script>
    // JS判断客户端是手机还是PC
    var flag = true;
    function IsPC() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone",
            "SymbianOS", "Windows Phone",
            "iPad", "iPod"];
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    }
    IsPC();
    switch(flag){
        case true:
            // window.location.href='http://open.xianyiscm.com/';
            // console.log('pc..')
            break;
        case false:
            window.location.href='http://www.xianyiscm.com/m/';
            // console.log('手机端..')
            break;
    }
</script>