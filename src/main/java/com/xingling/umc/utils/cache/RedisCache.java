package com.xingling.umc.utils.cache;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.Cache;
import org.springframework.cache.support.SimpleValueWrapper;

import java.util.concurrent.Callable;

/**
 * <p>Title:	  RedisCache. </p>
 * <p>Description 扩展SpringCache缓存实现 </p>
 * <p>Company:    http://www.hnxianyi.com </p>
 *
 * @Author         <a href="liu_zhaoming@sina.cn"/>刘兆明</a>
 * @CreateDate     2016/12/2 11:07
 */
public class RedisCache implements Cache {

	private static Logger logger = LoggerFactory.getLogger(RedisCache.class);
	
    private String name;
    private long expireSecond;

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String getName() {
        return this.name;
    }

    @Override
    public Object getNativeCache() {
        return null;
    }

	public long getExpireSecond() {
		return expireSecond;
	}

	public void setExpireSecond(long expireSecond) {
		this.expireSecond = expireSecond;
	}

	@Override
	public ValueWrapper get(Object key) {
		try{
			KVHandler kvh = new KVHandler(KVHandler.ANNO_GET, (String)key);
			Object obj = kvh.start();
			return obj==null ? null : new SimpleValueWrapper(obj);
		} catch (Exception e) {
			logger.error("SpringCache Get Error", e);
		}
		return null;
	}

	@Override
	public <T> T get(Object key, Class<T> type) {
		ValueWrapper value = get(key);
		return (T) value.get();
	}

    @Override
    public <T> T get(Object o, Callable<T> callable) {
        return null;
    }

    @Override
	public void put(Object key, Object value) {
		try {
			KVHandler kvh = new KVHandler(KVHandler.ANNO_PUT, (String)key);
			kvh.start(value, expireSecond);
		} catch (Exception e) {
			logger.error("SpringCache Put Error", e);
		}
	}

	@Override
	public ValueWrapper putIfAbsent(Object key, Object value) {
		Object obj = get(key);
		if(obj==null){
			put(key, value);
			return null;
		} else {
			return new SimpleValueWrapper(obj);
		}
	}

	@Override
	public void evict(Object key) {
		try{
			KVHandler kvh = new KVHandler(KVHandler.ANNO_EVICT, (String)key);
			kvh.start();
		} catch (Exception e) {
			logger.error("SpringCache Evict Error", e);
		}
	}

	@Override
	public void clear() {
		try{
			logger.info("清空缓存");
			//CacheHandler.clearCache();
		} catch (Exception e) {
			logger.error("SpringCache Clear Error", e);
		}
	}
}
