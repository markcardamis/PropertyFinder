package com.majoapps.propertyfinder.security;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Bucket4j;
import io.github.bucket4j.Refill;
import java.time.Duration;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class AppConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {

        // High cost searches
        Refill refill = Refill.greedy(5, Duration.ofSeconds(10));
        Bandwidth limit = Bandwidth.classic(5, refill);
        Bucket bucket = Bucket4j.builder().addLimit(limit).build();
        registry.addInterceptor(new RateLimitInterceptor(bucket, 1)).addPathPatterns(
                "/api/listing",
                "/api/listing/notifications",
                "/api/listing/query"
        );

        // Address text search /api/propertyinformation/query
        refill = Refill.greedy(20, Duration.ofSeconds(10));
        limit = Bandwidth.classic(20, refill);
        bucket = Bucket4j.builder().addLimit(limit).build();
        registry.addInterceptor(new RateLimitInterceptor(bucket, 1)).addPathPatterns(
                "/api/propertyinformation/query"
        );

        // Rate limit general
        refill = Refill.greedy(10, Duration.ofSeconds(10));
        limit = Bandwidth.classic(10, refill);
        bucket = Bucket4j.builder().addLimit(limit).build();
        registry.addInterceptor(new RateLimitInterceptor(bucket, 1)).excludePathPatterns(
                "/api/listing",
                "/api/listing/notifications",
                "/api/listing/query",
                "/api/propertyinformation/query"
        );
    }
}
