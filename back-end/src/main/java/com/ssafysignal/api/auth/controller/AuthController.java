package com.ssafysignal.api.auth.controller;

import com.ssafysignal.api.auth.dto.response.CheckRes;
import com.ssafysignal.api.auth.dto.response.FindEmailRes;
import com.ssafysignal.api.auth.service.AuthService;
import com.ssafysignal.api.global.response.BasicHeader;
import com.ssafysignal.api.global.response.BasicResponse;
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
@Tag(name = "인증", description = "회원 인증 및 확인이 가능한 controller")
@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    AuthService service;

    @Operation(summary = "email 중복 확인", description = "해당 email의 유저가 있는지 확인.")
    @GetMapping("/{email}")
    private ResponseEntity<BasicResponse> checkEmail(@Parameter(description = "이메일", required = true) @PathVariable String email) {
        log.info("findUser - Call");
        System.out.println(email);

        CheckRes resDto = new CheckRes("absence"); //임시로 무조건 가능하게 해둠
        return ResponseEntity.ok().body(BasicResponse.Body("success", "공고 조회 성공", resDto));
        
    }


    @Operation(summary = "email 찾기", description = "이름과 전화번호로 이메일 찾기")
    @PostMapping ("/email")
    private ResponseEntity<BasicResponse> findEmail(@RequestBody Map<String, Object> requestData) {
        log.info("findUser - Call");
        String name = (String)requestData.get("name");
        String phone = (String)requestData.get("phone");

        FindEmailRes resDto = service.findEmail(name,phone);
        
        if(resDto == null){ //해당 이메일 없음
            return ResponseEntity.ok().body(BasicResponse.Body("success", "해당 정보의 이메일이 없습니다.", null));
        }
        return ResponseEntity.ok().body(BasicResponse.Body("success", "해당 정보의 이메일이 있습니다.", resDto));

    }
    
}
