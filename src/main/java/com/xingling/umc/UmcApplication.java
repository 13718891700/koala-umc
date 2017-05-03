package com.xingling.umc;

import com.xingling.exception.MyHandlerExceptionResolver;
import com.xingling.xss.XSSFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@ServletComponentScan
public class UmcApplication {

	public static void main(String[] args) {
		SpringApplication.run(UmcApplication.class, args);
	}

    @Bean
    public MyHandlerExceptionResolver myHandlerExceptionResolver() {
        return new MyHandlerExceptionResolver();
    }

    @Bean
    public FilterRegistrationBean myXssFilter() {
        final FilterRegistrationBean registrationBean = new FilterRegistrationBean();
        registrationBean.setFilter(new XSSFilter());
        registrationBean.addUrlPatterns("");
        registrationBean.setOrder(Integer.MAX_VALUE);
        return registrationBean;
    }

}
