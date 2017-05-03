package com.xingling.umc.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by Liqd on 2017/1/5.
 * <p>Title:	  xescm-cms <br/> </p>
 * <p>Description TODO <br/> </p>
 * <p>Company:    http://www.hnxianyi.com  <br/> </p>
 *
 * @Author <a href="190332447@qq.com"/>杨文生</a>  <br/>
 * @Date 2017/1/7 22:33
 */
@Controller
@RequestMapping("/sys")
public class IndexController {

    @RequestMapping("/showBackStage")
    public ModelAndView loadShowDemo(HttpServletRequest request) throws Exception{
        return new ModelAndView("backstage/index_admin") ;
    }

    @RequestMapping("/showUnauthorized")
    public ModelAndView loadUnauthorized(HttpServletRequest request) throws Exception{
        return new ModelAndView("login/unauthorized") ;
    }

    @RequestMapping("/showLockScreen")
    public ModelAndView showLockScreen(HttpServletRequest request) throws Exception{
        return new ModelAndView("backstage/index_lock") ;
    }

}
