package com.xingling.umc.config;

import com.xingling.umc.security.core.CaptchaAuthenticationProvider;
import com.xingling.umc.security.core.JwtAuthenticationEntryPoint;
import com.xingling.umc.security.filter.UsernamePasswordCaptchaAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.encoding.Md5PasswordEncoder;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.StandardPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Resource
	private JwtAuthenticationEntryPoint unauthorizedHandler;

	@Resource
	private UserDetailsService userDetailsService;


	@Autowired
	public void configureAuthentication(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
		authenticationManagerBuilder.userDetailsService(this.userDetailsService).passwordEncoder(md5PasswordEncoder());
	}

	@Bean(name = "authenticationManager")
	public AuthenticationManager authenticationManager(
			CaptchaAuthenticationProvider captchaAuthenticationProvider) {
		List<AuthenticationProvider> list = new ArrayList<>();
		list.add(captchaAuthenticationProvider);
		AuthenticationManager authenticationManager = new ProviderManager(list);
		return authenticationManager;
	}

	@Bean(name = "captchaAuthenticationProvider")
	public CaptchaAuthenticationProvider captchaAuthenticationProvider(){
		CaptchaAuthenticationProvider captchaAuthenticationProvider = new CaptchaAuthenticationProvider();
		captchaAuthenticationProvider.setUserDetailsService(userDetailsService);
		captchaAuthenticationProvider.setPasswordEncoder(standardPasswordEncoder());
		return captchaAuthenticationProvider;
	}

	@Bean(name = "usernamePasswordCaptchaAuthenticationFilter")
	public UsernamePasswordCaptchaAuthenticationFilter usernamePasswordCaptchaAuthenticationFilter(AuthenticationManager authenticationManager) {
		UsernamePasswordCaptchaAuthenticationFilter filter = new UsernamePasswordCaptchaAuthenticationFilter();
		filter.setAuthenticationManager(authenticationManager);
		return filter;
	}

	@Bean
	public StandardPasswordEncoder standardPasswordEncoder(){
		return new StandardPasswordEncoder();
	}

	@Bean
	public Md5PasswordEncoder md5PasswordEncoder() {
		return new Md5PasswordEncoder();
	}

	/*@Bean
	public JwtAuthenticationFilter authenticationTokenFilterBean() throws Exception {
		return new JwtAuthenticationFilter();
	}*/

	@Override
	protected void configure(HttpSecurity httpSecurity) throws Exception {
		httpSecurity
				// we don't need CSRF because our token is invulnerable
				.csrf().disable()
				.exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
				// 不要创建session
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
				.formLogin().loginProcessingUrl("/login").and()
				.authorizeRequests()
				// allow anonymous resource requests
				.antMatchers(
						HttpMethod.GET,
						"/",
						"/*.html",
						"/favicon.ico",
						"/**/*.png",
						"/**/*.jpg",
						"/**/*.jif",
						"/**/*.jpeg",
						"/**/*.woff",
						"/**/*.ttf",
						"/**/*.css",
						"/**/*.js",
						"/showBackStage",
						"/umc/captcha/*"
				).permitAll()
				.antMatchers("/login").permitAll()
				.anyRequest().authenticated();
		// Custom JWT based security filter
		httpSecurity
				.addFilterBefore(usernamePasswordCaptchaAuthenticationFilter(authenticationManager()), UsernamePasswordAuthenticationFilter.class);
		// disable page caching
		httpSecurity.headers().cacheControl();
	}
}