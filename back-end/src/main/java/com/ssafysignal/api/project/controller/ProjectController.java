package com.ssafysignal.api.project.controller;

import com.ssafysignal.api.global.exception.NotFoundException;
import com.ssafysignal.api.global.response.BasicResponse;
import com.ssafysignal.api.global.response.ResponseCode;
import com.ssafysignal.api.project.dto.reponse.FindEvaluationResponse;
import com.ssafysignal.api.project.dto.reponse.ProjectFindAllResponse;
import com.ssafysignal.api.project.dto.reponse.ProjectFindResponse;
import com.ssafysignal.api.project.service.ProjectService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Tag(name = "프로젝트", description = "프로젝트 API")
@RestController
@RequestMapping("/project")
public class ProjectController {

    private final ProjectService projectService;

    @Tag(name = "프로젝트")
    @Operation(summary = "프로젝트 생성", description = "프로젝트를 생성 한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "프로젝트 생성 완료"),
            @ApiResponse(responseCode = "400", description = "프로젝트 생성 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요"),
            @ApiResponse(responseCode = "403", description = "권한 없음")})
    @PostMapping("/{postingSeq}")
    private ResponseEntity<BasicResponse> registProject(@Parameter(description = "프로젝트 생성을 위한 프로젝트 Seq") @PathVariable("postingSeq") Integer postingSeq) {
        log.info("registProject - Call");

        System.out.println("postingSeq = " + postingSeq);

        try {
            projectService.registProject(postingSeq);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        } catch (NotFoundException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getErrorCode(), null));
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.REGIST_FAIL, null));
        }
    }

    @Tag(name = "프로젝트")
    @Operation(summary = "프로젝트 목록 조회", description = "프로젝트 목록을 조회 한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "프로젝트 목록 조회 완료"),
            @ApiResponse(responseCode = "400", description = "프로젝트 목록 조회 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요"),
            @ApiResponse(responseCode = "403", description = "권한 없음")})
    @GetMapping("/{userSeq}")
    private ResponseEntity<BasicResponse> findAllProject(@Parameter(description = "사용자 Seq") @PathVariable("userSeq") Integer userSeq) {
        log.info("findAllProject - Call");

        try {
            ProjectFindAllResponse projectFindAllResponse = projectService.findAllProject(userSeq);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, projectFindAllResponse));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.LIST_NOT_FOUND, null));
        }
    }

    @Tag(name = "프로젝트")
    @Operation(summary = "프로젝트 상세 조회", description = "프로젝트 상세 조회를 한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "프로젝트 목록 조회 완료"),
            @ApiResponse(responseCode = "400", description = "프로젝트 목록 조회 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요")})
    @GetMapping("")
    private ResponseEntity<BasicResponse> findProject(@Parameter(name = "userSeq", description = "사용자 Seq") Integer userSeq,
                                                      @Parameter(name = "projectSeq", description = "프로젝트 Seq") Integer projectSeq) {
        log.info("findProject - Call");

        try {
            ProjectFindResponse projectFindResponse = projectService.findProject(userSeq, projectSeq);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, projectFindResponse));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.NOT_FOUND, null));
        }
    }

    @Tag(name = "프로젝트")
    @Operation(summary = "프로젝트 완료", description = "프로젝트를 완료 상태로 변경 한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "프로젝트를 완료 상태로 변경 완료"),
            @ApiResponse(responseCode = "400", description = "프로젝트를 완료 상태로 변경 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요"),
            @ApiResponse(responseCode = "403", description = "권한 없음")})
    @PutMapping("/{projectSeq}")
    private ResponseEntity<BasicResponse> finishProject(@Parameter(name = "projectSeq", description = "프로젝트 Seq") @PathVariable(name = "projectSeq") Integer projectSeq) {
        log.info("finishProject - Call");

        try {
            projectService.finishProject(projectSeq);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        } catch (NotFoundException e){
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.MODIFY_NOT_FOUND, null));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.MODIFY_FAIL, null));
        }
    }

}
