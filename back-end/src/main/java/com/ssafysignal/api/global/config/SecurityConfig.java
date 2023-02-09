package com.ssafysignal.api.global.config;

import com.ssafysignal.api.global.jwt.*;
import com.ssafysignal.api.global.redis.LogoutAccessTokenRedisRepository;
import com.ssafysignal.api.global.redis.RefreshTokenRedisRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtEntryPoint jwtEntryPoint;
    private final JwtTokenUtil jwtTokenUtil;
    private final CustomUserDetailService customUserDetailService;
    private final LogoutAccessTokenRedisRepository logoutAccessTokenRedisRepository;
    private final RefreshTokenRedisRepository refreshTokenRedisRepository;
    private final JwtExceptionFilter jwtExceptionFilter;
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors()
                .and()

                .csrf().disable()

                // 세분화 되어있을수록 위쪽에 위치해야한다.
                .authorizeRequests()

                /*.antMatchers("/user").permitAll()
                .antMatchers("/user/**").hasAnyAuthority("USER","ADMIN")

                .antMatchers("/auth/logout").hasAnyAuthority("USER","ADMIN")
                .antMatchers("/auth/**").permitAll()

                .antMatchers("/posting/apply/**","/posting/post/**").hasAnyAuthority("USER","ADMIN")
                .antMatchers(HttpMethod.GET,"/posting","/posting/**").permitAll()
                .antMatchers("/posting","/posting/**").hasAnyAuthority("USER","ADMIN")

                .antMatchers("/apply","/apply/**").hasAnyAuthority("USER","ADMIN")

                .antMatchers("/project","/project/**").hasAnyAuthority("USER","ADMIN")

                .antMatchers("/todo","/todo/**").hasAnyAuthority("USER","ADMIN")

                .antMatchers("/notiondocs","/notiondocs/**").hasAnyAuthority("USER","ADMIN")

                .antMatchers("/profile","/profile/**").hasAnyAuthority("USER","ADMIN")

                .antMatchers("/openprofile").hasAnyAuthority("USER","ADMIN")
                .antMatchers("/openprofile/**").permitAll()

                .antMatchers("/letter","/letter/**").hasAnyAuthority("USER","ADMIN")

                .antMatchers("/signalweek","/signalweek/rank").permitAll()
                .antMatchers("/signalweek/**").hasAnyAuthority("USER","ADMIN")


                .antMatchers("/board/notice","/board/notice/**").permitAll()

                .antMatchers(HttpMethod.GET,"/board/qna/**","/board/qna").permitAll()
                .antMatchers("/board/qna/**","/board/qna").hasAnyAuthority("USER","ADMIN")*/

                .antMatchers("/admin/**").hasAnyAuthority("ADMIN")
                .anyRequest().permitAll()

                .and()
                .exceptionHandling()
                .authenticationEntryPoint(jwtEntryPoint)

                .and()
                .logout().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable();

        http.addFilterBefore(new JwtAuthenticationFilter(jwtTokenUtil, customUserDetailService, logoutAccessTokenRedisRepository, refreshTokenRedisRepository), UsernamePasswordAuthenticationFilter.class);
        http.addFilterBefore(jwtExceptionFilter, JwtAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }
}
