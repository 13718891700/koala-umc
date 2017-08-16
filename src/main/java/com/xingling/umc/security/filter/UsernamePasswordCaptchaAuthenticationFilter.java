package com.xingling.umc.security.filter;

import com.xingling.umc.security.core.CaptchaAuthenticationToken;
import com.xingling.umc.security.exception.IncorrectCaptchaException;
import com.xingling.util.CookieUtil;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class UsernamePasswordCaptchaAuthenticationFilter extends
		UsernamePasswordAuthenticationFilter {

	@Resource
	private RedisTemplate redisTemplate;

	public static final String captchaParam = "captcha";


	@Override
	public Authentication attemptAuthentication(HttpServletRequest request,
                HttpServletResponse response) throws AuthenticationException {
		// 获取参数
		String username = obtainUsername(request);
		if (username == null) {
			username = "";
		}
		String password = obtainPassword(request);
		if (password == null) {
			password = "";
		}
		String validationCode = this.obtainGeneratedCaptcha(request);
		String expectedCode = this.obtainCaptcha(request);
		if (validationCode == null) {
			validationCode = "";
		}
		if(validationCode == null)
			throw new IncorrectCaptchaException(this.messages.getMessage("LoginAuthentication.captchaInvalid"));
		if(!validationCode.equalsIgnoreCase(expectedCode)){
			throw new IncorrectCaptchaException(this.messages.getMessage("LoginAuthentication.captchaNotEquals"));
		}
		username = username.trim();
		password = password.trim();
		validationCode = validationCode.trim();
		CaptchaAuthenticationToken authRequest = new CaptchaAuthenticationToken(username, password, validationCode);
		return this.getAuthenticationManager().authenticate(authRequest);
	}

	protected String obtainCaptcha(HttpServletRequest request) {
		return request.getParameter(captchaParam);
	}

	protected String obtainGeneratedCaptcha(HttpServletRequest request) {
		Cookie[] cookies = request.getCookies();
		for(Cookie cookie : cookies){
			System.out.println(cookie.toString());
		}
		String captchaCode = CookieUtil.findCookie("captchaCode",request);
		//redis中查询验证码
		return redisTemplate.opsForValue().get(captchaCode).toString();
	}
}
