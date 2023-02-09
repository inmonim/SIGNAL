package com.ssafysignal.api.admin.controller;

import com.ssafysignal.api.admin.dto.Response.FindAdminUserResponse;
import com.ssafysignal.api.admin.service.AdminUserService;
import com.ssafysignal.api.global.response.BasicResponse;
import com.ssafysignal.api.global.response.ResponseCode;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Tag(name = "관리자", description = "관리자 API")
@RestController
@RequestMapping("/admin/user")
public class AdminUserController {

    private final AdminUserService adminUserService;

    @Tag(name = "관리자")
    @Operation(summary = "회원 목록 조회", description = "회원 목록을 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "회원 목록을 조회 완료"),
            @ApiResponse(responseCode = "400", description = "회원 목록을 조회 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요")})
    @GetMapping("")
    private ResponseEntity<BasicResponse> findAllUser() {
        log.info("findAllUser - Call");

        try {
            List<FindAdminUserResponse> userList = adminUserService.findAllUser();
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, new HashMap<String, Object>() {{ put("userList", userList); }}));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.LIST_NOT_FOUND, null));
        }
    }
    @Tag(name = "관리자")
    @Operation(summary = "회원 밴 해제", description = "회원 밴을 해제한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "회원 밴을 해제 완료"),
            @ApiResponse(responseCode = "400", description = "회원 밴을 해제 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요")})
    @DeleteMapping("")
    private ResponseEntity<BasicResponse> deleteBanUser(@Parameter(name = "blackUserSeqList", description = "밴 해제 회원 Seq 목록", required = true) @RequestBody List<Integer> blackUserSeqList) {
        log.info("deleteBanUser - Call");

        try {
            adminUserService.deleteBanUser(blackUserSeqList);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.DELETE_FAIL, null));
        }
    }
}