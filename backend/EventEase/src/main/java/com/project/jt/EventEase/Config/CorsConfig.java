package com.project.jt.EventEase.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override

    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")
                // allow the headers your app actually sends
                .allowedHeaders("Authorization", "Cache-Control", "Content-Type")
                // let the client read back the Authorization header if you ever send it
                .exposedHeaders("Authorization")
                .allowedMethods("GET","POST","PUT","DELETE","OPTIONS","PATCH")
                .allowCredentials(true);
    }

}
