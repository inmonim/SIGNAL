package com.ssafysignal.api.board.controller;

import com.ssafysignal.api.board.dto.response.NoticeFindAllResponse;
import com.ssafysignal.api.board.dto.response.NoticeFindResponse;
import com.ssafysignal.api.board.service.NoticeService;
import com.ssafysignal.api.global.exception.NotFoundException;
import com.ssafysignal.api.global.response.BasicResponse;
import com.ssafysignal.api.global.response.ResponseCode;
import com.ssafysignal.api.board.entity.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@Slf4j
@RequiredArgsConstructor
@Tag(name = "공지사항", description = "공지사항 API")
@RestController
@RequestMapping("/board/notice")
public class NoticeController {
    private final NoticeService noticeService;

    @Tag(name = "공지사항")
    @Operation(summary = "공지사항 전체 수", description = "공지사항 전체 수를 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "공지사항 전체 수를 조회 완료"),
            @ApiResponse(responseCode = "400", description = "공지사항 전체 수를 조회 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요")})
    @GetMapping("/count")
    private ResponseEntity<BasicResponse> countNotice() {
        log.info("countNotice - Call");

        try {
            Integer noticeCount = noticeService.countNotice();
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, new HashMap<String, Integer>() {{ put("count", noticeCount); }}));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.REGIST_FAIL, null));
        }
    }


    @Tag(name = "공지사항")
    @Operation(summary = "공지사항 목록조회", description = "공지사항 목록을 조회합니다.")
    @GetMapping("")
    private ResponseEntity<BasicResponse> findAllNotice(@Parameter(description = "페이지", required = true) Integer page,
                                                        @Parameter(description = "사이즈", required = true) Integer size) {
        log.info("findAllNotice - Call");

        Page<Notice> noticeList = noticeService.findAllNotice(page, size);
        return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, NoticeFindAllResponse.fromEntity(noticeList)));
    }


    @Tag(name = "공지사항")
    @Operation(summary = "공지사항 상세조회", description = "공지사항을 조회합니다.")
    @GetMapping("/{noticeSeq}")
    private  ResponseEntity<BasicResponse> findNotice(@Parameter(description = "공지사항 Seq", required = true) @PathVariable("noticeSeq") Integer noticeSeq) {

        log.info("findNotice - Call");

        try {
            Notice notice = noticeService.findNotice(noticeSeq);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, NoticeFindResponse.fromEntity(notice)));
        } catch (NotFoundException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getErrorCode(), null));
        }
    }
}
