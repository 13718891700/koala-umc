package com.xingling.umc.security.utils;

import com.xingling.umc.security.cache.ShiroRedisCacheManager;

import java.util.concurrent.atomic.AtomicInteger;

/**
 * <p>Title:	  koala-umc <br/> </p>
 * <p>Description TODO <br/> </p>
 * <p>Company:    http://www.hnxianyi.com  <br/> </p>
 *
 * @Author <a href="190332447@qq.com"/>杨文生</a>  <br/>
 * @Date 2017/6/3 21:27
 */
public class PasswordCacheUtils {

    private static ShiroRedisCacheManager cacheManager = ((ShiroRedisCacheManager)SpringContextHolder.getBean("shiroRedisCacheManager"));


    public static final String PASSWORD_RETRY_CACHE = "passwordRetryCache"; //登录重试密码


    /**
     * <p>Title:	  getPasswordRetryInfo. </p>
     * <p>Description 根据登陆名获取密码重试次数</p>
     *
     * @param        loginName
     * @Author        <a href="190332447@qq.com"/>杨文生</a>
     * @CreateDate    2017/6/3 21:50
     * @return     返回值
     */
    public static AtomicInteger getPasswordRetryInfo(String loginName){
        AtomicInteger retryCount = (AtomicInteger)cacheManager.getCache(PASSWORD_RETRY_CACHE).get(loginName);
        return retryCount;
    }

    /**
     * <p>Title:	  putPasswordRetryInfo. </p>
     * <p>Description 将密码重试次数放入缓存中</p>
     *
     * @param        loginName
     * @Author        <a href="190332447@qq.com"/>杨文生</a>
     * @CreateDate    2017/6/3 21:50
     * @return     返回值
     */
    public static void putPasswordRetryInfo(String loginName,AtomicInteger num){
        cacheManager.getCache(PASSWORD_RETRY_CACHE).put(loginName,num);
    }

    /**
     * <p>Title:	  removePasswordRetryInfo. </p>
     * <p>Description 移除passwordRetryCache缓存</p>
     *
     * @param        loginName
     * @Author        <a href="190332447@qq.com"/>杨文生</a>
     * @CreateDate    2017/6/3 21:50
     * @return     返回值
     */
    public static void removePasswordRetryInfo(String loginName){
        cacheManager.getCache(PASSWORD_RETRY_CACHE).remove(loginName);
    }

}
