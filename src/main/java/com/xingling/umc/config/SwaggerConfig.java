package com.xingling.umc.config;

import io.swagger.annotations.ApiOperation;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
@Profile({ "dev", "test" })
public class SwaggerConfig {
	@Bean
	public Docket reservationApi() {
		return new Docket(DocumentationType.SWAGGER_2).
				apiInfo(apiInfo())//用来创建该Api的基本信息
				.select()//暴露哪些接口来访问
				.apis(RequestHandlerSelectors.withMethodAnnotation(ApiOperation.class))
				.paths(PathSelectors.any())
				.build();
	}

	private ApiInfo apiInfo() {
		String email = "13718891700@qq.com";
		String name = "yangwensheng";
		String url = "http://www.xinglinglove.com";
		Contact contact = new Contact(name, url, email);
		return new ApiInfoBuilder().title("接口文档").description("用户中心API").contact(contact).build();
	}
}