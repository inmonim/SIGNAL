package com.ssafysignal.api.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry){
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000",
                                "http://tableminpark.iptime.org:3000",
                                "http://tableminpark.iptime.org:80",
                                "https://tableminpark.iptime.org:3000",
                                "https://tableminpark.iptime.org:80")
                .allowedMethods("OPTIONS", "GET", "POST", "PUT", "DELETE");
    }
}
