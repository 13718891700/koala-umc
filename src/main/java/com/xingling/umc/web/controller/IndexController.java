package com.xingling.umc.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

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
public class IndexController {

    /** 视图前缀 */
    private static final String viewPrefix = "/sys";

    /**
     * Go Index
     * @return
     */
    @RequestMapping(value={"", "/", "/index"})
    public String index() {
        return viewPrefix + "/index";
    }

    /**
     * unauthor
     * @return
     */
    @RequestMapping("/unauthorized")
    public String unauthor() {
        return viewPrefix + "/unauthorized";
    }

}
