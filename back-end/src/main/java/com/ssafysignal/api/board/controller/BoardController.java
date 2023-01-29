package com.ssafysignal.api.board.controller;

import com.ssafysignal.api.board.dto.response.NoticeFindAllResponse;
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
import org.springframework.data.domain.Page;
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
    private ResponseEntity<BasicResponse> findAllNotice(@Parameter(description = "페이지", required = true) Integer page,
                                                        @Parameter(description = "사이즈", required = true) Integer size) {
        log.info("findAllNotice - Call");

        Page<Notice> noticeList = boardService.findAllNotice(page, size);
        return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, NoticeFindAllResponse.fromEntity(noticeList)));
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

    @Tag(name = "QnA")
    @Operation(summary = "QnA 목록조회", description = "QnA 목록을 조회합니다.")
    @GetMapping("qna")
    private ResponseEntity<BasicResponse> findAllQna() {
        log.info("findAllQna - Call");

        List<Qna> QnaList = boardService.findAllQna();
        return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, QnaList));
    }


    @Tag(name = "QnA")
    @Operation(summary = "QnA 상세 조회", description = "QnA 항목을 상세 조회")
    @GetMapping("qna/{qnaSeq}")
    private ResponseEntity<BasicResponse> findQna(@Parameter(name = "qnaSeq", description = "QnA Seq", required = true) @PathVariable Integer qnaSeq) {
        log.info("findQna - Call");

        try {
            Qna qna = boardService.findQna(qnaSeq);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, qna));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.NOT_FOUND, null));
        }
    }

    @Tag(name = "QnA")
    @Operation(summary = "QnA 수정", description = "작성자의 QnA 수정")
    @PutMapping("qna/{qnaSeq}")
    private ResponseEntity<BasicResponse> modifyQna(@Parameter(name = "qnaSeq", description = "QnA Seq", required = true) @PathVariable Integer qnaSeq,
                                                    @Parameter(description = "QnA 수정 정보", required = true) @RequestBody QnaRegistRequest qnaRegistRequest) {
        log.info("modifyQna - Call");

        try {
            boardService.modifyQna(qnaSeq, qnaRegistRequest);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.MODIFY_FAIL, null));
        }
    }

    @Tag(name = "QnA")
    @Operation(summary = "QnA 삭제", description = "QnA 삭제")
    @DeleteMapping("qna/{qnaSeq}")
    private ResponseEntity<BasicResponse> deleteQna(@Parameter(name = "qnaSeq", description = "QnA Seq", required = true) @PathVariable Integer qnaSeq) {
        log.info("deleteQna - Call");

        try {
            boardService.deleteQna(qnaSeq);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        } catch (NotFoundException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getErrorCode(), null));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.DELETE_FAIL, null));
        }
    }
}
