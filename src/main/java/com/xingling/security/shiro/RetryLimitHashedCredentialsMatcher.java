package com.xingling.security.shiro;

import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.CredentialsException;
import org.apache.shiro.authc.ExcessiveAttemptsException;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;

import javax.annotation.Resource;

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
    private RedisTemplate redisTemplate;

    @Override
    public boolean doCredentialsMatch(AuthenticationToken token, AuthenticationInfo info) {

        ValueOperations<String, String> ops = redisTemplate.opsForValue();
        String username = (String)token.getPrincipal();
        //retry count + 1
        int retryCount = Integer.valueOf(ops.get(username));
        if(retryCount == 0) {
            redisTemplate.opsForValue().set(username,retryCount,-1);
        }
        if(retryCount > 5) {
            //if retry count > 5 throw
            throw new ExcessiveAttemptsException("密码重试超过五次，账号已经被锁定！");
        }

        boolean matches = super.doCredentialsMatch(token, info);
        if(matches) {
            //clear retry count
            redisTemplate.delete(username);
        }else{
        	throw new CredentialsException("用户名或密码错误！");
        }
        return matches;
    }
}
