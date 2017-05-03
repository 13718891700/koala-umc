package com.xingling.umc.config;

import com.google.common.collect.Lists;
import com.google.common.collect.Sets;
import com.xingling.umc.utils.cache.CacheHandler;
import com.xingling.umc.utils.cache.RedisCache;
import com.xingling.umc.security.listener.MyHttpSessionListener;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.CachingConfigurerSupport;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.support.SimpleCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;
import org.springframework.session.web.http.SessionEventHttpSessionListenerAdapter;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

import javax.annotation.Resource;
import javax.servlet.http.HttpSessionListener;
import java.util.List;
import java.util.Set;

/**
 * <p>Title:	  RedisConfig. </p>
 * <p>Description redis配置 </p>
 * <p>Company:    http://www.hnxianyi.com </p>
 *
 * @Author         <a href="190332447@qq.com"/>杨文生</a>
 * @CreateDate     2017/5/3 17:21
 */
@Configuration
@EnableCaching
@EnableRedisHttpSession(maxInactiveIntervalInSeconds =7200)
public class RedisConfig extends CachingConfigurerSupport {

	private static final Logger logger = LoggerFactory.getLogger(RedisConfig.class);

    @Resource
    private RedisConfigure redisConfigure;

    @Bean
    public JedisConnectionFactory redisConnectionFactory() {
        JedisConnectionFactory factory = new JedisConnectionFactory();
        factory.setHostName(redisConfigure.getHost());
        factory.setPassword(redisConfigure.getPassword());
        factory.setPort(redisConfigure.getPort());
        factory.setTimeout(redisConfigure.getTimeout()); //设置连接超时时间
        factory.setDatabase(redisConfigure.getDatabase());
        return factory;
    }

    @Bean
    public JedisPoolConfig jedisPoolConfig() {
        JedisPoolConfig config = new JedisPoolConfig();
        config.setMaxTotal(redisConfigure.getMaxActive());
        config.setMaxIdle(redisConfigure.getMaxIdle());
        config.setTestOnBorrow(true);
        return config;
    }

	@Bean
	public JedisPool getJedisPool(){
		logger.info("getJedisPool -初始化Jedis连接池 ...");
		int port = redisConfigure.getPort();
		int timeout = redisConfigure.getTimeout();
		String password = redisConfigure.getPassword();
		String hostName = redisConfigure.getHost();
		int database = redisConfigure.getDatabase();
		JedisPoolConfig config = jedisPoolConfig();

		return new JedisPool(config, hostName, port, timeout, password, database);
	}

	@Bean
    public SimpleCacheManager cacheManager() {
        SimpleCacheManager config = new SimpleCacheManager();

        RedisCache redisCache = new RedisCache();
        redisCache.setName("uam");
        redisCache.setExpireSecond(86400);

        Set<RedisCache> caches = Sets.newHashSet();
        caches.add(redisCache);

        config.setCaches(caches);

        return config;
    }

    @Bean
    public RedisTemplate redisTemplate(JedisConnectionFactory redisConnectionFactory, StringRedisSerializer stringRedisSerializer) {
        RedisTemplate redisTemplate = new RedisTemplate();

        redisTemplate.setConnectionFactory(redisConnectionFactory);
        redisTemplate.setKeySerializer(stringRedisSerializer);

        return redisTemplate;
    }

    @Bean
    public StringRedisSerializer stringRedisSerializer() {
        return new StringRedisSerializer();
    }

    @Bean
    public CacheHandler cacheHandler(RedisTemplate redisTemplate) {
        CacheHandler cacheHandler = new CacheHandler();
        cacheHandler.setRedisTemplate(redisTemplate);
        return cacheHandler;
    }


    @Bean
    public SessionEventHttpSessionListenerAdapter sessionEventHttpSessionListenerAdapter() {
        List<HttpSessionListener> list = Lists.newArrayList();
        list.add(new MyHttpSessionListener());
        return new SessionEventHttpSessionListenerAdapter(list);
    }

}
