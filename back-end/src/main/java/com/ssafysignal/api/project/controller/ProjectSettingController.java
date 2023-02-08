package com.ssafysignal.api.project.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.ssafysignal.api.global.exception.NotFoundException;
import com.ssafysignal.api.global.response.BasicResponse;
import com.ssafysignal.api.global.response.ResponseCode;
import com.ssafysignal.api.project.dto.reponse.FindEvaluationResponse;
import com.ssafysignal.api.project.dto.reponse.ProjectApplyDto;
import com.ssafysignal.api.project.dto.reponse.ProjectSettingFindResponse;
import com.ssafysignal.api.project.dto.reponse.ProjectUserFindAllDto;
import com.ssafysignal.api.project.dto.request.ProjectEvaluationRegistRequest;
import com.ssafysignal.api.project.dto.request.ProjectSettingModifyRequest;
import com.ssafysignal.api.project.entity.ProjectUserHeartLog;
import com.ssafysignal.api.project.repository.ProjectUserHeartLogRepository;
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
    private final ProjectUserHeartLogRepository projectUserHeartLogRepository;

    private final ProjectSettingService projectSettingService;

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
            ProjectSettingFindResponse projectSettingFindResponse = projectSettingService.findProjectSetting(projectSeq);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, projectSettingFindResponse));
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
            ProjectSettingModifyRequest projectSettingModifyRequest = objectMapper.readValue(modifyData, new TypeReference<ProjectSettingModifyRequest>() {});
            projectSettingService.modifyProjectSetting(projectSeq, uploadImage, projectSettingModifyRequest);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        } catch (NotFoundException e){
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getErrorCode(), null));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.MODIFY_FAIL, null));
        } catch (IOException e) {
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
            List<ProjectUserFindAllDto> projectUserFindAllDtoList = projectSettingService.findProjectUser(projectSeq);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, new HashMap<String, Object>(){{ put("projectUserList", projectUserFindAllDtoList); }}));
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
    private ResponseEntity<BasicResponse> registProjectUserEvaluation(@Parameter(name = "projectEvaluation", description = "프로젝트 평가 정보") @RequestBody ProjectEvaluationRegistRequest projectEvaluationRegistRequest) {
        log.info("registProjectUserEvaluation - Call");

        try {
            projectSettingService.registProjectUserEvaluation(projectEvaluationRegistRequest);
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
                                                                    @Parameter(name = "termCnt", description = "평가 회차") @RequestParam Integer termCnt) {
        log.info("findProjectUserEvaluation - Call");

        try {
            List<Integer> evaluationList = projectSettingService.findProjectUserEvaluation(projectUserSeq, termCnt);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, new HashMap<String, Object>(){{ put("evaluationList", evaluationList); }}));
        }  catch (NotFoundException e){
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getErrorCode(), null));
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.LIST_NOT_FOUND, null));
        }
    }


    @Tag(name = "프로젝트")
    @Operation(summary = "프로젝트 유저 하트 로그 목록 조회", description = "프로젝트에 참여햔 유저의 하트 로그 목록을 조회한다")
    @GetMapping("/heart/{projectUserSeq}")
    private ResponseEntity<BasicResponse> findAllProjectUserHeartLog(@Parameter(name = "projectUserSeq", description = "하트 로그 목록 조회") @PathVariable(name = "projectUserSeq") Integer projectUserSeq) {
        log.info("findAllProjectUserHeartLog - Call");

        try {
            List<ProjectUserHeartLog> projectUserHeartLogList = projectUserHeartLogRepository.findAllByProjectUserSeq(projectUserSeq);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, projectUserHeartLogList));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.NOT_FOUND, null));
        }
    }
}
