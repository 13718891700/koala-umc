package com.xingling.umc.security.core;

import com.xingling.umc.security.utils.PasswordCacheUtils;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.ExcessiveAttemptsException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.concurrent.atomic.AtomicInteger;

public class RetryLimitHashedCredentialsMatcher extends HashedCredentialsMatcher {

    private static final Logger LOGGER = LoggerFactory.getLogger(RetryLimitHashedCredentialsMatcher.class);

    private int retryMax = 5;

    @Override
    public boolean doCredentialsMatch(AuthenticationToken token, AuthenticationInfo info) throws ExcessiveAttemptsException {
        String username = (String) token.getPrincipal();
        AtomicInteger retryCount = PasswordCacheUtils.getPasswordRetryInfo(username);

        if (retryCount == null) {
            retryCount = new AtomicInteger(0);
	        PasswordCacheUtils.putPasswordRetryInfo(username, retryCount);
        }
        if (retryCount.incrementAndGet() > retryMax) {
            throw new ExcessiveAttemptsException("您已连续错误达" + retryMax + "次！请10分钟后再试");
        }

        boolean matches = super.doCredentialsMatch(token, info);
        if (matches) {
	        PasswordCacheUtils.removePasswordRetryInfo(username);
        } else {
	        PasswordCacheUtils.putPasswordRetryInfo(username,retryCount);
            throw new IncorrectCredentialsException("密码错误，已错误" + retryCount.get() + "次，最多错误" + retryMax + "次");
        }
        return true;
    }

    public int getRetryMax() {
        return retryMax;
    }

    public void setRetryMax(int retryMax) {
        this.retryMax = retryMax;
    }

}
