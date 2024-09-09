package com.ankit.student_management.swagger;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info().title("Student Management API")
                        .description("API documentation for Student Management application")
                        .version("1.0"));
    }

    @Bean
    public GroupedOpenApi studentManagementApi() {
        return GroupedOpenApi.builder()
                .group("student-management")
                .pathsToMatch("/students/**")
                .build();
    }
}