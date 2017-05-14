package com.xingling.umc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

/**
 * <p>Title:	  spring-boot-demo <br/> </p>
 * <p>Description TODO <br/> </p>
 * <p>Company:    http://www.hnxianyi.com  <br/> </p>
 *
 * @Author <a href="190332447@qq.com"/>杨文生</a>  <br/>
 * @Date 2017/5/13 21:47
 */
@Controller
public class IndexController {

    @RequestMapping("/showBackStage")
    public ModelAndView loadShowDemo(HttpServletRequest request) throws Exception{
        return new ModelAndView("backstage/index_admin") ;
    }

    @RequestMapping("/unauthorized")
    public ModelAndView loadUnauthorized(HttpServletRequest request) throws Exception{
        return new ModelAndView("login/unauthorized") ;
    }

    @RequestMapping("/showLockScreen")
    public ModelAndView showLockScreen(HttpServletRequest request) throws Exception{
        return new ModelAndView("backstage/index_lock") ;
    }

}
