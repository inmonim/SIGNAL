package com.ssafysignal.api.profile.controller;

import com.ssafysignal.api.global.exception.NotFoundException;
import com.ssafysignal.api.global.response.BasicResponse;
import com.ssafysignal.api.global.response.ResponseCode;
import com.ssafysignal.api.profile.dto.response.ProfileFindResponse;
import com.ssafysignal.api.profile.service.ProfileService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Tag(name = "마이프로필", description = "마이프로필 API")
@RestController
@RequestMapping("/profile")
public class ProfileController {

    private final ProfileService profileService;

    @Tag(name = "마이프로필")
    @Operation(summary = "프로필 상세 조회", description = "프로필을 상세 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "공고 취소 완료"),
            @ApiResponse(responseCode = "400", description = "공고 취소 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요"),
            @ApiResponse(responseCode = "403", description = "권한 없음")})
    @GetMapping("/{userSeq}")
    private ResponseEntity<BasicResponse> findProfile(@Parameter(name = "사용자 Seq", required = true) @PathVariable("userSeq") Integer userSeq){
        log.info("findProfile - Call");

        try {
            ProfileFindResponse profileFindResponse = profileService.findProfile(userSeq);
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.SUCCESS, profileFindResponse));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.NOT_FOUND, null));
        }
    }

    @Tag(name = "마이프로필")
    @Operation(summary = "프로필 포지션 등록", description = "프로필 포지션을 등록한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "공고 취소 완료"),
            @ApiResponse(responseCode = "400", description = "공고 취소 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요"),
            @ApiResponse(responseCode = "403", description = "권한 없음")})
    @PostMapping("/position/{userSeq}")
    private ResponseEntity<BasicResponse> RegistrofilePostion(@Parameter(name = "사용자 Seq", required = true) @PathVariable("userSeq") Integer userSeq,
                                                              @Parameter(name = "포지션 코드", required = true) @RequestBody Map<String, Object> param){
        log.info("RegistrofilePostion - Call");

        try {
            log.info(userSeq + " " + param.get("positionCode").toString());
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        } catch (NotFoundException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getErrorCode(), null));
        }
    }

}
