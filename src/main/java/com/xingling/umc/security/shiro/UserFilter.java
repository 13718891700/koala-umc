package com.xingling.umc.security.shiro;

import com.xingling.util.Servlets;
import org.apache.shiro.subject.Subject;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * <p>Title:	  UserFilter. </p>
 * <p>Description 该过滤器是用来拦截未登录的请求，直接跳转到登陆页面 </p>
 * <p>Company:    http://www.hnxianyi.com </p>
 *
 * @Author         <a href="190332447@qq.com"/>杨文生</a>
 * @CreateDate     2017/1/6 18:07
 */
public class UserFilter extends org.apache.shiro.web.filter.authc.UserFilter {
	
    @Override
    protected boolean isAccessAllowed(ServletRequest request, ServletResponse response, Object mappedValue) {
        if (isLoginRequest(request, response)) {
            return true;
        }else {
            Subject subject = getSubject(request, response);
            if(subject.isRemembered()) {
                return false;
            }
            if(!subject.isAuthenticated()) {
                return false;
            }
            return subject.getPrincipal() != null;
        } 
    }

	@Override
	protected boolean onAccessDenied(ServletRequest request,
                                     ServletResponse response, Object mappedValue) throws Exception {
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		HttpServletResponse httpResponse = (HttpServletResponse) response;
		if (Servlets.isAjaxRequest(httpRequest)) {

		} else {
		    saveRequestAndRedirectToLogin(request, response);
		}
		return false;
	}
	  
	

}
