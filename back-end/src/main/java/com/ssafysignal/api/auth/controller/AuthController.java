package com.ssafysignal.api.auth.controller;

import com.ssafysignal.api.auth.dto.request.FindEmailRequest;
import com.ssafysignal.api.auth.dto.response.CheckRes;
import com.ssafysignal.api.auth.service.AuthService;
import com.ssafysignal.api.global.exception.NotFoundException;
import com.ssafysignal.api.global.response.BasicResponse;
import com.ssafysignal.api.global.response.ResponseCode;
import com.ssafysignal.api.user.entity.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Tag(name = "인증", description = "회원 인증 및 인가 API")
@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    @Tag(name = "인증")
    @Operation(summary = "로그인", description = "이메일 비밀번호를 통해 로그인한다.")
    @PostMapping("/auth")
    private ResponseEntity<BasicResponse> login(@Parameter(description = "이메일", required = true) @RequestParam String email,
                                                @Parameter(description = "비밀번호", required = true) @RequestParam String password) {
        log.info("login - Call");

        try {
            log.info(String.format("email : %s / password : %s", email, password));
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, true));
        } catch (NotFoundException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getErrorCode(), false));
        }
    }

    @Tag(name = "인증")
    @Operation(summary = "로그아웃", description = "사용자 Seq를 이용해 로그아웃한다.")
    @PostMapping("/auth/{userSeq}")
    private ResponseEntity<BasicResponse> logout(@Parameter(description = "사용자 Seq", required = true) @PathVariable("userSeq") Integer userSeq) {
        log.info("logout - Call");

        try {
            log.info("userSeq : " + userSeq);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, true));
        } catch (NotFoundException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getErrorCode(), false));
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
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getErrorCode(), false));
        }        
    }

    @Tag(name = "인증")
    @Operation(summary = "닉네임 중복 확인", description = "닉네임이 중복되는지 확인한다.")
    @GetMapping("/nickname/{nickname}")
    private ResponseEntity<BasicResponse> checkNickname(@Parameter(description = "닉네임", required = true) @PathVariable String nickname) {
        log.info("checkEmail - Call");

        try {
            authService.checkNickname(nickname);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, true));
        } catch (NotFoundException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getErrorCode(), false));
        }
    }

    @Tag(name = "인증")
    @Operation(summary = "이메일 찾기", description = "이름과 전화번호로 이메일을 찾는다.")
    @PostMapping ("/email")
    private ResponseEntity<BasicResponse> findEmail(@RequestBody FindEmailRequest findEmailRequest) {
        log.info("findEmail - Call");

        try {
            String email = authService.findEmail(findEmailRequest);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, email));
        } catch (NotFoundException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getErrorCode(), null));
        }
    }

    @Tag(name = "인증")
    @Operation(summary = "이메일 인증", description = "사용자를 이메일 인증 처리한다.")
    @GetMapping("/emailAuth/{authCode}")
    private ResponseEntity<BasicResponse> emailAuth(@Parameter(description = "인증 코드", required = true) @PathVariable String authCode) {
        log.info("emailAuth - Call");

        try {
            authService.emailAuth(authCode);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, true));
        } catch (NotFoundException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getErrorCode(), false));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.UNAUTHORIZED, null));
        }
    }

    @Tag(name = "인증")
    @Operation(summary = "비밀번호 찾기", description = "이메일로 비밀번호를 변경할 수 있는 링크를 전송한다.")
    @PostMapping ("/password/email")
    private ResponseEntity<BasicResponse> findPassword(@RequestParam String email) {
        log.info("findPassword - Call");

        try {
            authService.findPassword(email);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, email));
        } catch (NotFoundException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getErrorCode(), null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.MAILSEND_FAIL, null));
        }
    }
}
