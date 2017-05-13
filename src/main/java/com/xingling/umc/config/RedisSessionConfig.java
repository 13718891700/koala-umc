package com.xingling.umc.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;

/**
 * <p>Title:	  RedisSessionConfig. </p>
 * <p>Description session共享 </p>
 * <p>Company:    http://www.hnxianyi.com </p>
 *
 * @Author         <a href="190332447@qq.com"/>杨文生</a>
 * @CreateDate     2017/5/13 15:25
 */
@Configuration
@EnableRedisHttpSession
public class RedisSessionConfig {

}
