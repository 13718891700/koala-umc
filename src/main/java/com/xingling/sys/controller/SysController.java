package com.xingling.sys.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/sys")
public class SysController {
	
	@RequestMapping("/showBackStage")
    public ModelAndView loadShowDemo() throws Exception{
       return new ModelAndView("backstage/index_admin") ;
    } 
	
	@RequestMapping("/showUnauthorized")
    public ModelAndView loadUnauthorized() throws Exception{
       return new ModelAndView("login/unauthorized") ;
    } 
	
	@RequestMapping("/showLockScreen")
    public ModelAndView showLockScreen() throws Exception{
       return new ModelAndView("backstage/index_lock") ;
    } 
}
