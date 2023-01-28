package com.ssafysignal.api.board.controller;

import com.ssafysignal.api.board.dto.request.QnaRegistRequest;
import com.ssafysignal.api.board.service.BoardService;
import com.ssafysignal.api.global.exception.NotFoundException;
import com.ssafysignal.api.global.response.BasicResponse;
import com.ssafysignal.api.global.response.ResponseCode;
import com.ssafysignal.api.board.entity.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Tag(name = "공지 및 QnA", description = "공지 및 QnA API")
@RestController
@RequestMapping("/board")
public class BoardController {
    private final BoardService boardService;


    @Tag(name = "공지사항")
    @Operation(summary = "공지사항 목록조회", description = "공지사항 목록을 조회합니다.")
    @GetMapping("notice")
    private ResponseEntity<BasicResponse> findAllNotice() {
        log.info("findAllNotice - Call");

        List<Notice> noticeList = boardService.findAllNotice();
        return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, noticeList));
    }


    @Tag(name = "공지사항")
    @Operation(summary = "공지사항 상세조회", description = "공지사항을 조회합니다.")
    @GetMapping("notice/{noticeSeq}")
    private  ResponseEntity<BasicResponse> findNotice(@Parameter(description = "공지사항 Seq", required = true) @PathVariable("noticeSeq") Integer noticeSeq) {

        log.info("findNotice - Call");

        try {
            Notice notice = boardService.findNotice(noticeSeq);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, notice));
        } catch (NotFoundException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getErrorCode(), null));
        }
    }


    @Tag(name = "QnA")
    @Operation(summary = "QnA 목록조회", description = "QnA 목록을 조회합니다.")
    @GetMapping("qna")
    private ResponseEntity<BasicResponse> findAllQna() {
        log.info("findAllQna - Call");

        List<Qna> QnaList = boardService.findAllQna();
        return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, QnaList));
    }

    @Tag(name = "QnA")
    @Operation(summary = "QnA 등록", description = "QnA를 등록합니다.")
    @PostMapping("qna")
    private ResponseEntity<BasicResponse> registQna(@Parameter(description = "Qna 등록을 위한 정보") @RequestBody QnaRegistRequest qnaRegistRequest) {
        log.info("registQna - Call");

        try {
            boardService.registQna(qnaRegistRequest);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.REGIST_FAIL, null));
        }

    }

}
