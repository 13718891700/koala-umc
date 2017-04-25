package com.xingling.config;

import com.google.common.collect.Maps;
import com.xingling.security.session.SessionFactory;
import com.xingling.security.session.ShiroRedisCacheManager;
import com.xingling.security.shiro.*;
import org.apache.shiro.session.mgt.eis.JavaUuidSessionIdGenerator;
import org.apache.shiro.spring.LifecycleBeanPostProcessor;
import org.apache.shiro.spring.security.interceptor.AuthorizationAttributeSourceAdvisor;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.filter.authc.AnonymousFilter;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.apache.shiro.web.session.mgt.DefaultWebSessionManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.aop.framework.autoproxy.DefaultAdvisorAutoProxyCreator;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;

import javax.annotation.Resource;
import javax.servlet.Filter;
import java.util.Map;


/**
 * <p>Title:	  ShiroConfig <br/> </p>
 * <p>Description Shiro 配置 <br/> </p>
 * <p>Company:    http://www.hnxianyi.com  <br/> </p>
 *
 * @Author <a href="190332447@qq.com"/>杨文生</a>  <br/>
 * @Date 2017/1/6 14:53
 */
@Configuration
public class ShiroConfig {

    private static Logger logger = LoggerFactory.getLogger(ShiroConfig.class);

    @Resource
    private RedisTemplate<byte[], Object> redisTemplate;

    //开启Shiro Spring AOP 权限注解的支持
    @Bean
    public DefaultAdvisorAutoProxyCreator getDefaultAdvisorAutoProxyCreator() {
        DefaultAdvisorAutoProxyCreator advisorAutoProxyCreator = new DefaultAdvisorAutoProxyCreator();
        advisorAutoProxyCreator.setProxyTargetClass(true);
        return advisorAutoProxyCreator;
    }

    @Bean
    public AuthorizationAttributeSourceAdvisor getAuthorizationAttributeSourceAdvisor(DefaultWebSecurityManager securityManager) {
        AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor = new AuthorizationAttributeSourceAdvisor();
        authorizationAttributeSourceAdvisor.setSecurityManager(securityManager);
        return authorizationAttributeSourceAdvisor;
    }


    @Bean(name="securityRealm")
    public SecurityRealm securityRealm() {
        SecurityRealm userRealm = new SecurityRealm();
        userRealm.setCredentialsMatcher(credentialsMatcher());
        return userRealm;
    }

    //凭证匹配器
    @Bean(name = "credentialsMatcher")
    public RetryLimitHashedCredentialsMatcher credentialsMatcher(){
        RetryLimitHashedCredentialsMatcher credentialsMatcher = new RetryLimitHashedCredentialsMatcher();
        credentialsMatcher.setHashAlgorithmName("md5");
        credentialsMatcher.setHashIterations(1024);
        credentialsMatcher.setStoredCredentialsHexEncoded(true);
        return credentialsMatcher;
    }


    @Bean(name = "lifecycleBeanPostProcessor")
    public LifecycleBeanPostProcessor getLifecycleBeanPostProcessor() {
        return new LifecycleBeanPostProcessor();
    }



    /**
     * 安全管理器
     * @return
     */
    @Bean(name = "securityManager")
    public DefaultWebSecurityManager getDefaultWebSecurityManager(SecurityRealm securityRealm){
        DefaultWebSecurityManager manager = new DefaultWebSecurityManager();
        manager.setRealm(securityRealm);
        manager.setSessionManager(sessionManager());
        manager.setCacheManager(redisCacheManager());
        return manager;
    }

    //会话管理器
    @Bean(name="sessionManager")
    public DefaultWebSessionManager sessionManager(){
        DefaultWebSessionManager sessionManager = new DefaultWebSessionManager();
        sessionManager.setCacheManager(redisCacheManager());
        sessionManager.setGlobalSessionTimeout(1800000);
        sessionManager.setDeleteInvalidSessions(true);
        //定时清理失效会话, 清理用户直接关闭浏览器造成的孤立会话
        sessionManager.setSessionValidationInterval(120000);
        sessionManager.setSessionValidationSchedulerEnabled(true);
        //Collection<SessionListener> listenerCollection = Lists.newArrayList();
        //listenerCollection.add(sessionListener());
        //sessionManager.setSessionListeners(listenerCollection);
        sessionManager.setSessionFactory(sessionFactory());
        return sessionManager;
    }

    //会话ID生成器
    @Bean(name="sessionIdGenerator")
    public JavaUuidSessionIdGenerator sessionIdGenerator(){
        return new JavaUuidSessionIdGenerator();
    }


    /*//监听session
    @Bean(name="sessionListener")
    public ShiroSessionListener sessionListener(){
        return new ShiroSessionListener();
    }*/

    @Bean(name="sessionFactory")
    public SessionFactory sessionFactory(){
        return new SessionFactory();
    }


    /**
     *  Shiro 的 Web 过滤器
     * @return
     */
    @Bean(name = "shiroFilter")
    public ShiroFilterFactoryBean getShiroFilterFactoryBean(DefaultWebSecurityManager securityManager){
        ShiroFilterFactoryBean bean = new MyShiroFilterFactoryBean();
        bean.setSecurityManager(securityManager);
        bean.setLoginUrl("/login");
        bean.setUnauthorizedUrl("/unauthorized");
        bean.setSuccessUrl("/index");

        Map<String, Filter>filters = Maps.newHashMap();
        filters.put("anon", new AnonymousFilter());
        filters.put("authc",formAuthenticationFilter());
        filters.put("user", new UserFilter());
        filters.put("logout", new LogoutFilter());
        filters.put("anyRoles", new AnyRolesFilter());
        bean.setFilters(filters);

        Map<String, String> chains = Maps.newHashMap();
        chains.put("/static/**", "anon");
        chains.put("/login", "authc");
        chains.put("/unauthorized", "anon");
        chains.put("/cms/code/captchaImage", "anon");
        chains.put("/logout", "logout");
        chains.put("/**", "user");
        bean.setFilterChainDefinitionMap(chains);
        return bean;
    }


    //自定义验证拦截器 ,基于Form表单的身份验证过滤器
    @Bean(name = "captchaFormAuthenticationFilter")
    public CaptchaFormAuthenticationFilter formAuthenticationFilter(){
        CaptchaFormAuthenticationFilter formAuthenticationFilter = new CaptchaFormAuthenticationFilter();
        formAuthenticationFilter.setCaptchaParam("kaptcha");
        formAuthenticationFilter.setJcaptchaEbabled(false);
        formAuthenticationFilter.setPasswordParam("password");
        formAuthenticationFilter.setName("username");
        formAuthenticationFilter.setRememberMeParam("rememberMe");
        formAuthenticationFilter.setLoginUrl("/login");
        return formAuthenticationFilter;
    }

    //会话缓存管理器
    @Bean(name="shiroRedisCacheManager")
    public ShiroRedisCacheManager redisCacheManager() {
        return new ShiroRedisCacheManager(redisTemplate);
    }

}
