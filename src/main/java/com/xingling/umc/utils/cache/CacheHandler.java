package com.xingling.umc.utils.cache;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.core.BoundHashOperations;
import org.springframework.data.redis.core.BoundValueOperations;
import org.springframework.data.redis.core.RedisTemplate;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.TimeUnit;

/**
 * <p>Title:	  CacheHandler. </p>
 * <p>Description 缓存操作 </p>
 * <p>Company:    http://www.hnxianyi.com </p>
 *
 * @Author         <a href="liu_zhaoming@sina.cn"/>刘兆明</a>
 * @CreateDate     2016/12/2 11:06
 */
@SuppressWarnings("unchecked")
public class CacheHandler {

	private static Logger logger = LoggerFactory.getLogger(CacheHandler.class);
	
	private static RedisTemplate<String, Object> redisTemplate;
	
	/**
	 * 写入缓存(一次缓存Map)
	 * @param key
	 * @param map
	 * @param expireSecond
	 * @return
	 */
	public static <T extends Object> boolean putMap(String key, Map<String, T> map, long expireSecond) {

		// 返回值
		boolean succ = false;
		
		try {
			
			// 绑定Key
			BoundHashOperations<String, String, T> ope = redisTemplate.boundHashOps(key);
			
			// 设置Value
			ope.putAll(map);
			
			// 设置过期时间
			if(expireSecond>0){
				ope.expire(expireSecond, TimeUnit.SECONDS);
			}
			
			// 处理成功
			succ = true;
			
		} catch (Exception e) {
			logger.error("putMap - 写入缓存失败. Key={}", key, e);
		}
		
		if(succ){
			logger.info("putMap - 写入缓存，Key={}，[OK]", key);
		}else{
			logger.info("putMap - 写入缓存，Key={}，[FAIL]", key);
		}
		
		return succ;
	}
	
	/**
	 * 写入缓存(向Map中追加一项)
	 * @param key
	 * @param mapKey
	 * @param mapValue
	 * @return
	 */
	public static boolean putMapItem(String key, String mapKey, Object mapValue) {

		logger.info("MapKey={}", mapKey);
		
		// 返回值
		boolean succ = false;
		
		try {

			// 绑定Key
			BoundHashOperations<String, String, Object> ope = redisTemplate.boundHashOps(key);

			// 设置Value
			ope.put(mapKey, mapValue);
			
			// 处理成功
			succ = true;
			
		} catch (Exception e) {
			logger.error("putMapItem - 追加缓存失败. Key={}", key, e);
		}
		
		if(succ){
			logger.info("putMapItem - 追加缓存，Key={}，[OK]", key);
		}else{
			logger.info("putMapItem - 追加缓存，Key={}，[FAIL]", key);
		}
		
		return succ;
	}
	
	/**
	 * 从缓存中获得Map
	 * @param key
	 * @return
	 */
	public static <T extends Object> Map<String, T> getMap(String key) {

		logger.info("getMap - 读取缓存，Key={}", key);

		Map<String, T> map = null;

		try {

			// 绑定Key
			BoundHashOperations<String, String, Object> ope = redisTemplate.boundHashOps(key);
			
			map = (Map<String, T>) ope.entries();
			
			if(map.size()==0) {
				map = null;
			}
			
		} catch (Exception e) {
			logger.error("getMap - 读取缓存失败. Key={}", key, e);
		}
		
		return map;
	}
	
	/**
	 * 从缓存的Map中获得其中一项
	 * @param key
	 * @param mapKey
	 * @return
	 */
	public static <T extends Object> T getMapItem(String key, String mapKey) {
		
		logger.info("getMapItem - 读取缓存，Key={}", key);

		T obj = null;

		try {
			
			// 绑定Key
			BoundHashOperations<String, String, Object> ope = redisTemplate.boundHashOps(key);
			
			obj = (T) ope.get(mapKey);
			
		} catch (Exception e) {
			logger.error("getMapItem - 读取缓存失败. Key={}", key, e);
		}
		
		return obj;
	}
	
	/**
	 * 从缓存的Map中获得其中的所有Key
	 * @param key
	 * @return
	 */
	public static Set<String> getMapKeys(String key) {

		logger.info("getMapKeys - 读取缓存，Key={}", key);

		Set<String> mapKeys = null;

		try {

			// 绑定Key
			BoundHashOperations<String, String, Object> ope = redisTemplate.boundHashOps(key);
			
			mapKeys = ope.keys();
			
		} catch (Exception e) {
			logger.error("getMapKeys - 读取缓存失败. Key={}", key, e);
		}
		
		return mapKeys;
	}
	
