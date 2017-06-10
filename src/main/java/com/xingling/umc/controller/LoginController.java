package com.xingling.umc.controller;

/**
 * <p>Title:	  xescm-cms <br/> </p>
 * <p>Description TODO <br/> </p>
 * <p>Company:    http://www.hnxianyi.com  <br/> </p>
 *
 * @Author <a href="190332447@qq.com"/>杨文生</a>  <br/>
 * @Date 2017/1/7 22:34
 */

import com.xingling.umc.security.exception.IncorrectCaptchaException;
import org.apache.shiro.authc.CredentialsException;
import org.apache.shiro.authc.ExcessiveAttemptsException;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.UnknownAccountException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;

@Controller
public class LoginController {

    /** 视图前缀 */
    private static final String viewPrefix = "login";

    @RequestMapping(value = "/login",method = RequestMethod.GET)
    public String login(){
        return viewPrefix + "/login";
    }


    @RequestMapping(value="/login",method= RequestMethod.POST)
    public String login(HttpServletRequest request, Model model) {
        String url = viewPrefix + "/index";
        String exceptionClassName = (String)request.getAttribute("shiroLoginFailure");
        String errorMsg = null;
        if(UnknownAccountException.class.getName().equals(exceptionClassName)) {
            errorMsg = "用户名或密码错误！";
        }else if(ExcessiveAttemptsException.class.getName().equals(exceptionClassName)){
            errorMsg = "密码重试超过五次，账号已经被锁定！";
        }else if(LockedAccountException.class.getName().equals(exceptionClassName)){
            errorMsg = "您的账号被锁定！";
        }else if(IncorrectCaptchaException.class.getName().equals(exceptionClassName)){
            errorMsg = "验证码错误！";
        }else if(CredentialsException.class.getName().equals(exceptionClassName)) {
            errorMsg = "用户名或密码错误！";
        } else if(exceptionClassName != null) {
            errorMsg = "其他错误：" + exceptionClassName;
        }
        if(!"".equals(errorMsg) && null != errorMsg){
            boolean jcaptchaEbabled = true;
            model.addAttribute("jcaptchaEbabled",jcaptchaEbabled);
            model.addAttribute("loginError",errorMsg);
            return "redirect:/login";
        }
        return "redirect:/showBackStage";
    }


}