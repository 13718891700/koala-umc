package com.xingling.umc.config;

import com.google.common.collect.Maps;
import com.xingling.umc.security.cache.ShiroRedisCacheManager;
import com.xingling.umc.security.core.MyShiroFilterFactoryBean;
import com.xingling.umc.security.core.RetryLimitHashedCredentialsMatcher;
import com.xingling.umc.security.core.SecurityRealm;
import com.xingling.umc.security.filter.AnyRolesFilter;
import com.xingling.umc.security.filter.CaptchaFormAuthenticationFilter;
import com.xingling.umc.security.filter.LogoutFilter;
import com.xingling.umc.security.filter.UserFilter;
import com.xingling.umc.security.session.SessionFactory;
import org.apache.shiro.authc.credential.CredentialsMatcher;
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
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;

import javax.servlet.Filter;
import java.util.Map;

/** 
 * @author  lilufeng 
 * @date 创建时间：2016年5月12日 下午3:34:15 
 * Shiro配置
 */

@Configuration
public class ShiroConfig {

	private static Logger logger = LoggerFactory.getLogger(ShiroConfig.class);


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
	public SecurityRealm securityRealm(ShiroRedisCacheManager cacheManager) {
		SecurityRealm userRealm = new SecurityRealm();
		userRealm.setCredentialsMatcher(credentialsMatcher(cacheManager));
		return userRealm;
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
		sessionManager.setSessionFactory(sessionFactory());
		return sessionManager;
	}


	@Bean(name="sessionFactory")
	public SessionFactory sessionFactory(){
		return new SessionFactory();
	}

	//会话ID生成器
	@Bean(name="sessionIdGenerator")
	public JavaUuidSessionIdGenerator sessionIdGenerator(){
		return new JavaUuidSessionIdGenerator();
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
		bean.setSuccessUrl("/showBackStage");

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
		chains.put("/umc/code/captchaImage", "anon");
		chains.put("/logout", "logout");
		chains.put("/**", "user");
		bean.setFilterChainDefinitionMap(chains);
		return bean;
	}

	//凭证匹配器
	@Bean(name = "credentialsMatcher")
	@ConditionalOnMissingBean
	@DependsOn("cacheManager")
	public CredentialsMatcher credentialsMatcher(ShiroRedisCacheManager cacheManager) {
		RetryLimitHashedCredentialsMatcher credentialsMatcher = new RetryLimitHashedCredentialsMatcher(cacheManager);
		credentialsMatcher.setRetryMax(5);
		credentialsMatcher.setHashAlgorithmName("md5");
		credentialsMatcher.setHashIterations(1024);
		credentialsMatcher.setStoredCredentialsHexEncoded(true);
		return credentialsMatcher;
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

	@Bean(name="connectionFactory")
	public JedisConnectionFactory connectionFactory(){
		JedisConnectionFactory conn = new JedisConnectionFactory();
		conn.setDatabase(1);
		conn.setHostName("127.0.0.1");
		conn.setPassword("");
		conn.setPort(6379);
		conn.setTimeout(0);
		return conn;
	}

	@Bean(name="redisTemplate")
	@DependsOn("connectionFactory")
	public RedisTemplate<byte[], Object> redisTemplate() {
		RedisTemplate<byte[], Object> template = new RedisTemplate<>();
		template.setConnectionFactory(connectionFactory());
		return template;
	}



	//会话缓存管理器
	@Bean(name="shiroRedisCacheManager")
	public ShiroRedisCacheManager redisCacheManager() {
		ShiroRedisCacheManager cacheManager = new ShiroRedisCacheManager(redisTemplate());
		return cacheManager;
	}

}
