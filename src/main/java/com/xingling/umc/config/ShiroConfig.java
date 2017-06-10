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
import org.apache.shiro.web.session.mgt.ServletContainerSessionManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.aop.framework.autoproxy.DefaultAdvisorAutoProxyCreator;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.bind.RelaxedPropertyResolver;
import org.springframework.context.EnvironmentAware;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.core.env.Environment;
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
public class ShiroConfig implements EnvironmentAware{

	private static Logger logger = LoggerFactory.getLogger(ShiroConfig.class);

	private RelaxedPropertyResolver propertyResolver;

	public void setEnvironment(Environment env) {
		this.propertyResolver = new RelaxedPropertyResolver(env, "spring.redis.");
	}

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
//		userRealm.setCacheManager(redisCacheManager());
//		userRealm.setCachingEnabled(true);
//		userRealm.setAuthenticationCachingEnabled(true);
//		userRealm.setAuthorizationCachingEnabled(true);
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
//		manager.setCacheManager(redisCacheManager());
		return manager;
	}


	/**
	 * <p>Title:	  sessionManager. </p>
	 * <p>Description 会话管理器</p>
	 *
	 * @param
	 * @Author        <a href="190332447@qq.com"/>杨文生</a>
	 * @CreateDate    2017/6/3 19:45
	 * @return
	 */
	@Bean(name = "sessionManager")
	public ServletContainerSessionManager sessionManager() {
		ServletContainerSessionManager sessionManager = new ServletContainerSessionManager();
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
		filters.put("authc",new CaptchaFormAuthenticationFilter());
		filters.put("user", new UserFilter());
		filters.put("logout", new LogoutFilter());
		filters.put("anyRoles", new AnyRolesFilter());
		bean.setFilters(filters);

		Map<String, String> chains = Maps.newHashMap();
		chains.put("/assets/**", "anon");
		chains.put("/css/**", "anon");
		chains.put("/img/**", "anon");
		chains.put("/js/**", "anon");
		chains.put("/swagger-ui.html", "anon");
		chains.put("/login", "authc");
		chains.put("/unauthorized", "anon");
		chains.put("/umc/user/queryUserListWithPage", "anon");
		chains.put("/umc/captcha/**", "anon");
		chains.put("/logout", "logout");
		chains.put("/**", "user");
		bean.setFilterChainDefinitionMap(chains);
		return bean;
	}

	//凭证匹配器
	@Bean(name = "credentialsMatcher")
	@ConditionalOnMissingBean
	@DependsOn("cacheManager")
	public CredentialsMatcher credentialsMatcher() {
		RetryLimitHashedCredentialsMatcher credentialsMatcher = new RetryLimitHashedCredentialsMatcher();
		credentialsMatcher.setRetryMax(5);
		credentialsMatcher.setHashAlgorithmName("md5");
		credentialsMatcher.setHashIterations(2);
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
		conn.setDatabase(Integer.valueOf(propertyResolver.getProperty("database")));
		conn.setHostName(propertyResolver.getProperty("host"));
		conn.setPassword(propertyResolver.getProperty("password"));
		conn.setPort(Integer.valueOf(propertyResolver.getProperty("port")));
		conn.setTimeout(Integer.valueOf(propertyResolver.getProperty("timeout")));
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
