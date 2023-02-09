package com.ssafysignal.api.admin.controller;

import com.ssafysignal.api.admin.dto.Request.BasicAdminNoticeRequest;
import com.ssafysignal.api.admin.service.AdminNoticeService;
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

@Slf4j
@RequiredArgsConstructor
@Tag(name = "관리자", description = "관리자 API")
@RestController
@RequestMapping("/admin/notice")
public class AdminNoticeController {

    private final AdminNoticeService adminNoticeService;

    @Tag(name = "관리자")
    @Operation(summary = "공지사항 등록", description = "공지사항을 등록한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "공지사항 등록 완료"),
            @ApiResponse(responseCode = "400", description = "공지사항 등록 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요")})
    @PostMapping("")
    private ResponseEntity<BasicResponse> registNotice(@Parameter(name = "registNoticeRequest", description = "공지사항 등록 정보", required = true) @RequestBody BasicAdminNoticeRequest basicAdminNoticeRequest) {
        log.info("registNotice - Call");

        try {
            adminNoticeService.registNotice(basicAdminNoticeRequest);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.REGIST_FAIL, null));
        }
    }
    @Tag(name = "관리자")
    @Operation(summary = "공지사항 수정", description = "공지사항을 수정한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "공지사항 수정 완료"),
            @ApiResponse(responseCode = "400", description = "공지사항 수정 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요")})
    @PutMapping("/{noticeSeq}")
    private ResponseEntity<BasicResponse> modifyNotice(@Parameter(name = "noticeSeq", description = "공지사항 Seq", required = true) @PathVariable("noticeSeq") Integer noticeSeq,
                                                       @Parameter(name = "registNoticeRequest", description = "공지사항 수정 정보", required = true) @RequestBody BasicAdminNoticeRequest basicAdminNoticeRequest) {
        log.info("modifyNotice - Call");

        try {
            adminNoticeService.modifyNotice(noticeSeq, basicAdminNoticeRequest);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        } catch (NotFoundException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.MODIFY_NOT_FOUND, null));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.MODIFY_FAIL, null));
        }
    }
    @Tag(name = "관리자")
    @Operation(summary = "공지사항 삭제", description = "공지사항을 삭제한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "공지사항 삭제 완료"),
            @ApiResponse(responseCode = "400", description = "공지사항 삭제 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요")})
    @DeleteMapping("/{noticeSeq}")
    private ResponseEntity<BasicResponse> deleteNotice(@Parameter(name = "noticeSeq", description = "공지사항 Seq", required = true) @PathVariable("noticeSeq") Integer noticeSeq) {
        log.info("deleteNotice - Call");

        try {
            adminNoticeService.deleteNotice(noticeSeq);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        } catch (NotFoundException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.DELETE_NOT_FOUND, null));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.DELETE_FAIL, null));
        }
    }
}