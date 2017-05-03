window.onload = function () {
    var href = window.location.hash.substring(1);
    var vm = new Vue({
        el: "body",
        data: {
            loginName: "",
            loginPwd: "",
            systemId: "",
            user: '',
            oper: '',
            part: '',
            classes: '',
            ten: '',
            loginErrorMessage: "",
            ufade: false,
            pfade: false,
            ofade: false,
            sfade: false,
            mfade: false,
            pone: false,
            mfields: [
                {date: "10-06", news: "新增 运营身份 报表统计系统"},
                {date: "10-01", news: "服务器维护 19:30 开通"},
                {date: "09-11", news: "新增 伙伴系统 财务系统统计"},
                {date: "09-10", news: "移除 伙伴系统 增值业务查询"},
            ]
        },
        methods: {
            throwback: function (val) {
                this.ten = "height-one"
                this.loginName = ''
                this.loginPwd = ''
                this.pone = false
                if (val == '1') {
                    if (this.ufade == true) {
                        this.ufade = false
                        this.classes = "heights-min"
                        this.oper = "fadeOut-anime"
                        this.part = "fadeOut-anime"
                    } else {
                        this.ufade = true
                        this.pfade = false
                        this.ofade = false
                        this.classes = "heights-max"
                        this.user = "fadeOut-anime"
                        this.oper = "fadeIn-anime"
                        this.part = "fadeIn-anime"
                        this.systemId = 3000
                    }
                } else if (val == '2') {
                    if (this.ofade == true) {
                        this.ofade = false
                        this.classes = "heights-min"
                        this.user = 'fadeOut-anime'
                        this.part = 'fadeOut-anime'
                    } else {
                        this.ofade = true
                        this.pfade = false
                        this.ufade = false
                        this.classes = "heights-max"
                        this.oper = "fadeOut-anime"
                        this.user = "fadeIn-anime"
                        this.part = "fadeIn-anime"
                        this.systemId = 1000
                    }
                } else if (val == '3') {
                    if (this.pfade == true) {
                        this.pfade = false
                        this.oper = 'fadeOut-anime'
                        this.user = 'fadeOut-anime'
                        if (this.classes == "heights-max") {
                            this.classes = "heights-min"
                        }
                    } else {
                        this.pfade = true
                        this.ufade = false
                        this.ofade = false
                        if (this.classes == "heights-max") {
                            this.classes = "heights-min"
                        }
                        this.part = "fadeOut-anime"
                        this.user = "fadeIn-anime"
                        this.oper = "fadeIn-anime"
                        this.systemId = 2000
                    }
                }
                vm.$nextTick(function () {
                    document.getElementById("user").focus();
                })
            },
            showhidden: function () {
                if (this.mfade == true) {
                    this.mfade = false
                    this.roll = ""
                } else {
                    this.mfade = true
                    this.roll = "play"
                }
            },
            jump: function () {
                window.open("http://shang.qq.com/email/stop/email_stop.html?qq=314719&sig=32fadd9314c63410295b30f4f78794aedebafd86a16da285&tttt=1")
            },
            onSubmit: function () {
                var self = this
                if(self.systemId == '2000'){
                    alert("本功能暂未开放!");
                    return;
                }
                Vue.http.post('/login', {
                    loginName: self.loginName,
                    loginPwd: self.loginPwd,
                    systemId: self.systemId
                }).then(
                    function (response) {
                        if (response.body.code == 200) {
                            var token = response.body.result;
                            if (!token) {
                                self.pone = true
                                self.ten = "height-ten"
                                self.loginErrorMessage = "页面已失效,请刷新页面重试"
                                return
                            }
                            window.localStorage.setItem('token', token)
                            window.location.href = "/welcome?token=" + token
                        } else {
                            var message = response.body.message
                            if (message == "用户名为空") {
                                self.pone = true
                                self.ten = "height-ten"
                                document.getElementById("user").focus();
                                self.loginErrorMessage = response.body.message
                            } else {
                                if (message == "密码为空") {
                                    self.pone = true
                                    self.ten = "height-ten"
                                    document.getElementById("pwd").focus();
                                    self.loginErrorMessage = response.body.message
                                } else if (message == "用户不存在") {
                                    self.pone = true
                                    self.ten = "height-ten"
                                    document.getElementById("user").focus();
                                    self.loginErrorMessage = response.body.message
                                } else if (message = "密码错误") {
                                    document.getElementById("pwd").focus();
                                    self.pone = true
                                    self.ten = "height-ten"
                                    document.getElementById("pwd").focus();
                                    self.loginErrorMessage = response.body.message
                                }
                            }
                        }
                    }, function (err) {
                        alert("未知异常")
                    }
                );
            },
            keycode: function (e) {
                if (e.which == 13) {
                    this.onSubmit(e);
                } else if (e.which == 9) {
                  if(this.loginPwd == "" && document.getElementById("user") == document.activeElement && this.loginName !=""){

                  }else if(document.getElementById("user") == document.activeElement && this.loginName ==""){
                    if (e && e.preventDefault) {
                      e.preventDefault();
                    } else {
                      window.event.returnValue = false;
                      return false;
                    }
                    if(this.pone == false){
                      this.pone = true
                      this.ten = "height-ten"
                      this.loginErrorMessage="用户名为空"
                    }
                  }else if(document.getElementById("pwd") == document.activeElement){
                    this.onSubmit(e);
                  }
                }else{
                    this.pone = false
                    this.ten = "height-one"
                }
            }
        }
    })
    if(href.length>=1){
        vm.throwback(href);
    }
}