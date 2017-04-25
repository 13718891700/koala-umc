package com.xingling.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * <p>Title:	  OSSConfigure. </p>
 * <p>Description OSS 对象存储 </p>
 * <p>Company:    http://www.hnxianyi.com </p>
 *
 * @Author         <a href="liu_zhaoming@sina.cn"/>刘兆明</a>
 * @CreateDate     2016/11/27 14:45
 */
@Configuration
@ConfigurationProperties(prefix = OSSConfigure.OSS_CONF)
@Data
public class OSSConfigure {
    public final static String OSS_CONF="oss_conf";

    /**
     * OSS 访问域名[内网]
     */
    private String endpoint;

    /**
     * OSS 访问域名[外网]
     */
    private String outEndpoint;
    /**
     * key ID
     */
    private String accessKeyId;

    /**
     * key密钥
     */
    private String accessKeySecret;

    /**
     * 文件服务器根目录
     */
    private String bucketName;

    /**
     * 延迟生效时间 单位:h
     *
     */
    private int delayHour;

    /**
     * 访问的根url地址
     */
    private String accessUrl;

    /**
     * 远端路径
     */
    private  String remotePath;

}
