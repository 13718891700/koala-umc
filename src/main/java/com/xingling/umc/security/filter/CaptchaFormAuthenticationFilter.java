package com.xingling.umc.security.filter;

import com.xingling.umc.security.core.CaptchaAuthenticationToken;
import com.xingling.umc.security.exception.IncorrectCaptchaException;
import com.xingling.umc.security.utils.PasswordCacheUtils;
import com.xingling.util.CookieUtil;
import com.xingling.util.ValidatorUtil;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.filter.authc.FormAuthenticationFilter;
import org.apache.shiro.web.util.WebUtils;
import org.springframework.data.redis.core.RedisTemplate;

import javax.annotation.Resource;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.util.concurrent.atomic.AtomicInteger;

public class CaptchaFormAuthenticationFilter extends FormAuthenticationFilter {


	@Resource
	private RedisTemplate redisTemplate;

    public CaptchaFormAuthenticationFilter() {
    }

    public static final String DEFAULT_CAPTCHA_PARAM = "kaptcha";

    public static final String DEFAULT_MOBILE_PARAM = "mobileLogin";

    private String captchaParam = DEFAULT_CAPTCHA_PARAM;

    private String mobileLoginParam = DEFAULT_MOBILE_PARAM;

    private String failureKeyAttribute = "shiroLoginFailure"; //验证码验证失败后存储到的属性名

    private boolean jcaptchaEbabled = false;//是否开启验证码支持

    public String getCaptchaParam() {
        return captchaParam;
    }

    public void setCaptchaParam(String captchaParam) {
        this.captchaParam = captchaParam;
    }

    protected String getCaptcha(ServletRequest request) {
        return WebUtils.getCleanParam(request, getCaptchaParam());
    }

    public String getMobileLoginParam() {
        return mobileLoginParam;
    }

    public void setMobileLoginParam(String mobileLoginParam) {
        this.mobileLoginParam = mobileLoginParam;
    }

    protected boolean isMobileLogin(ServletRequest request) {
        return WebUtils.isTrue(request, getMobileLoginParam());
    }

    public void setJcaptchaEbabled(boolean jcaptchaEbabled) {
        this.jcaptchaEbabled = jcaptchaEbabled;
    }

    @Override
    protected AuthenticationToken createToken(ServletRequest request,
                                              ServletResponse response) {
        String username = getUsername(request);
        String password = getPassword(request);
        String captcha = getCaptcha(request);
        boolean rememberMe = isRememberMe(request);
        String host = getHost(request);
        boolean mobile = isMobileLogin(request);
        if (!mobile) { //增加登录媒介是否是手机号的校验,目前只根据传入的值进行判断
            mobile = ValidatorUtil.isMobile(username); //校验是否是手机号
        }
        return new CaptchaAuthenticationToken(username, password, rememberMe, host, captcha, mobile);
    }

    // 认证
    @Override
    protected boolean executeLogin(ServletRequest request, ServletResponse response) throws Exception {
        CaptchaAuthenticationToken token = (CaptchaAuthenticationToken) createToken(request, response);
        try {
            AtomicInteger retryCount = PasswordCacheUtils.getPasswordRetryInfo((String) token.getPrincipal());
            if (retryCount != null && retryCount.get() > 0) {
                //1、设置验证码是否开启属性，页面可以根据该属性来决定是否显示验证码
                //request.setAttribute("jcaptchaEbabled", jcaptchaEbabled);
                HttpServletRequest httpServletRequest = WebUtils.toHttp(request);
                //2、判断验证码是否禁用 或是表单提交（允许访问）
                if (jcaptchaEbabled == true || "post".equalsIgnoreCase(httpServletRequest.getMethod())) {
                    //3、此时是表单提交，验证验证码是否正确
                    doCaptchaValidate((HttpServletRequest) request, token);
                }
            }
            Subject subject = getSubject(request, response);
            subject.login(token);
            return onLoginSuccess(token, subject, request, response);
        } catch (AuthenticationException e) {
            return onLoginFailure(token, e, request, response);
        }
    }

    // 验证码校验
    protected void doCaptchaValidate(HttpServletRequest request, CaptchaAuthenticationToken token) {
	    String captchaCode = CookieUtil.findCookie("captchaCode",request);
	    //redis中查询验证码
	    String kaptcha = redisTemplate.opsForValue().get(captchaCode).toString();
        if (StringUtils.isEmpty(token.getKaptcha()) || !token.getKaptcha().equalsIgnoreCase(kaptcha)) {
            //定义IncorrectCaptchaException，shiro显示Exception class name作为error信息
            throw new IncorrectCaptchaException("验证码错误！");
        }
	    //验证码匹配成功，redis则删除对应的验证码
	    redisTemplate.delete(captchaCode);
    }

    @Override
    protected boolean onAccessDenied(ServletRequest request,
                                     ServletResponse response, Object mappedValue) throws Exception {
        //如果验证码失败了，存储失败key属性
        request.setAttribute(failureKeyAttribute, "jCaptcha.error");
        return super.onAccessDenied(request, response, mappedValue);
    }

}
