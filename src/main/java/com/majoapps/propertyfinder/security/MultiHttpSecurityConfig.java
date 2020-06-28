package com.majoapps.propertyfinder.security;

import com.okta.spring.boot.oauth.Okta;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.header.writers.StaticHeadersWriter;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class MultiHttpSecurityConfig {

    @Configuration
    static class OktaOAuth2WebSecurityConfigurerAdapter extends WebSecurityConfigurerAdapter {

        @Override
        protected void configure(HttpSecurity http) throws Exception {
        String xFrameOptions = System.getenv().get("X_FRAME_OPTIONS");

            http
                .headers()
                    .addHeaderWriter(new StaticHeadersWriter("X-FRAME-OPTIONS", xFrameOptions))
                    .and()
                .requiresChannel()
                    .requestMatchers(r -> r.getHeader("X-Forwarded-Proto") != null)
                    .requiresSecure()
                    .and()
                .csrf()
                    .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                    .ignoringAntMatchers("/api/listing/notifications", "/api/account", "/api/listing/query")
                    .and()
                .cors()
                    .and()
                .sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                    .and()
                .exceptionHandling()
                    .authenticationEntryPoint(new Http403ForbiddenEntryPoint())
                    .and()
                .authorizeRequests()
                    .antMatchers(HttpMethod.GET,
                                "/", "/api/listing", "/api/listing/*", "/api/propertyinformation/*",
                                "/dist/*", "/implicit/callback", "/login", "/login/*", "/css/**", 
                                "/images/**", "/favicon.ico", "/robots.txt", 
                                "/signup", "/search", "/about", "/contact").permitAll()
                    .and()
                .authorizeRequests()
                    .antMatchers(HttpMethod.POST,
                                "/api/listing/notifications",
                                "/api/listing/query", 
                                "/api/account").permitAll()
                    .and()
                .authorizeRequests()
                    .antMatchers("/api/**").authenticated()
                    .and()
                .authorizeRequests()
                    .anyRequest().authenticated()
                    .and()
                .oauth2Client()
                    .and()
                .oauth2Login()
                    .and()
                .oauth2ResourceServer().jwt();
            Okta.configureResourceServer401ResponseBody(http);
        }
    }

}