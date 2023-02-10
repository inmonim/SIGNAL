package com.ssafysignal.api.admin.controller;

import com.ssafysignal.api.admin.service.AdminNoticeService;
import com.ssafysignal.api.admin.service.AdminQnaService;
import com.ssafysignal.api.global.exception.NotFoundException;
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

import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Tag(name = "관리자", description = "관리자 API")
@RestController
@RequestMapping("/admin/qna")
public class AdminQnaController {

    private final AdminQnaService adminQnaService;

    @Tag(name = "관리자")
    @Operation(summary = "Faq 등록", description = "Faq를 등록한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Faq 등록 완료"),
            @ApiResponse(responseCode = "400", description = "Faq 등록 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요")})
    @GetMapping("/{qnaSeq}")
    private ResponseEntity<BasicResponse> registFaq(@Parameter(name = "qnaSeq", description = "Qna Seq", required = true) @PathVariable("qnaSeq") Integer qnaSeq,
                                                    @Parameter(name = "isTop", description = "상단 고정 여부", required = true) @RequestParam boolean isTop) {
        log.info("registFaq - Call");

        try {
            adminQnaService.registFaq(qnaSeq, isTop);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.REGIST_FAIL, null));
        }
    }
    @Tag(name = "관리자")
    @Operation(summary = "Qna 댓글 등록", description = "Qna 댓글을 등록한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Qna 댓글 등록 완료"),
            @ApiResponse(responseCode = "400", description = "Qna 댓글 등록 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요")})
    @PostMapping("/{qnaSeq}")
    private ResponseEntity<BasicResponse> registQna(@Parameter(name = "qnaSeq", description = "Qna Seq", required = true) @PathVariable("qnaSeq") Integer qnaSeq,
                                                    @Parameter(name = "registQnaComentRequest", description = "Qna 댓글 등록 정보", required = true) @RequestBody Map<String, Object> registQnaComentRequest) {
        log.info("registQna - Call");

        try {
            String content = (String) registQnaComentRequest.get("answer");

            adminQnaService.registQna(qnaSeq, content);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.REGIST_FAIL, null));
        }
    }
    @Tag(name = "관리자")
    @Operation(summary = "Qna 댓글 수정", description = "Qna 댓글을 수정한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Qna 댓글 수정 완료"),
            @ApiResponse(responseCode = "400", description = "Qna 댓글 수정 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요")})
    @PutMapping("/{qnaSeq}")
    private ResponseEntity<BasicResponse> modifyQna(@Parameter(name = "qnaSeq", description = "Qna Seq", required = true) @PathVariable("qnaSeq") Integer qnaSeq,
                                                    @Parameter(name = "registNoticeRequest", description = "Qna 댓글 수정 정보", required = true) @RequestBody Map<String, Object> modifyQnaComentRequest) {
        log.info("modifyQna - Call");

        try {
            String answer = (String) modifyQnaComentRequest.get("answer");

            adminQnaService.modifyQna(qnaSeq, answer);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        } catch (NotFoundException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.MODIFY_NOT_FOUND, null));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.MODIFY_FAIL, null));
        }
    }
    @Tag(name = "관리자")
    @Operation(summary = "Qna 댓글 삭제", description = "Qna 댓글을 삭제한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Qna 댓글 삭제 완료"),
            @ApiResponse(responseCode = "400", description = "Qna 댓글 삭제 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요")})
    @DeleteMapping("/{qnaSeq}")
    private ResponseEntity<BasicResponse> deleteQna(@Parameter(name = "qnaSeq", description = "Qna Seq", required = true) @PathVariable("qnaSeq") Integer qnaSeq) {
        log.info("deleteQna - Call");

        try {
            adminQnaService.deleteQna(qnaSeq);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        } catch (NotFoundException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.DELETE_NOT_FOUND, null));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.DELETE_FAIL, null));
        }
    }
}