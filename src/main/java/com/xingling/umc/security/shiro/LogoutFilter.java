package com.xingling.umc.security.shiro;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
/**
 * <p>Title:	  LogoutFilter. </p>
 * <p>Description TODO </p>
 * <p>Company:    http://www.hnxianyi.com </p>
 *
 * @Author         <a href="190332447@qq.com"/>杨文生</a>
 * @CreateDate     2017/1/6 18:06
 */
public class LogoutFilter extends org.apache.shiro.web.filter.authc.LogoutFilter{

	@Override
	protected boolean preHandle(ServletRequest request, ServletResponse response)
			throws Exception {
		return super.preHandle(request, response);
	}
}
