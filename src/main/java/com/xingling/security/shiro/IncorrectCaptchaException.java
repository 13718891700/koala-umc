package com.xingling.security.shiro;

import org.apache.shiro.authc.AuthenticationException;

/**
 * <p>Title:	  IncorrectCaptchaException. </p>
 * <p>Description TODO </p>
 * <p>Company:    http://www.hnxianyi.com </p>
 *
 * @Author         <a href="190332447@qq.com"/>杨文生</a>
 * @CreateDate     2017/1/6 18:04
 */
public class IncorrectCaptchaException extends AuthenticationException {

	public IncorrectCaptchaException() {
		super();
	}

	public IncorrectCaptchaException(String message, Throwable cause) {
		super(message, cause);
	}

	public IncorrectCaptchaException(String message) {
		super(message);
	}

	public IncorrectCaptchaException(Throwable cause) {
		super(cause);
	}
}