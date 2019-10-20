package com.majoapps.propertyfinder;

import com.okta.spring.boot.oauth.Okta;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.http.HttpMethod;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;


@SpringBootApplication
@EnableScheduling
@EnableJpaAuditing
@EnableWebSecurity
public class PropertyfinderApplication {

	public static void main(String[] args) {
		SpringApplication.run(PropertyfinderApplication.class, args);
	}

	@Configuration
	static class OktaOAuth2WebSecurityConfigurerAdapter extends WebSecurityConfigurerAdapter {

		@Override
		protected void configure(HttpSecurity http) throws Exception {

			http
				.requiresChannel()
					.requestMatchers(r -> r.getHeader("X-Forwarded-Proto") != null)
					.requiresSecure()
					.and()
				.csrf()
					.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
					.and()
				.sessionManagement()
					.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
					.and()
				.exceptionHandling()
					.authenticationEntryPoint(new Http403ForbiddenEntryPoint())
					.and()
				.authorizeRequests()
					.antMatchers(HttpMethod.GET,"/", "/login", "/css/**", "/images/**", "/favicon.ico").permitAll()
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
