package com.xingling.umc.security.session;

import com.xingling.util.StringUtils;
import org.apache.shiro.session.mgt.SessionContext;
import org.apache.shiro.web.session.mgt.WebSessionContext;

import javax.servlet.http.HttpServletRequest;

/**
 * <p>Title:	  SessionFactory. </p>
 * <p>Description 创建自定义的session， 添加一些自定义的数据 如 用户登录到的系统ip 用户状态（在线 隐身 强制退出） 等 比如当前所在系统等 </p>
 * <p>Company:    http://www.hnxianyi.com </p>
 *
 * @Author         <a href="190332447@qq.com"/>杨文生</a>
 * @CreateDate     2017/1/7 11:55
 */
public class SessionFactory implements org.apache.shiro.session.mgt.SessionFactory {

	@Override
	public org.apache.shiro.session.Session createSession(SessionContext initData) {
		Session session = new Session();
		if (initData != null && initData instanceof WebSessionContext) {
			WebSessionContext sessionContext = (WebSessionContext) initData;
			HttpServletRequest request = (HttpServletRequest) sessionContext.getServletRequest();
			if (request != null) {
				session.setHost(StringUtils.getRemoteAddr(request));
				session.setUserAgent(request.getHeader("UmcUser-Agent"));
				session.setSystemHost(request.getLocalAddr() + ":" + request.getLocalPort());
			}
		}
		return session;
	}
}
