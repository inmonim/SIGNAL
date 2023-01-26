package com.ssafysignal.api.user.controller;

import com.ssafysignal.api.global.exception.NotFoundException;
import com.ssafysignal.api.global.response.BasicResponse;
import com.ssafysignal.api.global.response.ResponseCode;
import com.ssafysignal.api.user.dto.response.FindUserRes;
import com.ssafysignal.api.user.dto.response.UserFindAllResponse;
import com.ssafysignal.api.user.entity.User;
import com.ssafysignal.api.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@Tag(name = "회원", description = "회원에 대한 정보를 CRUD 할 수 있는 컨트롤러")
@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @Tag(name = "회원")
    @Operation(summary = "특정 회원 조회", description = "userSeq를 기준으로 특정 회원을 조회한다.")
    @GetMapping("/{userSeq}")
    private ResponseEntity<BasicResponse> findUser(@Parameter(description = "회원 Seq", required = true) @PathVariable int userSeq) {
        log.info("findUser - Call");
        FindUserRes resDto= userService.findUser(userSeq);
        
        return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, resDto));
    }

    @Tag(name = "회원")
    @Operation(summary = "회원가입", description = "입력된 정보로 회원가입한다.")
    @PostMapping("")
    private ResponseEntity<BasicResponse> registUser(@RequestBody User user) {
        log.info("joinUser - Call");
        System.out.println(user);
        User dto=null;
        try {
            dto = userService.registUser(user);
        } catch (Exception e){
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.MAILSEND_FAIL, null));
        }

        return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, dto));
    }


}
