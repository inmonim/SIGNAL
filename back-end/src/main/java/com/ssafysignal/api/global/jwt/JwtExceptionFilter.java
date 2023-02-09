package com.ssafysignal.api.global.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafysignal.api.global.response.BasicResponse;
import com.ssafysignal.api.global.response.ResponseCode;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtExceptionFilter  extends GenericFilterBean {

    private final ObjectMapper objectMapper;
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        try {
            chain.doFilter(request, response);
        } catch (JwtException ex) {
            setErrorResponse(HttpStatus.OK, (HttpServletResponse) response, ex);
        }
    }
    public void setErrorResponse(HttpStatus status, HttpServletResponse response, Throwable ex) throws IOException {
        // 토큰이 없을때 터짐
        response.setStatus(status.value());
        response.setContentType("application/json; charset=UTF-8");
        response.getWriter().write(objectMapper.writeValueAsString(BasicResponse.Body(ResponseCode.UNAUTHORIZED, "토큰이 만료되었습니다.")));
    }
}
