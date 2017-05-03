package com.xingling.umc.security.shiro;
import com.xingling.umc.utils.cache.CacheHandler;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.CredentialsException;
import org.apache.shiro.authc.ExcessiveAttemptsException;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;

import javax.annotation.Resource;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * <p>Title:	  RetryLimitHashedCredentialsMatcher. </p>
 * <p>Description TODO </p>
 * <p>Company:    http://www.hnxianyi.com </p>
 *
 * @Author         <a href="190332447@qq.com"/>杨文生</a>
 * @CreateDate     2017/1/6 18:06
 */
public class RetryLimitHashedCredentialsMatcher extends HashedCredentialsMatcher {

    @Resource
    private CacheHandler cacheHandler;

    @Override
    public boolean doCredentialsMatch(AuthenticationToken token, AuthenticationInfo info) {
        String username = (String)token.getPrincipal();
        //retry count + 1
        AtomicInteger retryCount = (AtomicInteger)cacheHandler.getKeyValue(username);
        if(retryCount == null) {
            retryCount = new AtomicInteger(0);
            cacheHandler.putKeyValue(username,retryCount,-1);
        }
        if(retryCount.incrementAndGet() > 5) {
            //if retry count > 5 throw
            throw new ExcessiveAttemptsException("密码重试超过五次，账号已经被锁定！");
        }

        boolean matches = super.doCredentialsMatch(token, info);
        if(matches) {
            //clear retry count
            cacheHandler.deleteKey(username);
        }else{
        	throw new CredentialsException("用户名或密码错误！");
        }
        return matches;
    }
}
