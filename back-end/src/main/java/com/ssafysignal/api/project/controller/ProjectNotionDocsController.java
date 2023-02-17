package com.ssafysignal.api.project.controller;

import com.ssafysignal.api.global.exception.NotFoundException;
import com.ssafysignal.api.global.response.BasicResponse;
import com.ssafysignal.api.global.response.ResponseCode;
import com.ssafysignal.api.project.entity.ProjectNotionDocs;
import com.ssafysignal.api.project.service.ProjectNotionDocsService;
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
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Tag(name = "노션", description = "프로젝트 노션에 대한 정보를 CRUD 할 수 있는 컨트롤러")
@RestController
@RequestMapping("/notiondocs")
public class ProjectNotionDocsController {

    private final ProjectNotionDocsService projectNotionDocsService;
    @Tag(name = "노션")
    @Operation(summary = "노션 문서 등록", description = "프로젝트에 노션 문서를 등록한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "노션 문서 등록 완료"),
            @ApiResponse(responseCode = "401", description = "로그인 필요"),
            @ApiResponse(responseCode = "403", description = "등록실패")})
    @PostMapping("/{projectSeq}")
    private ResponseEntity<BasicResponse> registNotionDocs(@Parameter(description = "프로젝트 Seq", required = true) @PathVariable int projectSeq,
                                                            @Parameter(description = "노션정보", required = true) @RequestBody Map<String,String> notionDocsInfo) {
        log.info("registNotionDocs - Call");
        String url = notionDocsInfo.get("url");
        Integer num = Integer.parseInt(notionDocsInfo.get("num"));

        try {
            projectNotionDocsService.registNotionDocs(projectSeq,url, num);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        } catch (Exception e){
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.REGIST_FAIL, null));
        }
    }

    @Tag(name = "노션")
    @Operation(summary = "노션 문서 수정", description = "프로젝트에 노션 문서를 수정한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "노션독스 수정 완료"),
            @ApiResponse(responseCode = "401", description = "로그인 필요"),
            @ApiResponse(responseCode = "501", description = "수정가능한 노션독스 없음"),
            @ApiResponse(responseCode = "502", description = "노션독스 수정 실패")})
    @PutMapping("/{notionDocsSeq}")
    private ResponseEntity<BasicResponse> modifyNotionDocs(@Parameter(description = "노션독스 Seq", required = true) @PathVariable int notionDocsSeq,
                                                           @Parameter(description = "노션정보", required = true) @RequestBody Map<String,String> notionDocsInfo) {
        log.info("modifyNotionDocs - Call");
        String url = notionDocsInfo.get("url");
        try {
            projectNotionDocsService.modifyNotionDocs(notionDocsSeq,url);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        }catch (NotFoundException e){
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getErrorCode(), null));
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.MODIFY_FAIL, null));
        }
    }

    @Tag(name = "노션")
    @Operation(summary = "노션 문서 삭제", description = "프로젝트에 노션 문서를 삭제한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "노션독스 삭제 완료"),
            @ApiResponse(responseCode = "401", description = "로그인 필요"),
            @ApiResponse(responseCode = "601", description = "존재하지않는 노션독스 삭제 에러"),
            @ApiResponse(responseCode = "602", description = "삭제 실패")})
    @DeleteMapping("/{notionDocsSeq}")
    private ResponseEntity<BasicResponse> deleteNotionDocs(@Parameter(description = "노션독스 Seq", required = true) @PathVariable int notionDocsSeq) {
        log.info("deleteNotionDocs - Call");

        try {
            projectNotionDocsService.deleteNotionDocs(notionDocsSeq);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        }catch (NotFoundException e){
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getErrorCode(), null));
        } catch (Exception e){
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.DELETE_FAIL, null));
        }
    }

    @Tag(name = "노션")
    @Operation(summary = "노션 문서 조회", description = "프로젝트의 노션 문서리스르를 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "노션독스 조회 완료"),
            @ApiResponse(responseCode = "401", description = "로그인 필요"),
            @ApiResponse(responseCode = "302", description = "조회 에러")})
    @GetMapping("/{projectSeq}")
    private ResponseEntity<BasicResponse> FindAllNotiondocs(@Parameter(description = "프로젝트 Seq", required = true) @PathVariable int projectSeq,
                                                            @Parameter(description = "문서 번호", required = true) @RequestParam int num) {
        log.info("FindAllNotiondocs - Call");

        try {
            ProjectNotionDocs projectNotionDocsList = projectNotionDocsService.findNotiondocs(projectSeq, num);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, projectNotionDocsList));
        } catch (Exception e){
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.LIST_NOT_FOUND, null));
        }
    }
}
