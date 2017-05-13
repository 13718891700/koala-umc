package com.xingling.umc.config;

import org.apache.shiro.cache.AbstractCacheManager;
import org.apache.shiro.cache.Cache;
import org.apache.shiro.cache.CacheException;
import org.springframework.data.redis.core.RedisTemplate;

/**
 * <p>Title:	  ShrioRedisCacheManager. </p>
 * <p>Description TODO </p>
 * <p>Company:    http://www.hnxianyi.com </p>
 *
 * @Author         <a href="190332447@qq.com"/>杨文生</a>
 * @CreateDate     2017/5/13 15:27
 */
public class ShrioRedisCacheManager extends AbstractCacheManager {

	private RedisTemplate<byte[], byte[]> shiroRedisTemplate;

	public ShrioRedisCacheManager(RedisTemplate<byte[], byte[]> shiroRedisTemplate) {
		this.shiroRedisTemplate = shiroRedisTemplate;
	}

	@Override
	protected Cache<byte[], byte[]> createCache(String name) throws CacheException {
		return new ShrioRedisCache<byte[], byte[]>(shiroRedisTemplate, name);
	}
}
