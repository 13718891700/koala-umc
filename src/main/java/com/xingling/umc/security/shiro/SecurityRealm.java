package com.xingling.umc.security.shiro;

import com.xingling.umc.domain.User;
import com.xingling.umc.service.UserService;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;

import javax.annotation.Resource;

/**
 * <p>Title:	  SecurityRealm. </p>
 * <p>Description TODO </p>
 * <p>Company:    http://www.hnxianyi.com </p>
 *
 * @Author         <a href="190332447@qq.com"/>杨文生</a>
 * @CreateDate     2017/1/6 18:07
 */
public class SecurityRealm extends AuthorizingRealm{
	
	@Resource
	private UserService userService;
	
	/**
	 * 认证回调函数, 登录时调用
	 */
	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authcToken) throws AuthenticationException{
		CaptchaAuthenticationToken token = (CaptchaAuthenticationToken) authcToken;
	   // 校验用户名密码
	   User user = null;
		try {
            user = userService.getUserByUserName(token.getUsername());
		} catch (Exception e) {
			e.printStackTrace();
		}
		if(user == null){
			throw new UnknownAccountException("用户名不存在!");
		}
		//交给AuthenticatingRealm使用CredentialsMatcher进行密码匹配，如果觉得人家的不好可以自定义实现
		SimpleAuthenticationInfo authenticationInfo = new SimpleAuthenticationInfo(user.getUserName(),user.getPassword(),ByteSource.Util.bytes(user.getSalt()),getName());
        return authenticationInfo;
	}

	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(
			PrincipalCollection principals) {
		String username = (String)principals.getPrimaryPrincipal();

        SimpleAuthorizationInfo authorizationInfo = new SimpleAuthorizationInfo();
        //authorizationInfo.setRoles(userService.findRoles(username));
        //authorizationInfo.setStringPermissions(userService.findPermissions(username));
        return authorizationInfo;
	}

    @Override
	public boolean supports(AuthenticationToken token) {
		return token != null && (token instanceof CaptchaAuthenticationToken);
	}
    
}
