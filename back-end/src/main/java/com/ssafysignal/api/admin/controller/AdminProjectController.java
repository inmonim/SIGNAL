package com.ssafysignal.api.admin.controller;

import com.ssafysignal.api.admin.service.AdminProjectService;
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

@Slf4j
@RequiredArgsConstructor
@Tag(name = "관리자", description = "관리자 API")
@RestController
@RequestMapping("/admin/project")
public class AdminProjectController {
    private final AdminProjectService adminProjectService;

    @Tag(name = "관리자")
    @Operation(summary = "프로젝트 목록 조회", description = "프로젝트 목록을 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "프로젝트 목록 조회 완료"),
            @ApiResponse(responseCode = "400", description = "프로젝트 목록 조회 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요")})
    @GetMapping("")
    private ResponseEntity<BasicResponse> findAllProject(@Parameter(description = "페이지", required = true) Integer page,
                                                         @Parameter(description = "사이즈", required = true) Integer size) {
        log.info("findAllProject - Call");

        try {
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, adminProjectService.findAllProject(page, size)));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.LIST_NOT_FOUND, null));
        }
    }
}