	/**
	 * 从缓存的Map中获得其中的所有Value
	 * @param key
	 * @return
	 */
	public static <T extends Object> List<T> getMapValues(String key) {

		logger.info("getMapValues - 读取缓存，Key={}", key);

		List<T> mapValues = null;

		try {

			// 绑定Key
			BoundHashOperations<String, String, Object> ope = redisTemplate.boundHashOps(key);
			
			mapValues = (List<T>) ope.values();
			
			if(mapValues.size()==0) {
				mapValues =  null;
			}
			
		} catch (Exception e) {
			logger.error("getMapValues - 读取缓存失败. Key={}", key, e);
		}
		
		return mapValues;
	}
	
	/**
	 * 从缓存的Map中删除其中1或N项
	 * @param key
	 * @param mapKey
	 * @return
	 */
	public static boolean deleteMapItem(String key, Object... mapKey){

		// 返回值
		boolean succ = false;
		try {
			
			// 绑定Key
			BoundHashOperations<String, String, Object> ope = redisTemplate.boundHashOps(key);
			
			ope.delete(mapKey);
			
			// 处理成功
			succ = true;
			
		} catch (Exception e) {
			logger.error("deleteMapItem - 删除缓存失败. Key={}", key, e);
		}
		
		if(succ){
			logger.info("deleteMapItem - 删除缓存，Key={}，[OK]", key);
		}else{
			logger.info("deleteMapItem - 删除缓存，Key={}，[FAIL]", key);
		}
		
		return succ;
	}
	
	/**
	 * 基本的写入缓存(key-Value)
	 * @param key
	 * @param value
	 * @param expireSecond
	 * @return
	 */
	public static <T extends Object> boolean putKeyValue(String key, T value, long expireSecond) {

		// 返回值
		boolean succ = false;
		
		try {
			
			// 绑定Key
			BoundValueOperations<String, Object> ope = redisTemplate.boundValueOps(key);
			
			// 设置Value
			ope.set(value);
			
			// 设置过期时间
			if(expireSecond>0){
				ope.expire(expireSecond, TimeUnit.SECONDS);
			}
			
			// 处理成功
			succ = true;
			
		} catch (Exception e) {
			logger.error("putKeyValue - 写入缓存失败. Key={}", key, e);
		}
		
		if(succ){
			logger.info("putKeyValue - 写入缓存，Key={}，[OK]", key);
		}else{
			logger.info("putKeyValue - 写入缓存，Key={}，[FAIL]", key);
		}
		
		return succ;
	}
	
	/**
	 * 基本的读取缓存(key-Value)
	 * @param key
	 * @return
	 */
	public static <T extends Object> T getKeyValue(String key){

		T obj = null;
		
		try {
			
			// 绑定Key
			BoundValueOperations<String, Object> ope = redisTemplate.boundValueOps(key);

			// 读取数据
			obj = (T) ope.get();
			
		} catch (Exception e) {
			logger.error("getKeyValue - 读取缓存失败. Key={}", key, e);
		}
		
		return obj;
	}
	
	/**
	 * 删除缓存
	 * @param key
	 * @return
	 */
	public static boolean deleteKey (String key) {

		logger.info("deleteKey - 删除缓存，Key={}", key);

		// 返回值
		boolean succ = false;
		
		try {
			
			// 删除
			redisTemplate.delete(key);
			
			// 处理成功
			succ = true;
			
		} catch (Exception e) {
			logger.error("deleteKey - 删除缓存失败. Key={}", key, e);
		}
		
		return succ;
	}

	/**
	 * 获得以指定字符串开头的Key
	 * @param pattern 例："company:*"
	 * @return
	 */
	public static Set<String> keys(String pattern) {
		return redisTemplate.keys(pattern);
	}
	
	/**
	 * 删除以指定字符串开头的Key
	 * @param keys
	 */
	public static void deleteKeys(Set<String> keys) {
		redisTemplate.delete(keys);
	}

	/**
	 * 清空缓存
	 */
	public static void clearCache() {
		logger.info("Clear cache");
		redisTemplate.getConnectionFactory().getConnection().flushDb();
	}
	

	public RedisTemplate<String, Object> getRedisTemplate() {
		return redisTemplate;
	}
	public void setRedisTemplate(RedisTemplate<String, Object> redisTemplate) {
		CacheHandler.redisTemplate = redisTemplate;
	}
}
