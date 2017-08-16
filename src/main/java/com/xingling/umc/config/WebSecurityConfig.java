package com.xingling.umc.config;

import com.xingling.umc.model.domain.User;
import com.xingling.umc.security.core.SecurityUser;
import com.xingling.umc.service.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configurers.GlobalAuthenticationConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import javax.annotation.Resource;

@Configuration
public class WebSecurityConfig extends GlobalAuthenticationConfigurerAdapter {


	@Resource
	private UserService userService;
	
	@Override
	public void init(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService());
	}
	
	@Bean
	public UserDetailsService userDetailsService() {
		return new UserDetailsService() {
			@Override
			public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
				User user = userService.selectUserByUserName(username);
				if (user == null) {
					throw new UsernameNotFoundException(String.format("No user found with username '%s'.", username));
				}
				return new SecurityUser(user);
			}

		};
	}
}
