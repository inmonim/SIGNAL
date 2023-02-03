package com.ssafysignal.api.global.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafysignal.api.global.response.BasicResponse;
import com.ssafysignal.api.global.response.ResponseCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtEntryPoint implements AuthenticationEntryPoint {
    private final ObjectMapper objectMapper;
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        // 엑세스 토큰 만료될때 터짐
        // 토큰없을때
        response.setStatus(HttpStatus.OK.value());
        response.setContentType("application/json; charset=UTF-8");
        response.getWriter().print(objectMapper.writeValueAsString(BasicResponse.Body(ResponseCode.INVALID_TOKEN, "토큰이 없습니다.")));
    }
}
