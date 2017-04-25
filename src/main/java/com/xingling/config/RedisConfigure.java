package com.xingling.config;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

/**
 * <p>Title:	  RedisConfigure. </p>
 * <p>Description OSS 对象存储 </p>
 * <p>Company:    http://www.hnxianyi.com </p>
 *
 * @Author         <a href="liu_zhaoming@sina.cn"/>刘兆明</a>
 * @CreateDate     2016/11/27 14:45
 */
@Configuration
@Data
public class RedisConfigure {
    /**
     * 服务器IP
     */
    @Value("${spring.redis.host}")
    private String host;
    /**
     * 密码
     */
    @Value("${spring.redis.password}")
    private String password;
    /**
     * 端口号
     */
    @Value("${spring.redis.port}")
    private int port;
    /**
     * 超时时间
     */
    @Value("${spring.redis.timeout}")
    private int timeout;
    /**
     * 数据库
     */
    @Value("${spring.redis.database}")
    private int database;
    /**
     * 连接池最大连接数（使用负值表示没有限制）
     */
    @Value("${spring.redis.pool.max-active}")
    private int maxActive;
    /**
     * 连接池中的最大空闲连接
     */
    @Value("${spring.redis.pool.max-idle}")
    private int maxIdle;
    /**
     * 连接池最大阻塞等待时间（使用负值表示没有限制）
     */
    @Value("${spring.redis.pool.max-wait}")
    private int maxWait;
    /**
     * 连接池中的最小空闲连接
     */
    @Value("${spring.redis.pool.max-idle}")
    private int minIdle;

}
