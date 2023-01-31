package com.ssafysignal.api.board.controller;

import com.ssafysignal.api.board.dto.request.QnaRegistRequest;
import com.ssafysignal.api.board.dto.response.NoticeFindAllResponse;
import com.ssafysignal.api.board.dto.response.NoticeFindResponse;
import com.ssafysignal.api.board.dto.response.QnaFindAllResponse;
import com.ssafysignal.api.board.dto.response.QnaFindResponse;
import com.ssafysignal.api.board.entity.Notice;
import com.ssafysignal.api.board.entity.Qna;
import com.ssafysignal.api.board.service.NoticeService;
import com.ssafysignal.api.board.service.QnaService;
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
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@Slf4j
@RequiredArgsConstructor
@Tag(name = "QnA", description = "QnA API")
@RestController
@RequestMapping("/board/qna")
public class QnaController {
    private final QnaService qnaService;

    @Tag(name = "QnA")
    @Operation(summary = "QnA 전체 수", description = "QnA 전체 수를 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "QnA 전체 수를 조회 완료"),
            @ApiResponse(responseCode = "400", description = "QnA 전체 수를 조회 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요")})
    @GetMapping("/count")
    private ResponseEntity<BasicResponse> countQna() {
        log.info("countQna - Call");

        try {
            Integer qnaCount = qnaService.countNotice();
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, new HashMap<String, Integer>() {{ put("count", qnaCount); }}));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.REGIST_FAIL, null));
        }

    }

    @Tag(name = "QnA")
    @Operation(summary = "QnA 등록", description = "QnA를 등록합니다.")
    @PostMapping("")
    private ResponseEntity<BasicResponse> registQna(@Parameter(description = "Qna 등록을 위한 정보") @RequestBody QnaRegistRequest qnaRegistRequest) {
        log.info("registQna - Call");

        try {
            qnaService.registQna(qnaRegistRequest);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.REGIST_FAIL, null));
        }
    }

    @Tag(name = "QnA")
    @Operation(summary = "QnA 목록조회", description = "QnA 목록을 조회합니다.")
    @GetMapping("")
    private ResponseEntity<BasicResponse> findAllQna(@Parameter(description = "page") Integer page,
                                                     @Parameter(description = "size") Integer size) {
        log.info("findAllQna - Call");

        Page<Qna> QnaList = qnaService.findAllQna(page, size);
        return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, QnaFindAllResponse.fromEntity(QnaList)));
    }


    @Tag(name = "QnA")
    @Operation(summary = "QnA 상세 조회", description = "QnA 항목을 상세 조회")
    @GetMapping("/{qnaSeq}")
    private ResponseEntity<BasicResponse> findQna(@Parameter(name = "qnaSeq", description = "QnA Seq", required = true) @PathVariable Integer qnaSeq) {
        log.info("findQna - Call");

        try {
            Qna qna = qnaService.findQna(qnaSeq);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, QnaFindResponse.fromEntity(qna)));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.NOT_FOUND, null));
        }
    }

    @Tag(name = "QnA")
    @Operation(summary = "QnA 수정", description = "작성자의 QnA 수정")
    @PutMapping("/{qnaSeq}")
    private ResponseEntity<BasicResponse> modifyQna(@Parameter(name = "qnaSeq", description = "QnA Seq", required = true) @PathVariable Integer qnaSeq,
                                                    @Parameter(description = "QnA 수정 정보", required = true) @RequestBody QnaRegistRequest qnaRegistRequest) {
        log.info("modifyQna - Call");

        try {
            qnaService.modifyQna(qnaSeq, qnaRegistRequest);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.MODIFY_FAIL, null));
        }
    }

    @Tag(name = "QnA")
    @Operation(summary = "QnA 삭제", description = "QnA 삭제")
    @DeleteMapping("/{qnaSeq}")
    private ResponseEntity<BasicResponse> deleteQna(@Parameter(name = "qnaSeq", description = "QnA Seq", required = true) @PathVariable Integer qnaSeq) {
        log.info("deleteQna - Call");

        try {
            qnaService.deleteQna(qnaSeq);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        } catch (NotFoundException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getErrorCode(), null));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.DELETE_FAIL, null));
        }
    }
}
