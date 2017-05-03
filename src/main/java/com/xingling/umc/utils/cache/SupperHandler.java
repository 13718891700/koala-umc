package com.xingling.umc.utils.cache;

import org.apache.commons.lang.StringUtils;

import java.lang.reflect.AccessibleObject;
import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <p>Title:	  SupperHandler. </p>
 * <p>Description 解析SpringCache注解上的Key，并按照解析后的逻辑进行缓存处理 </p>
 * <p>Company:    http://www.hnxianyi.com </p>
 *
 * @Author         <a href="liu_zhaoming@sina.cn"/>刘兆明</a>
 * @CreateDate     2016/12/2 11:08
 */
public abstract class SupperHandler {

	public static final int MAP 		= 1;
	public static final int MAP_VALUES 	= 2;
	public static final int MAP_ITEM 	= 3;
	public static final int KEY_VALUE 	= 4;

	public static final int ANNO_PUT 	= 1;   	//对应注解：put
	public static final int ANNO_GET 	= 2;	//对应注解：get
	public static final int ANNO_EVICT 	= 3; 	//对应注解：evict
	
	// 注解的标识
	private int annoType;
	
	// 缓存操作类型
	private int opeType;
	
	// Redis - key
	private String key;
	
	// Redis - value
	private Object value;

	// Map - key
	private String mapKey;
	
	// Object - property
	private String objectField;
	
	// Object - field
	private Field field;

	/**
	 * 初始化基础数据
	 * @param annoType
	 * @param opeType
	 * @param key
	 * @param mapKey
	 * @param objectField
	 */
	protected void init(int annoType, int opeType, String key, String mapKey, String objectField) {
		
		this.annoType = annoType;
		this.opeType = opeType;
		this.key = key;
		this.mapKey = mapKey;
		this.objectField = objectField;
		
		// 验证key
		if(StringUtils.isBlank(getKey())){
			throw new RuntimeException("SpringCache key is null");
		}
		
		// 验证Spring注解类型
		if(this.annoType<1 || this.annoType>3){
			throw new RuntimeException("SpringCache annoType error：" + annoType);
		}
		
		// 验证操作类型
		if(this.opeType<1 || this.opeType>4) {
			throw new RuntimeException("SpringCache opeType error：" + key);
		}
	}
	
	public int getAnnoType() {
		return annoType;
	}

	public int getOpeType() {
		return opeType;
	}

	public String getKey() {
		return key;
	}

	public Object getValue() {
		return value;
	}

	public String getMapKey() {
		return mapKey;
	}
	
	/**
	 * 获得value的Map形式
	 */
	@SuppressWarnings("unchecked")
	private Map<String, Object> valueToMap() {
		
		// 如果value本身就是一个map，直接返回
		if (value instanceof Map) {
			return (Map<String, Object>) value;
		} 
		
		// 如果value是一个List，将它转换成Map
		else if(value instanceof List){
			
			Map<String, Object> map = new HashMap<>();
			
			for(Object o : (List<Object>)value){
				
				// 初始化field
				if(this.field==null){
					initField(o);
				}
				
				// 获得MapKey
				String mapKey = getObjectKey(o);
				map.put(mapKey, o);
			}
			return map;
		}
		
		// 如果是其它类型，不处理
		else {
			throw new RuntimeException("SpringCache Value Type Error: " + value.getClass());
		}
	}
	
	/**
	 * 初始化Field
	 */
	private void initField(Object o) {
		
		try {
			
			// 只有在Object是一个JavaBean类型时，才可以初始化objectField
			if(o instanceof String == false){
				
				// 必须指定JavaBean中的一个属性名称
				if(StringUtils.isBlank(this.objectField)){
					throw new RuntimeException("SpringCache objectField is null");
				}
				
				if(o==null){
					throw new RuntimeException("SpringCache object is null");
				}
				
				// 获得属性字段，并激活反射机制
				this.field = o.getClass().getDeclaredField(this.objectField);
				AccessibleObject.setAccessible(new Field[]{this.field}, true);
			}
		} catch (Exception e) {
			throw new RuntimeException("SpringCache Object Field Error: ", e);
		}
	}

	/**
	 * 根据反射，从Object中获得某个属性的值
	 */
	private String getObjectKey(Object obj) {

		// 如果obj是字符串类型的，直接返回
		if(obj instanceof String){
			return (String)obj;
		} else {
			try {
				Object fo = this.field.get(obj);
				if(fo!=null){
					return fo.toString();
				} else {
					return null;
				}
			} catch (Exception e) {
				throw new RuntimeException("SpringCache Object Field Error: ", e);
			}
		}
	}

	/**
	 * 从Object中获得某个属性的值
	 * @return
	 */
	private String getMapKeyFromObject() {
		initField(getValue());
		return getObjectKey(getValue());
	}

	/**
	 * 业务处理
	 * @return
	 */
	public Object start() {
		return start(null);
	}
	
	/**
	 * 业务处理
	 * @param value
	 * @return
	 */
	public Object start(Object value) {
		return start(value, -1);
	}
	
	/**
	 * 业务处理
	 * @param value
	 * @param expireSecond
	 * @return
	 */
	public Object start(Object value, long expireSecond) {

		this.value = value;
		
		Object result = null;

		// 缓存Get
		if(getAnnoType() == ANNO_GET) {
			
			// 读出Map<String,Object>
			if(getOpeType() == MAP) {
				result = CacheHandler.getMap(getKey());
			}
			// 从Map中读出List<Object>
			else if(getOpeType() == MAP_VALUES) {
				result = CacheHandler.getMapValues(getKey());
			}
			// 读出Map中的一个Value
			else if(getOpeType() == MAP_ITEM) {
				result = CacheHandler.getMapItem(getKey(), getMapKey());
			}
			// 读出Key-Value
			else if(getOpeType() == KEY_VALUE) {
				result = CacheHandler.getKeyValue(getKey());
			}
		}
		// 缓存Put
		else if(getAnnoType() == ANNO_PUT) {
			
			// 写入Map<String,Object>
			if(getOpeType() == MAP) {
				CacheHandler.putMap(getKey(), valueToMap(), expireSecond);
			}
			// 写入Map<String,Object>
			else if(getOpeType() == MAP_VALUES) {
				CacheHandler.putMap(getKey(), valueToMap(), expireSecond);
			}
			// 写入Map中的一个键
			else if(getOpeType() == MAP_ITEM) {
				String _map_key = getMapKeyFromObject();
				if(StringUtils.isBlank(_map_key)) {
					throw new RuntimeException("JavaBean field " + this.objectField + " is null.");
				}
				CacheHandler.putMapItem(getKey(), _map_key, getValue());
			}
			// 写入Key-Value
			else if(getOpeType() == KEY_VALUE) {
				CacheHandler.putKeyValue(getKey(), getValue(), expireSecond);
			}
		}
		// 缓存Delete
		else if(getAnnoType() == ANNO_EVICT) {
			// Map
			if(getOpeType() == MAP) {
				CacheHandler.deleteKey(getKey());
			}
			// Map中的所有Value
			else if(getOpeType() == MAP_VALUES) {
				CacheHandler.deleteKey(getKey());
			}
			// Map中的某个Value
			else if(getOpeType() == MAP_ITEM) {
				CacheHandler.deleteMapItem(getKey(), getMapKey());
			}
			// 缓存中的Value
			else if(getOpeType() == KEY_VALUE) {
				CacheHandler.deleteKey(getKey());
			}
		}

		return result;
	}
}
