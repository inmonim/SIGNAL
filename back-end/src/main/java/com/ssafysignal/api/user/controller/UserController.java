package com.ssafysignal.api.user.controller;

import com.ssafysignal.api.global.exception.NotFoundException;
import com.ssafysignal.api.global.response.BasicResponse;
import com.ssafysignal.api.global.response.ResponseCode;
import com.ssafysignal.api.user.dto.request.UserInfo;
import com.ssafysignal.api.user.dto.request.RegistUserRequest;
import com.ssafysignal.api.user.dto.response.FindUserResponse;
import com.ssafysignal.api.user.entity.User;
import com.ssafysignal.api.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Tag(name = "회원", description = "회원에 대한 정보를 CRUD 할 수 있는 컨트롤러")
@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @Tag(name = "회원")
    @Operation(summary = "회원 가입", description = "입력된 정보로 회원가입한다.")
    @PostMapping("")
    private ResponseEntity<BasicResponse> registUser(@Parameter(description = "회원 가입 정보", required = true) @RequestBody RegistUserRequest registUserRequest) {
        log.info("registUser - Call");

        try {
            log.info(registUserRequest.toString());
            userService.registUser(registUserRequest);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        } catch (Exception e){
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.REGIST_FAIL, null));
        }
    }

    @Tag(name = "회원")
    @Operation(summary = "회원 상세 조회", description = "userSeq를 기준으로 특정 회원을 조회한다.")
    @GetMapping("/{userSeq}")
    private ResponseEntity<BasicResponse> findUser(@Parameter(description = "회원 Seq", required = true) @PathVariable int userSeq) {
        log.info("findUser - Call");
        try {
            User user = userService.findUser(userSeq);
            FindUserResponse findUserResponse = FindUserResponse.builder()
                    .userSeq(user.getUserSeq())
                    .email(user.getEmail())
                    .nickname(user.getNickname())
                    .phone(user.getPhone())
                    .heartCnt(user.getHeartCnt())
                    .userImageUrl(user.getImageFile().getUrl())
                    .build();
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, findUserResponse));
        } catch (NotFoundException e) {
            return ResponseEntity.ok().body(BasicResponse.Body(e.getErrorCode(), null));
        } catch(RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.NOT_FOUND, null));
        }
    }

    @Tag(name = "회원")
    @Operation(summary = "회원 탈퇴", description = "회원의 권한을 탈퇴자로 변경.")
    @DeleteMapping("/{userSeq}")
    private ResponseEntity<BasicResponse> deleteUser(@Parameter(description = "회원 Seq", required = true) @PathVariable int userSeq) {
        log.info("deleteUser - Call");

        try {
            userService.deleteUser(userSeq);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        } catch (NotFoundException e){
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getErrorCode(), null));
        } catch (RuntimeException e){
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.DELETE_FAIL, null));
        }
    }

    @Tag(name = "회원")
    @Operation(summary = "회원 수정", description = "회원의 정보 변경.")
    @PostMapping("/{userSeq}")
    private ResponseEntity<BasicResponse> modifyUser(@Parameter(description = "회원 Seq", required = true) @PathVariable int userSeq,
                                                     @Parameter(description = "닉네임", required = true)  @RequestParam String nickname,
                                                     @Parameter(description = "전화번호", required = true)  @RequestParam String phone,
                                                     @Parameter(description = "회원 정보", required = true) @RequestPart(value = "profileImageFile", required = false) MultipartFile profileImageFile) {
        log.info("modifyUser - Call");

        UserInfo userInfo = UserInfo.builder()
                .nickname(nickname)
                .phone(phone)
                .profileImageFile(profileImageFile)
                .build();

        try {
            userService.modifyUser(userSeq, userInfo);
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.NOT_FOUND, null));
        }

        return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
    }

    @Tag(name = "회원")
    @Operation(summary = "비밀번호 변경", description = "회원의 비밀번호 변경.")
    @PutMapping("/password/{userSeq}")
    private ResponseEntity<BasicResponse> modifyUser(@Parameter(description = "회원 Seq", required = true) @PathVariable int userSeq,
                                                     @Parameter(description = "비밀번호", required = true)  @RequestBody Map<String,String> info){
        log.info("modifyPassword - Call");

        String password = info.get("password");
        String newPassword = info.get("newPassword");
        System.out.println(password);
        try {
            userService.modifyPassword(userSeq, password, newPassword);
        } catch (Exception e){
            System.out.println(e);
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.NOT_FOUND, null));
        }

        return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
    }

}
