package com.xingling.umc.security.core;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class CaptchaAuthenticationToken extends UsernamePasswordAuthenticationToken {

	private static final long serialVersionUID = 1L;

	private String captcha;

	public CaptchaAuthenticationToken(String captcha, Object principal,
			Object credentials) {
		super(principal, credentials);
		this.setCaptcha(captcha);
		super.setAuthenticated(false);
	}

	public CaptchaAuthenticationToken(String captcha, Object principal,
			Object credentials, Collection<? extends GrantedAuthority> authorities) {
		super(principal, credentials, authorities);
		this.setCaptcha(captcha);
		super.setAuthenticated(true);
	}

	@Override
	public boolean isAuthenticated() {
		return super.isAuthenticated();
	}

	public String getCaptcha() {
		return captcha;
	}

	public void setCaptcha(String captcha) {
		this.captcha = captcha;
	}
	
	public UsernamePasswordAuthenticationToken toUsernamePasswordAuthenticationToken(){
		UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(this.getPrincipal(), this.getCredentials());
		return usernamePasswordAuthenticationToken;
	}

}
