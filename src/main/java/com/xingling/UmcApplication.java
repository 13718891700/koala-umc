package com.xingling;

import com.xingling.exception.MyHandlerExceptionResolver;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
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
}
