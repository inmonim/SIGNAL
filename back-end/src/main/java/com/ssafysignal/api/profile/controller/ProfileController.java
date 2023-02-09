package com.ssafysignal.api.profile.controller;

import com.ssafysignal.api.global.exception.NotFoundException;
import com.ssafysignal.api.global.response.BasicResponse;
import com.ssafysignal.api.global.response.ResponseCode;
import com.ssafysignal.api.profile.dto.response.HeartLogAllResponse;
import com.ssafysignal.api.profile.dto.response.ProfileBasicResponse;
import com.ssafysignal.api.profile.entity.UserHeartLog;
import com.ssafysignal.api.profile.service.ProfileService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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
    private ResponseEntity<BasicResponse> findProfile(@Parameter(name = "userSeq", description = "사용자 Seq", required = true) @PathVariable("userSeq") Integer userSeq){
        log.info("findProfile - Call");

        try {
            ProfileBasicResponse profileBasicResponse = profileService.findProfile(userSeq);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, profileBasicResponse));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.NOT_FOUND, null));
        }
    }

    
    // ==================== 포지션 ====================

    @Tag(name = "마이프로필")
    @Operation(summary = "프로필 포지션 등록", description = "프로필 포지션을 등록한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "포지션 등록 완료"),
            @ApiResponse(responseCode = "400", description = "포지션 등록 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요"),
            @ApiResponse(responseCode = "403", description = "권한 없음")})
    @PostMapping("/position/{userSeq}")
    private ResponseEntity<BasicResponse> RegistPosition(@Parameter(name = "userSeq", description = "사용자 Seq", required = true) @PathVariable("userSeq") Integer userSeq,
                                                              @Parameter(description = "포지션 코드", required = true) @RequestBody Map<String, Object> param){
        log.info("RegistPosition - Call");

        try {
            log.info(userSeq + " " + param.get("positionCode").toString());
            profileService.registPosition(userSeq, param);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.REGIST_FAIL, null));
        }
    }


    @Tag(name = "마이프로필")
    @Operation(summary = "프로필 포지션 목록 조회", description = "프로필의 포지션 목록을 조회한다")
    @GetMapping("position/{userSeq}")
    private ResponseEntity<BasicResponse> findAllPosition(@Parameter(name = "userSeq", description = "사용자 seq", required = true) @PathVariable("userSeq") Integer userSeq) {
        log.info("findAllPosition - Call");

        try {
            ProfileBasicResponse positionList = profileService.findAllPosition(userSeq);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, positionList));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.NOT_FOUND, null));
        }
    }


    @Tag(name = "마이프로필")
    @Operation(summary = "프로필 포지션 삭제", description = "프로필의 포지션을 삭제한다")
    @DeleteMapping("position/{userPositionSeq}")
    private ResponseEntity<BasicResponse> deletePosition(@Parameter(name = "userSeq", description = "사용자 포지션 seq", required = true) @PathVariable("userPositionSeq") Integer userPositionSeq) {
        log.info("deletePosition - Call");

        try {
            profileService.deletePosition(userPositionSeq);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.DELETE_FAIL, null));
        }
    }


    // ==================== 기술스택 ====================
    
    @Tag(name = "마이프로필")
    @Operation(summary = "프로필 기술스택 등록", description = "프로필 기술스택을 등록한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "기술스택 등록 완료"),
            @ApiResponse(responseCode = "400", description = "기술스택 등록 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요"),
            @ApiResponse(responseCode = "403", description = "권한 없음")})
    @PostMapping("/skill/{userSeq}")
    private ResponseEntity<BasicResponse> RegistProfileSKill(@Parameter(name = "userSeq", description = "사용자 Seq", required = true) @PathVariable("userSeq") Integer userSeq,
                                                                @Parameter(description = "스킬 코드", required = true) @RequestBody Map<String, Object> param){
        log.info("RegistProfileSkill - Call");

        try {
            log.info(userSeq + " " + param.get("skillCode").toString());
            profileService.registSkill(userSeq, param);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        } catch (NotFoundException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getErrorCode(), null));
        }
    }


    @Tag(name = "마이프로필")
    @Operation(summary = "프로필 기술스택 목록 조회", description = "프로필 기술스택 목록을 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "프로필 기술스택 목록 조회 완료"),
            @ApiResponse(responseCode = "400", description = "프로필 기술스택 목록 조회 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요"),
            @ApiResponse(responseCode = "403", description = "권한 없음")})
    @GetMapping("/skill/{userSeq}")
    private ResponseEntity<BasicResponse> findAllSkill(@Parameter(name = "userSeq", description = "사용자 Seq", required = true) @PathVariable("userSeq") Integer userSeq){
        log.info("findAllSkill - Call");

        try {
            ProfileBasicResponse profileBasicResponse = profileService.findAllSkill(userSeq);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, profileBasicResponse));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.NOT_FOUND, null));
        }
    }

    
    @Tag(name = "마이프로필")
    @Operation(summary = "프로필 스킬 삭제", description = "프로필의 스킬을 삭제한다")
    @DeleteMapping("skill/{userSkillSeq}")
    private ResponseEntity<BasicResponse> deleteSkill(@Parameter(name = "userSkillSeq", description = "사용자 스킬 seq", required = true) @PathVariable("userSkillSeq") Integer userSkillSeq) {
        log.info("deleteSkill - Call");

        try {
            profileService.deleteSkill(userSkillSeq);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.DELETE_FAIL, null));
        }
    }

    
    // ==================== 경력 ====================

    @Tag(name = "마이프로필")
    @Operation(summary = "프로필 경력 등록", description = "프로필 경력을 등록한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "경력 등록 완료"),
            @ApiResponse(responseCode = "400", description = "경력 등록 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요"),
            @ApiResponse(responseCode = "403", description = "권한 없음")})
    @PostMapping("/career/{userSeq}")
    private ResponseEntity<BasicResponse> RegistProfileCareer(@Parameter(name = "userSeq", description = "사용자 Seq", required = true) @PathVariable("userSeq") Integer userSeq,
                                                             @Parameter(description = "경력", required = true) @RequestBody Map<String, Object> param){
        log.info("RegistProfileCareer - Call");

        try {
            log.info(userSeq + " Career");
            profileService.registCareer(userSeq, param);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        } catch (NotFoundException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getErrorCode(), null));
        }
    }


    @Tag(name = "마이프로필")
    @Operation(summary = "프로필 경력 목록 조회", description = "프로필 경력 목록을 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "프로필 경력 목록 조회 완료"),
            @ApiResponse(responseCode = "400", description = "프로필 경력 목록 조회 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요"),
            @ApiResponse(responseCode = "403", description = "권한 없음")})
    @GetMapping("/career/{userSeq}")
    private ResponseEntity<BasicResponse> findAllCareer(@Parameter(name = "userPositionSeq", description = "사용자 Seq", required = true) @PathVariable("userSeq") Integer userSeq){
        log.info("findAllSkill - Call");

        try {
            ProfileBasicResponse profileBasicResponse = profileService.findAllCareer(userSeq);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, profileBasicResponse));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.NOT_FOUND, null));
        }
    }


    @Tag(name = "마이프로필")
    @Operation(summary = "프로필 경력 삭제", description = "프로필의 경력을 삭제한다")
    @DeleteMapping("career/{userCareerSeq}")
    private ResponseEntity<BasicResponse> deleteCareer(@Parameter(name = "userCareerSeq", description = "사용자 경력 seq", required = true) @PathVariable("userCareerSeq") Integer userCareerSeq) {
        log.info("deleteCareer - Call");

        try {
            profileService.deleteCareer(userCareerSeq);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.DELETE_FAIL, null));
        }
    }


    // ==================== 경험 ====================

    @Tag(name = "마이프로필")
    @Operation(summary = "프로필 경험 등록", description = "프로필 경험을 등록한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "경험 등록 완료"),
            @ApiResponse(responseCode = "400", description = "경험 등록 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요"),
            @ApiResponse(responseCode = "403", description = "권한 없음")})
    @PostMapping("/exp/{userSeq}")
    private ResponseEntity<BasicResponse> RegistProfileExp(@Parameter(name = "userSeq", description = "사용자 Seq", required = true) @PathVariable("userSeq") Integer userSeq,
                                                              @Parameter(description = "경력", required = true) @RequestBody Map<String, Object> param){
        log.info("RegistProfileExp - Call");

        try {
            log.info(userSeq + " Exp");
            profileService.registExp(userSeq, param);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        } catch (NotFoundException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getErrorCode(), null));
        }
    }


    @Tag(name = "마이프로필")
    @Operation(summary = "프로필 경험 목록 조회", description = "프로필 경험 목록을 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "프로필 경험 목록 조회 완료"),
            @ApiResponse(responseCode = "400", description = "프로필 경험 목록 조회 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요"),
            @ApiResponse(responseCode = "403", description = "권한 없음")})
    @GetMapping("/exp/{userSeq}")
    private ResponseEntity<BasicResponse> findAllExp(@Parameter(name = "userSeq", description = "사용자 Seq", required = true) @PathVariable("userSeq") Integer userSeq){
        log.info("findAllSkill - Call");

        try {
            ProfileBasicResponse profileBasicResponse = profileService.findAllExp(userSeq);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, profileBasicResponse));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.NOT_FOUND, null));
        }
    }


    @Tag(name = "마이프로필")
    @Operation(summary = "프로필 경험 삭제", description = "프로필의 경험을 삭제한다")
    @DeleteMapping("exp/{userExpSeq}")
    private ResponseEntity<BasicResponse> deleteExp(@Parameter(name = "userExpSeq", description = "사용자 경력험 seq", required = true) @PathVariable("userExpSeq") Integer userExpSeq) {
        log.info("deleteExp - Call");

        try {
            profileService.deleteExp(userExpSeq);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.DELETE_FAIL, null));
        }
    }

    // ========== 하트 ==========

    @Tag(name = "마이프로필")
    @Operation(summary = "하트 충전", description = "하트를 충전한다")
    @PostMapping("heart/{userSeq}")
    private ResponseEntity<BasicResponse> chargeHeart(@Parameter(name = "userSeq", description = "사용자의 seq", required = true) @PathVariable("userSeq") Integer userSeq,
                                                      @Parameter(description = "충전할 하트 갯수") @RequestBody Map<String, Object> param) {
        log.info("chargeHeart - Call");

        try {
            profileService.chargeHeart(userSeq, param);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        } catch (NotFoundException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.NOT_FOUND, null));
        }
    }


    @Tag(name = "마이프로필")
    @Operation(summary = "하트 로그 목록 조회", description = "하트 충전 및 사용 내력을 조회한다")
    @GetMapping("heart/{userSeq}")
    private ResponseEntity<BasicResponse> findAllHeartLog(@Parameter(name="size", required = true) Integer size,
                                                          @Parameter(name="page", required = true) Integer page,
                                                          @Parameter(name="userSeq", description = "사용자의 seq", required = true) @PathVariable("userSeq") Integer userSeq) {
        log.info("findAllHeartLog - Call");

        try {
            HeartLogAllResponse userHeartLogList = profileService.findAllUserHeartLog(page, size, userSeq);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, userHeartLogList));
        } catch (NotFoundException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.NOT_FOUND, null));
        }
    }

}
