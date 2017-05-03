package com.xingling.umc.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * <p>Title:	  ErrorController. </p>
 * <p>Description TODO </p>
 * <p>Company:    http://www.hnxianyi.com </p>
 *
 * @Author         <a href="190332447@qq.com"/>杨文生</a>
 * @CreateDate     2017/5/3 17:24
 */
@Controller
public class ErrorController {
    /**
     * 视图前缀
     */
    private static final String viewPrefix = "/error";

    @RequestMapping(value = "errorAuth", method = RequestMethod.GET)
    public String handleError(){
        return "errorAuth";
    }

    @RequestMapping(value = "/error/500", method = RequestMethod.GET)
    public String to500(){
        return viewPrefix + "/error-500";
    }

    @RequestMapping(value = "/error/404", method = RequestMethod.GET)
    public String to404(){
        return viewPrefix + "/error-404";
    }

    @RequestMapping(value = "/error/timeout", method = RequestMethod.GET)
    public String toTimeout(){
        return viewPrefix + "/error-timeout";
    }


}