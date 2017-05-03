package com.xingling.umc.security.session;


import com.google.common.collect.Sets;
import com.xingling.umc.security.utils.SerializableUtils;
import org.apache.commons.collections.CollectionUtils;
import org.apache.shiro.cache.Cache;
import org.apache.shiro.cache.CacheException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;

import java.util.*;
/**
 * <p>Title:	  xescm-cms <br/> </p>
 * <p>Description TODO <br/> </p>
 * <p>Company:    http://www.hnxianyi.com  <br/> </p>
 *
 * @Author <a href="190332447@qq.com"/>杨文生</a>  <br/>
 * @Date 2017/1/7 21:36
 */
public class ShiroRedisCache<K, V> implements Cache<K, V> {


    Logger log = LoggerFactory.getLogger(this.getClass());

    private RedisTemplate<byte[], V> redisTemplate;

    private String prefix = "shiro_redis_session:";

    public ShiroRedisCache(RedisTemplate<byte[], V> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public ShiroRedisCache(RedisTemplate<byte[], V> redisTemplate, String prefix) {
        this(redisTemplate);
        this.prefix = prefix;
    }

    @Override
    public V get(K key) throws CacheException {
        if(log.isDebugEnabled()) {
            log.debug("Key: {}", key);
        }
        if(key == null) {
            return null;
        }

        byte[] bkey = getByteKey(key);
        return redisTemplate.opsForValue().get(bkey);
    }

    @Override
    public V put(K key, V value) throws CacheException {
        if(log.isDebugEnabled()) {
            log.debug("Key: {}, value: {}", key, value);
        }

        if(key == null || value == null) {
            return null;
        }

        byte[] bkey = getByteKey(key);
        redisTemplate.opsForValue().set(bkey, value);
        return value;
    }

    @Override
    public V remove(K key) throws CacheException {
        if(log.isDebugEnabled()) {
            log.debug("Key: {}", key);
        }

        if(key == null) {
            return null;
        }

        byte[] bkey = getByteKey(key);
        ValueOperations<byte[], V> vo = redisTemplate.opsForValue();
        V value = vo.get(bkey);
        redisTemplate.delete(bkey);
        return value;
    }

    @Override
    public void clear() throws CacheException {
        redisTemplate.getConnectionFactory().getConnection().flushDb();
    }

    @Override
    public int size() {
        Long len = redisTemplate.getConnectionFactory().getConnection().dbSize();
        return len.intValue();
    }

    @SuppressWarnings("unchecked")
    @Override
    public Set<K> keys() {
        byte[] bkey = (prefix+"*").getBytes();
        Set<byte[]> set = redisTemplate.keys(bkey);
        Set<K> result = Sets.newHashSet();

        if(CollectionUtils.isEmpty(set)) {
            return Collections.emptySet();
        }

        for(byte[] key: set) {
            result.add((K)key);
        }
        return result;
    }

    @Override
    public Collection<V> values() {
        Set<K> keys = keys();
        List<V> values = new ArrayList<>(keys.size());
        for(K k: keys) {
            byte[] bkey = getByteKey(k);
            values.add(redisTemplate.opsForValue().get(bkey));
        }
        return values;
    }

    private byte[] getByteKey(K key){
        if(key instanceof String){
            String preKey = this.prefix + key;
            return preKey.getBytes();
        }else{
            return SerializableUtils.serialize(key);
        }
    }

    public String getPrefix() {
        return prefix;
    }

    public void setPrefix(String prefix) {
        this.prefix = prefix;
    }
}