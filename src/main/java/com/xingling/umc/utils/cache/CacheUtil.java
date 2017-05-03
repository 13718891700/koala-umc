package com.xingling.umc.utils.cache;

/**
 * <p>Title:	  CacheUtil. </p>
 * <p>Description 缓存工具类 </p>
 * <p>Company:    http://www.hnxianyi.com </p>
 *
 * @Author         <a href="liu_zhaoming@sina.cn"/>刘兆明</a>
 * @CreateDate     2016/12/2 11:06
 */
public class CacheUtil {

	public static <T> Object getValue(String key) {
		return CacheHandler.getKeyValue(key);
	}
	
	public static <T> void putValue(String key, T value, long expireSecond) {
		CacheHandler.putKeyValue(key, value, expireSecond);
	}
}
