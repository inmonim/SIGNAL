package com.ssafysignal.api.user.controller;

import com.ssafysignal.api.user.dto.Response.UserFindAllResponse;
import com.ssafysignal.api.user.entity.FindUserRes;
import com.ssafysignal.api.user.entity.User;
import com.ssafysignal.api.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@Tag(name = "회원", description = "회원에 대한 정보를 CRUD 할 수 있는 컨트롤러")
@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @Operation(summary = "전체 회원 조회", description = "페이지와 사이즈 기준으로 페이지 네이션을 통해 전체 회원 목록을 조회한다.")
    @GetMapping("")
    private ResponseEntity<UserFindAllResponse> findAllUsers(int page, int size) {

        log.info("findAllUsers - Call");

        return ResponseEntity.ok().body(userService.findAllUsers(page, size));
    }

    @Operation(summary = "특정 회원 조회", description = "회원 ID를 기준으로 특정 회원을 조회한다.")
    @GetMapping("/{userSeq}")
    private ResponseEntity<FindUserRes> findUser(@Parameter(description = "회원 Seq", required = true) @PathVariable int userSeq) {
        log.info("findUser - Call");
        FindUserRes dto= userService.findUser(userSeq);
        System.out.println(dto);
        return ResponseEntity.ok().body(dto);
    }


    @GetMapping("/all/{userSeq}")
    private ResponseEntity<User> findUserAllInfo(@Parameter(description = "회원 Seq", required = true) @PathVariable int userSeq) {
        log.info("findUserAllInfo - Call");
        User dto= userService.findUserAllInfo(userSeq);
        System.out.println(dto);
        return ResponseEntity.ok().body(dto);
    }
}
