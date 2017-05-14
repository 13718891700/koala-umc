package com.xingling.umc.security.cache;

import org.apache.shiro.cache.AbstractCacheManager;
import org.apache.shiro.cache.Cache;
import org.apache.shiro.cache.CacheException;
import org.springframework.data.redis.core.RedisTemplate;

/**
 * <p>Title:	  ShiroRedisCacheManager. </p>
 * <p>Description TODO </p>
 * <p>Company:    http://www.hnxianyi.com </p>
 *
 * @Author <a href="190332447@qq.com"/>杨文生</a>
 * @CreateDate 2017/5/13 15:27
 */
public class ShiroRedisCacheManager extends AbstractCacheManager {

    private RedisTemplate<byte[], Object> redisTemplate;

    public ShiroRedisCacheManager(RedisTemplate<byte[], Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    @Override
    protected Cache<byte[], Object> createCache(String name) throws CacheException {
        return new ShrioRedisCache<byte[], Object>(redisTemplate, name);
    }
}
