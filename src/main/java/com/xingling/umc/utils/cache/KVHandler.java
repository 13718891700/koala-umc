package com.xingling.umc.utils.cache;

import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * <p>Title:	  KVHandler. </p>
 * <p>Description SpringCache Key 解析 </p>
 * <p>Company:    http://www.hnxianyi.com </p>
 *
 * @Author         <a href="liu_zhaoming@sina.cn"/>刘兆明</a>
 * @CreateDate     2016/12/2 11:07
 */
public class KVHandler extends SupperHandler {

	private static final Logger logger = LoggerFactory.getLogger(KVHandler.class);
	
	/**
	 * 构造
	 * @param annoType Spring注解类型
	 * @param key Redis-Key
	 */
	public KVHandler(int annoType, String key) {

		// 分解SpringCache的Key
		JSONObject json = JSONObject.fromObject(key);
		json.put("annoType", annoType);
		
		logger.info("Init SpringCache Key : {}", json);
		
		String p_key = json.getString("key");
		int p_opeType = json.get("opeType")==null ? 0 : json.getInt("opeType");
		String p_mapKey = (String)json.get("mapKey");
		String p_objectField = (String)json.get("objectField");
		
		// 如果没有指定opeType，使用默认的Key-Value模式
		if(p_opeType==0){
			p_opeType = KEY_VALUE;
		}
		
		init(annoType, p_opeType, p_key, p_mapKey, p_objectField);
	}
}
