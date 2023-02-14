package com.ssafysignal.api.project.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.ssafysignal.api.global.exception.NotFoundException;
import com.ssafysignal.api.global.response.BasicResponse;
import com.ssafysignal.api.global.response.ResponseCode;
import com.ssafysignal.api.project.dto.reponse.*;
import com.ssafysignal.api.project.dto.request.RegistProjectEvaluationRequest;
import com.ssafysignal.api.project.dto.request.ModifyProjectSettingRequest;
import com.ssafysignal.api.project.service.ProjectService;
import com.ssafysignal.api.project.service.ProjectSettingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Tag(name = "프로젝트", description = "프로젝트 API")
@RestController
@RequestMapping("/project")
public class ProjectSettingController {

    private final ProjectSettingService projectSettingService;

    private final ProjectService projectService;

    @Tag(name = "프로젝트")
    @Operation(summary = "프로젝트 설정 조회", description = "프로젝트 설정 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "프로젝트 설정 조회 완료"),
            @ApiResponse(responseCode = "400", description = "프로젝트 설정 조회 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요"),
            @ApiResponse(responseCode = "403", description = "권한 없음")})
    @GetMapping("/setting/{projectSeq}")
    private ResponseEntity<BasicResponse> findProjectSetting(@Parameter(name = "projectSeq", description = "프로젝트 Seq") @PathVariable(name = "projectSeq") Integer projectSeq) {
        log.info("findProjectSetting - Call");

        try {
            FindProjectSettingResponse findProjectSettingResponse = projectSettingService.findProjectSetting(projectSeq);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, findProjectSettingResponse));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.NOT_FOUND, null));
        }
    }

    @Tag(name = "프로젝트")
    @Operation(summary = "프로젝트 설정 수정", description = "프로젝트 설정을 수정한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "프로젝트 설정 수정 완료"),
            @ApiResponse(responseCode = "400", description = "프로젝트 설정 수정 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요"),
            @ApiResponse(responseCode = "403", description = "권한 없음")})
    @PostMapping("/setting/{projectSeq}")
    private ResponseEntity<BasicResponse> modifyProjectSetting(@Parameter(name = "projectSeq", description = "프로젝트 Seq") @PathVariable(name = "projectSeq") Integer projectSeq,
                                                               @Parameter(name = "uploadImage", description = "프로젝트 대표 이미지 파일") @RequestPart(value = "uploadImage", required = false) MultipartFile uploadImage,
                                                               @Parameter(name = "modifyData", description = "프로젝트 수정 정보") @RequestParam String modifyData) {
        log.info("modifyProjectSetting - Call");

        try {
            ObjectMapper objectMapper = new ObjectMapper().registerModule(new SimpleModule());
            ModifyProjectSettingRequest modifyProjectSettingRequest = objectMapper.readValue(modifyData, new TypeReference<ModifyProjectSettingRequest>() {});
            projectSettingService.modifyProjectSetting(projectSeq, uploadImage, modifyProjectSettingRequest);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        } catch (NotFoundException e){
            e.printStackTrace();
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getErrorCode(), null));
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.MODIFY_FAIL, null));
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.REGIST_FAIL, null));
        }
    }

    @Tag(name = "프로젝트")
    @Operation(summary = "프로젝트 팀 구성원 조회", description = "프로젝트 팀 구성원 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "프로젝트 팀 구성원 조회 완료"),
            @ApiResponse(responseCode = "400", description = "프로젝트 팀 구성원 조회 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요"),
            @ApiResponse(responseCode = "403", description = "권한 없음")})
    @GetMapping("/member/{projectSeq}")
    private ResponseEntity<BasicResponse> findProjectUser(@Parameter(name = "projectSeq", description = "프로젝트 Seq") @PathVariable(name = "projectSeq") Integer projectSeq) {
        log.info("findProjectUser - Call");

        try {
            List<FindAllProjectUserDto> findAllProjectUserDtoList = projectSettingService.findProjectUser(projectSeq);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, new HashMap<String, Object>(){{ put("projectUserList", findAllProjectUserDtoList); }}));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.NOT_FOUND, null));
        }
    }

    @Tag(name = "프로젝트")
    @Operation(summary = "프로젝트 팀원 퇴출", description = "프로젝트 팀원을 퇴출한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "프로젝트 팀원 퇴출 완료"),
            @ApiResponse(responseCode = "400", description = "프로젝트 팀원 퇴출 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요"),
            @ApiResponse(responseCode = "403", description = "권한 없음")})
    @DeleteMapping("/member")
    private ResponseEntity<BasicResponse> deleteProjectMember(@Parameter(name = "projectUserSeq", description = "팀원 Seq") @RequestParam Integer projectUserSeq) {
        log.info("deleteProjectMember - Call");

        try {
            projectSettingService.deleteProjectUser(projectUserSeq);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        } catch (NotFoundException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getErrorCode(), null));
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.DELETE_FAIL, null));
        }
    }
    @Tag(name = "프로젝트")
    @Operation(summary = "프로젝트 현재 주차 조회", description = "프로젝트 현재 주차 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "프로젝트 현재 주차 조회 완료"),
            @ApiResponse(responseCode = "400", description = "프로젝트 현재 주차 조회 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요"),
            @ApiResponse(responseCode = "403", description = "권한 없음")})
    @GetMapping("/weekCnt")
    private ResponseEntity<BasicResponse> countWeekCnt(@Parameter(name = "projectSeq", description = "프로젝트 Seq") @RequestParam Integer projectSeq) {
        log.info("countWeekCnt - Call");

        try {
            Integer weekCnt = projectSettingService.countWeekCnt(projectSeq);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, weekCnt));
        } catch (NotFoundException e){
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.NOT_FOUND, null));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.NOT_FOUND, null));
        }
    }

    @Tag(name = "프로젝트")
    @Operation(summary = "팀원 평가 항목 조회", description = "팀원 평가 항목을 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "팀원 평가 항목 조회 완료"),
            @ApiResponse(responseCode = "400", description = "팀원 평가 항목 조회 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요"),
            @ApiResponse(responseCode = "403", description = "권한 없음")})
    @GetMapping("/evaluation/{projectSeq}")
    private ResponseEntity<BasicResponse> findAllEvalution(@Parameter(name = "projectSeq", description = "프로젝트 Seq") @PathVariable(name = "projectSeq") Integer projectSeq) {
        log.info("findAllEvalution - Call");

        try {
            FindEvaluationResponse findEvaluationResponse = projectSettingService.findAllEvalution(projectSeq);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, findEvaluationResponse));
        } catch (NotFoundException e){
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.NOT_FOUND, null));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.NOT_FOUND, null));
        }
    }

    @Tag(name = "프로젝트")
    @Operation(summary = "프로젝트 평가 등록", description = "프로젝트 평가를 등록한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "프로젝트 평가 등록 완료"),
            @ApiResponse(responseCode = "400", description = "프로젝트 평가 등록 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요"),
            @ApiResponse(responseCode = "403", description = "권한 없음")})
    @PostMapping("/evaluation")
    private ResponseEntity<BasicResponse> registProjectUserEvaluation(@Parameter(name = "projectEvaluation", description = "프로젝트 평가 정보") @RequestBody RegistProjectEvaluationRequest registProjectEvaluationRequest) {
        log.info("registProjectUserEvaluation - Call");

        try {
            projectSettingService.registProjectUserEvaluation(registProjectEvaluationRequest);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        }  catch (NotFoundException e){
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getErrorCode(), null));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.NOT_FOUND, null));
        }
    }

    @Tag(name = "프로젝트")
    @Operation(summary = "프로젝트 평가 여부 확인", description = "프로젝트 평가 여부를 확인한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "프로젝트 평가 여부 확인 완료"),
            @ApiResponse(responseCode = "400", description = "프로젝트 평가 여부 확인 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요"),
            @ApiResponse(responseCode = "403", description = "권한 없음")})
    @GetMapping("/evaluation")
    private ResponseEntity<BasicResponse> findProjectUserEvaluation(@Parameter(name = "projectUserSeq", description = "평가하는 팀원") @RequestParam Integer projectUserSeq,
                                                                    @Parameter(name = "weekCnt", description = "평가 회차") @RequestParam Integer weekCnt) {
        log.info("findProjectUserEvaluation - Call");

        try {
            List<Integer> evaluationList = projectSettingService.findProjectUserEvaluation(projectUserSeq, weekCnt);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, new HashMap<String, Object>(){{ put("evaluationList", evaluationList); }}));
        }  catch (NotFoundException e){
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getErrorCode(), null));
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.LIST_NOT_FOUND, null));
        }
    }

    @Tag(name = "프로젝트")
    @Operation(summary = "프로젝트 평가 결과 확인", description = "프로젝트 평가 결과 확인한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "프로젝트 평가 결과 확인 완료"),
            @ApiResponse(responseCode = "400", description = "프로젝트 평가 결과 확인 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요"),
            @ApiResponse(responseCode = "403", description = "권한 없음")})
    @GetMapping("/evaluation/history")
    private ResponseEntity<BasicResponse> findProjectUserEvaluationHistory(@Parameter(name = "fromUserSeq", description = "평가 하는 팀원") @RequestParam Integer fromUserSeq,
                                                                           @Parameter(name = "toUserSeq", description = "평가 당했던 팀원") @RequestParam Integer toUserSeq,
                                                                           @Parameter(name = "weekCnt", description = "평가 회차") @RequestParam Integer weekCnt) {
        log.info("findProjectUserEvaluationResult - Call");

        try {
            List<FindProjectUserEvaluationHistoryResponse> evaluationHistoryList = projectSettingService.findProjectUserEvaluationHistory(fromUserSeq, toUserSeq, weekCnt);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, evaluationHistoryList));
        }  catch (NotFoundException e){
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getErrorCode(), null));
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.LIST_NOT_FOUND, null));
        }
    }

    @Tag(name = "프로젝트")
    @Operation(summary = "프로젝트 유저 하트 로그 목록 조회", description = "프로젝트에 참여햔 유저의 하트 로그 목록을 조회한다")
    @GetMapping("/heart/{userSeq}")
    private ResponseEntity<BasicResponse> findAllProjectUserHeartLog(@Parameter(name = "userSeq", description = "유저 seq") @PathVariable(name = "userSeq") Integer userSeq,
                                                                     @Parameter(name = "projectSeq") @RequestParam Integer projectSeq) {
        log.info("findAllProjectUserHeartLog - Call");

        try {
            FindAllProjectUserHeartLogResponse findAllProjectUserHeartLogResponse = projectService.findAllProjectUserHeartLog(userSeq, projectSeq);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, findAllProjectUserHeartLogResponse));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.NOT_FOUND, null));
        }
    }

    @Tag(name = "프로젝트")
    @Operation(summary = "프로젝트 유저 하트 조회", description = "프로젝트에 참여한 유저의 하트 개수를 조회한다")
    @GetMapping("/heartCnt/{userSeq}")
    private ResponseEntity<BasicResponse> findProjectUserHeartCnt(@Parameter(name = "userSeq", description = "유저 seq") @PathVariable(name = "userSeq") Integer userSeq,
                                                                  @Parameter(name = "projectSeq") @RequestParam Integer projectSeq) {
        log.info("findProjectUserHeartCnt");
        try {
            Integer projectUserCnt = projectService.findProjectUserHeartCnt(userSeq, projectSeq);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, projectUserCnt));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.NOT_FOUND, null));
        }
    }
}
