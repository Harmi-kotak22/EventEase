package com.project.jt.EventEase.Security;

import com.project.jt.EventEase.Service.CustomUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Collections;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final CustomUserDetailsService customUserDetailsService;

    public SecurityConfig(CustomUserDetailsService customUserDetailsService) {
        this.customUserDetailsService = customUserDetailsService;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(customUserDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager() {
        return new ProviderManager(Collections.singletonList(authenticationProvider()));
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(configurer -> configurer
                        // 👇 Allow POST /users and GET /users without auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/users/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/users").permitAll()

                        // ✅ Allow authentication endpoints
                        .requestMatchers("/auth/login").permitAll()
                        .requestMatchers("/auth/register").permitAll()
                        .requestMatchers("/auth/generate-code").permitAll()  // Temporarily allow for initial setup

                        // 🔐 Other route protections (as you had)
                        .requestMatchers(HttpMethod.PUT, "/users/**").hasRole("CLUB_ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/users/**").hasRole("CLUB_ADMIN")
                        .requestMatchers(HttpMethod.GET, "/audiences").hasRole("CLUB_ADMIN")
                        .requestMatchers(HttpMethod.POST, "/audiences").permitAll()
                        .requestMatchers(HttpMethod.PUT, "/audiences/**").hasAnyRole("STUDENT", "CLUB_ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/audiences/**").hasRole("CLUB_ADMIN")

                        .requestMatchers(HttpMethod.GET, "/students").hasRole("CLUB_ADMIN")
                        .requestMatchers(HttpMethod.POST, "/students").permitAll()
                        .requestMatchers(HttpMethod.PUT, "/students/**").hasAnyRole("STUDENT", "CLUB_ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/students/**").hasRole("CLUB_ADMIN")

                        .requestMatchers(HttpMethod.GET, "/club-admins").permitAll()
                        .requestMatchers(HttpMethod.POST, "/club-admins").permitAll()
                        .requestMatchers(HttpMethod.PUT, "/club-admins/**").hasRole("CLUB_ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/club-admins/**").hasRole("CLUB_ADMIN")

                        .requestMatchers(HttpMethod.GET, "/participants").hasAnyRole("CLUB_ADMIN", "STUDENT")
                        .requestMatchers(HttpMethod.POST, "/participants").permitAll()
                        .requestMatchers(HttpMethod.PUT, "/participants/**").hasRole("STUDENT")
                        .requestMatchers(HttpMethod.DELETE, "/participants/**").hasRole("CLUB_ADMIN")

                        .requestMatchers(HttpMethod.GET, "/registrations").hasRole("CLUB_ADMIN")
                        .requestMatchers(HttpMethod.POST, "/registrations").hasRole("CLUB_ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/registrations/**").hasRole("CLUB_ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/registrations/**").hasRole("CLUB_ADMIN")

                        .requestMatchers(HttpMethod.GET, "/events").hasAnyRole("STUDENT", "CLUB_ADMIN")
                        .requestMatchers(HttpMethod.POST, "/events").hasRole("CLUB_ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/events/**").hasRole("CLUB_ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/events/**").hasRole("CLUB_ADMIN")

                        // 🔒 Catch all: must be authenticated
                        .anyRequest().authenticated()
                )
                .authenticationProvider(authenticationProvider())
                .httpBasic(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(new JwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
} 