package com.xingling.umc.security.core;

import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.SpringSecurityMessageSource;

public class CaptchaAuthenticationProvider extends DaoAuthenticationProvider {

	protected MessageSourceAccessor messages = SpringSecurityMessageSource.getAccessor();

	@Override
	public Authentication authenticate(Authentication authentication)
			throws AuthenticationException {
		// 第一步，拿到表单信息
		CaptchaAuthenticationToken token = (CaptchaAuthenticationToken) authentication;
		// 验证成功，返回合法的token
		//return new CaptchaAuthenticationToken(token.getName(), token.getCredentials().toString(),token.getCaptcha());
		return super.authenticate(token.toUsernamePasswordAuthenticationToken());
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return CaptchaAuthenticationToken.class.isAssignableFrom(authentication);
	}


}
