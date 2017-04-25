package com.xingling.sys.controller;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class LoginController {

	@RequestMapping(value = "/login",method = RequestMethod.GET)
    public ModelAndView login(){
    	ModelAndView modelAndView = new ModelAndView("login/login");
        return modelAndView;
    }
	
	@RequestMapping(value="/login",method= RequestMethod.POST)
	public ModelAndView login(String username, String password) {
		ModelAndView modelAndView = new ModelAndView("sys/showBackStage");
		Subject subject = SecurityUtils.getSubject();
		//判断是否已登录
		if(subject.isAuthenticated()){
			subject.logout();
		}
		UsernamePasswordToken token = new UsernamePasswordToken(username, password);
		token.setRememberMe(true);
		try {
			subject.login(token);
		} catch (AuthenticationException e) {
			token.clear();
			modelAndView.addObject("loginError","用户名或密码错误");
			modelAndView.setViewName("login/login");
		}
		return modelAndView;
	}
	
}
