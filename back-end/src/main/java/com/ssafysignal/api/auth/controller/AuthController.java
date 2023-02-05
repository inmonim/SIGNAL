package com.ssafysignal.api.auth.controller;

import com.ssafysignal.api.auth.dto.request.FindEmailRequest;
import com.ssafysignal.api.auth.dto.request.UserLoginRequest;
import com.ssafysignal.api.auth.dto.response.LoginResponse;
import com.ssafysignal.api.auth.service.AuthService;
import com.ssafysignal.api.global.exception.NotFoundException;
import com.ssafysignal.api.global.exception.UnAuthException;
import com.ssafysignal.api.global.jwt.JwtTokenUtil;
import com.ssafysignal.api.global.jwt.TokenInfo;
import com.ssafysignal.api.global.response.BasicResponse;
import com.ssafysignal.api.global.response.ResponseCode;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Tag(name = "인증", description = "회원 인증 및 인가 API")
    @RestController
    @RequestMapping("/auth")
    public class AuthController {
    private final AuthService authService;
    private final JwtTokenUtil jwtTokenUtil;

    @Value("${server.host}")
    private String host;

    @Tag(name = "인증")
    @Operation(summary = "로그인", description = "이메일 비밀번호를 통해 로그인한다.")
    @PostMapping("/login")
    private ResponseEntity<BasicResponse> login(@Parameter(description = "로그인 정보", required = true) @RequestBody UserLoginRequest userLoginRequest) {
        log.info("login - Call");

        try {
            String email = userLoginRequest.getEmail();
            String password = userLoginRequest.getPassword();
            LoginResponse loginResponse = authService.login(email, password);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, loginResponse));
        } catch (NotFoundException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getErrorCode(), null));
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.UNAUTHORIZED, null));
        }
    }
    
    @Tag(name = "인증")
    @Operation(summary = "재인증", description = "리프레시 토큰을 이용해 엑세스 토큰을 재발급한다.")
    @PostMapping("/refresh")
    private ResponseEntity<BasicResponse> reissue(@RequestHeader(value = "RefreshToken",required = false) String refreshToken) {
        log.info("reissue - Call");

        try {
            LoginResponse loginResponse = authService.reissue(refreshToken);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, loginResponse));
        } catch (UnAuthException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getErrorCode(), null));
        } catch (NotFoundException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getErrorCode(), null));
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.UNAUTHORIZED, null));
        }
    }

    @Tag(name = "인증")
    @Operation(summary = "로그아웃", description = "사용자 Seq를 이용해 로그아웃한다.")
    @PostMapping("/logout")
    private ResponseEntity<BasicResponse> logout(@RequestHeader(value = "Authorization", required = false) String accessToken,
                                                 @RequestHeader(value = "RefreshToken", required = false) String refreshToken) {
        log.info("logout - Call");
        try {
            String email = jwtTokenUtil.getUsername(refreshToken.substring(7));
            authService.logout(TokenInfo.of(accessToken, refreshToken), email);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, true));
        } catch (UnAuthException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getErrorCode(), null));
        } catch (NotFoundException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getErrorCode(), false));
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.UNAUTHORIZED, null));
        }
    }


    @Tag(name = "인증")
    @Operation(summary = "이메일 중복 확인", description = "이메일이 중복되는지 확인한다.")
    @GetMapping("/email/{email}")
    private ResponseEntity<BasicResponse> checkEmail(@Parameter(description = "이메일", required = true) @PathVariable String email) {
        log.info("checkEmail - Call");

        try {
            authService.checkEmail(email);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, true));
        } catch (NotFoundException e) {
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, false));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.NOT_FOUND, null));
        }
    }

    @Tag(name = "인증")
    @Operation(summary = "닉네임 중복 확인", description = "닉네임이 중복되는지 확인한다.")
    @GetMapping("/nickname/{nickname}")
    private ResponseEntity<BasicResponse> checkNickname(@Parameter(description = "닉네임", required = true) @PathVariable String nickname) {
        log.info("checkNickname - Call");

        try {
            authService.checkNickname(nickname);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, true));
        } catch (NotFoundException e) {
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, false));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.NOT_FOUND, null));
        }
    }

    @Tag(name = "인증")
    @Operation(summary = "이메일 찾기", description = "이름과 전화번호로 이메일을 찾는다.")
    @PostMapping ("/email")
    private ResponseEntity<BasicResponse> findEmail(@RequestBody FindEmailRequest findEmailRequest) {
        log.info("findEmail - Call");

        try {
            String email = authService.findEmail(findEmailRequest);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, new HashMap<String, String>() {{ put("email", email); }}));
        } catch (NotFoundException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getErrorCode(), null));
        }
    }

    @Tag(name = "인증")
    @Operation(summary = "이메일 인증", description = "회원가입 사용자 이메일 인증 처리한다.")
    @GetMapping("/emailauth/{authCode}")
    private ResponseEntity<BasicResponse> emailAuth(@Parameter(description = "인증 코드", required = true) @PathVariable String authCode,
                                                    HttpServletResponse response) {
        log.info("emailAuth - Call");

        try {
            authService.emailAuth(authCode);
            response.sendRedirect(host);
        } catch (NotFoundException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getErrorCode(), false));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.UNAUTHORIZED, null));
        } finally {
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, true));
        }
    }

    @Tag(name = "인증")
    @Operation(summary = "비밀번호 찾기", description = "비밀번호 변경을 위한 이메일을 인증한다.")
    @PostMapping ("/password")
    private ResponseEntity<BasicResponse> findPassword(@Parameter(description = "이메일", required = true) @RequestBody Map<String, Object> param,
                                                       HttpServletResponse response) {
        log.info("findPassword - Call");

        try {
            String email = String.valueOf(param.get("email"));
            authService.findPassword(email);
            response.sendRedirect(host);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, true));
        } catch (NotFoundException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getErrorCode(), null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.MAILSEND_FAIL, null));
        }
    }

    @Tag(name = "인증")
    @Operation(summary = "임시 비밀번호 받기", description = "authCode를 확인하고 해당되는 이메일로 임시비밀번호 생성해서 전송한다.")
    @GetMapping("/password/{authCode}")
    private ResponseEntity<BasicResponse> getPasswordByEmail(@Parameter(description = "인증 코드", required = true) @PathVariable("authCode") String authCode) {
        log.info("getPasswordByEmail - Call");

        try {
            authService.getPasswordByEmail(authCode);
        } catch (NotFoundException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getErrorCode(), null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.UNAUTHORIZED, null));
        } finally {
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, true));
        }
    }
}
