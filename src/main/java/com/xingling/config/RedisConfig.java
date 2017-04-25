package com.xingling.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CachingConfigurerSupport;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;
import redis.clients.jedis.JedisPoolConfig;

/**
 * <p>Title:	  RedisConfig <br/> </p>
 * <p>Description redis配置 <br/> </p>
 * <p>Company:    http://www.hnxianyi.com  <br/> </p>
 *
 * @Author <a href="liu_zhaoming@sina.cn"/>刘兆明</a>  <br/>
 * @Date 2016/12/2 10:54
 */
@Configuration
@EnableCaching
@EnableRedisHttpSession(maxInactiveIntervalInSeconds =1800)
public class RedisConfig extends CachingConfigurerSupport {
    @Autowired
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

    /*@Bean
    public SimpleCacheManager cacheManager() {
        SimpleCacheManager config = new SimpleCacheManager();

        RedisCache redisCache = new RedisCache();
        redisCache.setName("uam");
        redisCache.setExpireSecond(86400);

        Set<RedisCache> caches = Sets.newHashSet();
        caches.add(redisCache);

        config.setCaches(caches);

        return config;
    }*/

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
/*
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
    }*/

}
