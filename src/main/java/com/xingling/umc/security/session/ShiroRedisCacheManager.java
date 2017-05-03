package com.xingling.umc.security.session;

/**
 * <p>Title:	  xescm-cms <br/> </p>
 * <p>Description TODO <br/> </p>
 * <p>Company:    http://www.hnxianyi.com  <br/> </p>
 *
 * @Author <a href="190332447@qq.com"/>杨文生</a>  <br/>
 * @Date 2017/1/7 21:40
 */
import org.apache.shiro.cache.AbstractCacheManager;
import org.apache.shiro.cache.Cache;
import org.apache.shiro.cache.CacheException;
import org.springframework.data.redis.core.RedisTemplate;

public class ShiroRedisCacheManager extends AbstractCacheManager{

    private RedisTemplate<byte[], Object> redisTemplate;

    public ShiroRedisCacheManager(RedisTemplate<byte[], Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    @Override
    protected Cache<byte[], Object> createCache(String name) throws CacheException {
        return new ShiroRedisCache<byte[], Object>(redisTemplate, name);
    }
}