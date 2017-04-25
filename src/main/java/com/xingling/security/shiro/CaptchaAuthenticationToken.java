package com.xingling.security.shiro;

import org.apache.shiro.authc.UsernamePasswordToken;

/**
 * <p>Title:	  CaptchaAuthenticationToken. </p>
 * <p>Description TODO </p>
 * <p>Company:    http://www.hnxianyi.com </p>
 *
 * @Author         <a href="190332447@qq.com"/>杨文生</a>
 * @CreateDate     2017/1/6 18:03
 */
public class CaptchaAuthenticationToken extends UsernamePasswordToken{  

    private String kaptcha;  
    
    private boolean mobileLogin;
    
    public CaptchaAuthenticationToken (){}  

    public CaptchaAuthenticationToken (String username, String password,
            boolean rememberMe, String host, String kaptcha,boolean mobileLogin) {
        super(username, password, rememberMe, host);
        this.kaptcha = kaptcha;
        this.mobileLogin = mobileLogin;
    }
    
    public CaptchaAuthenticationToken(String username, String password){
    	super(username, password);
    }

	public String getKaptcha() {
		return kaptcha;
	}

	public void setKaptcha(String kaptcha) {
		this.kaptcha = kaptcha;
	}

	public boolean isMobileLogin() {
		return mobileLogin;
	}

	public void setMobileLogin(boolean mobileLogin) {
		this.mobileLogin = mobileLogin;
	}
	
  }