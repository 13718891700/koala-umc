package com.xingling.umc.controller;

import com.google.code.kaptcha.Producer;
import com.xingling.controller.BaseController;
import com.xingling.exception.BusinessException;
import com.xingling.util.CookieUtil;
import com.xingling.wrap.WrapMapper;
import com.xingling.wrap.Wrapper;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.imageio.ImageIO;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

/**
 * <p>Title:	  xescm-cms <br/> </p>
 * <p>Description TODO <br/> </p>
 * <p>Company:    http://www.hnxianyi.com  <br/> </p>
 *
 * @Author <a href="190332447@qq.com"/>杨文生</a>  <br/>
 * @Date 2017/1/6 19:40
 */
@Controller
@RequestMapping(value = "/umc/captcha")
public class KaptchaImageController extends BaseController{

    @Resource
    private Producer captchaProducer;

    @Resource
    private RedisTemplate redisTemplate;


    /**
     * <p>Title:	  genetrateKaptchaImage. </p>
     * <p>Description 生成验证码</p>
     *
     * @param   response HttpServletResponse
     * @Author        <a href="190332447@qq.com"/>杨文生</a>
     * @CreateDate    2017/6/3 17:43
     * @return ModelAndView
     */
    @RequestMapping(value = "genetrateKaptchaImage", method = RequestMethod.GET, produces = MediaType.IMAGE_PNG_VALUE)
    public @ResponseBody byte[] genetrateKaptchaImage(HttpServletResponse response) throws Exception {
        String capText = captchaProducer.createText();
        // 生成验证码
        String uuid = UUID.randomUUID().toString();
        // 将验证码以<key,value>形式缓存到redis
        redisTemplate.opsForValue().set(uuid, capText, 60 * 5, TimeUnit.SECONDS);
        // 将验证码key，及验证码的图片返回
        Cookie cookie = new Cookie("captchaCode", uuid);
        response.addCookie(cookie);
        BufferedImage bi = captchaProducer.createImage(capText);
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        try {
            ImageIO.write(bi, "jpg", out);
            return out.toByteArray();
        } catch (IOException e) {
            return null;
        }
    }


    /**
     * <p>Title:	  checkValidateCode. </p>
     * <p>Description </p>
     *
     * @param       request
     * @Author        <a href="190332447@qq.com"/>杨文生</a>
     * @CreateDate    2017/6/3 17:44
     * @return   null
     */
    @RequestMapping(value = "/checkValidateCode/{captcha}")
    @ResponseBody
    public Wrapper<?> checkCaptcha(@PathVariable("captcha") String captcha, HttpServletRequest request){

        String captchaCode = CookieUtil.findCookie("captchaCode",request);
        try {
            //redis中查询验证码
            String captchaValue = redisTemplate.opsForValue().get(captchaCode).toString();
            if (captchaValue == null) {
                throw new BusinessException("验证码失效");
            }

            if (captchaValue.compareToIgnoreCase(captcha) != 0) {
                throw new BusinessException("验证码不正确");
            }

            //验证码匹配成功，redis则删除对应的验证码
            redisTemplate.delete(captchaCode);
        } catch (BusinessException ex) {
            logger.error("校验验证码, 出现异常={}", ex.getMessage(), ex);
            return WrapMapper.wrap(Wrapper.ERROR_CODE, ex.getMessage());
        } catch (Exception ex) {
            logger.error("校验验证码, 出现异常={}", ex.getMessage(), ex);
            return WrapMapper.error();
        }
        return WrapMapper.wrap(Wrapper.SUCCESS_CODE, Wrapper.SUCCESS_MESSAGE);
    }
}
