package com.xingling.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * <p>Title:	  MyCorsConfiguration <br/> </p>
 * <p>Description 跨域配置 <br/> </p>
 * <p>Company:    http://www.hnxianyi.com  <br/> </p>
 *
 * @Author <a href="liu_zhaoming@sina.cn"/>刘兆明</a>  <br/>
 * @Date 2016/12/26 20:49
 */
@Configuration
public class MyCorsConfiguration {

    @Autowired
    private RestConfig restConfig;

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurerAdapter() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/uam/**").allowedOrigins(restConfig.getUam());// 用户中心
                registry.addMapping("/open/**").allowedOrigins(restConfig.getUam());// 用户中心
                registry.addMapping("/csc/**").allowedOrigins(restConfig.getCsc());// 客户中心
                registry.addMapping("/ofc/**").allowedOrigins(restConfig.getOfc());// 订单中心
                registry.addMapping("/rmc/**").allowedOrigins(restConfig.getRmc());// 资源中心
                registry.addMapping("/tfc/**").allowedOrigins(restConfig.getTfc());// 运输中心
                registry.addMapping("/whc/**").allowedOrigins(restConfig.getWhc());// 仓储中心
                registry.addMapping("/ac/**").allowedOrigins(restConfig.getAc());// 结算中心
            }
        };
    }
}
