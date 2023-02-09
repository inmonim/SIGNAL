package com.ssafysignal.api.openprofile.controller;

import com.ssafysignal.api.global.exception.NotFoundException;
import com.ssafysignal.api.global.response.BasicResponse;
import com.ssafysignal.api.global.response.ResponseCode;
import com.ssafysignal.api.openprofile.dto.response.FindAllOpenProfileRes;
import com.ssafysignal.api.openprofile.service.OpenProfileService;
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
@Tag(name = "오픈 프로필", description = "오픈 프로필 API")
@RestController
@RequestMapping("/openprofile")
public class OpenProfileController {

    private final OpenProfileService openProfileService;
    @Tag(name = "오픈 프로필")
    @Operation(summary = "오픈 프로필 등록", description = "오픈 프로필을 등록한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "오픈프로필 등록 완료"),
            @ApiResponse(responseCode = "301", description = "오픈프로필 등록 중 유저 정보 오류 발생"),
            @ApiResponse(responseCode = "402", description = "오픈프로필 중복 등록 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요"),
            @ApiResponse(responseCode = "403", description = "권한 없음")})
    @PostMapping("/{userSeq}")
    private ResponseEntity<BasicResponse> registOpenProfile(@Parameter(name = "userSeq", description = "사용자 Seq", required = true) @PathVariable("userSeq") Integer userSeq){
        log.info("findProfile - Call");

        try {
            openProfileService.registOpenProfile(userSeq);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        } catch (NotFoundException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getErrorCode(), null));
        }
    }


    @Tag(name = "오픈 프로필")
    @Operation(summary = "오픈 프로필 조회", description = "오픈 프로필을 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "오픈프로필 조회 완료"),
            @ApiResponse(responseCode = "301", description = "오픈프로필 조회 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요"),
            @ApiResponse(responseCode = "403", description = "권한 없음")})
    @GetMapping("")
    private ResponseEntity<BasicResponse> findAllOpenProfile(@Parameter(description = "페이지", required = true) Integer page,
                                                             @Parameter(description = "사이즈", required = true) Integer size){
        log.info("findProfile - Call");

        try {
            FindAllOpenProfileRes openProfileListRes = openProfileService.findAllOpenProfile(size, page);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, openProfileListRes));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.NOT_FOUND, null));
        }
    }
}
