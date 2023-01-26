package com.ssafysignal.api.board.controller;

import com.ssafysignal.api.board.service.BoardService;
import com.ssafysignal.api.global.exception.NotFoundException;
import com.ssafysignal.api.global.response.BasicResponse;
import com.ssafysignal.api.global.response.ResponseCode;
import com.ssafysignal.api.board.entity.*;
import io.swagger.models.auth.In;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@Tag(name = "공지 및 QnA", description = "공지 및 QnA API")
@RestController
@RequestMapping("/board")
public class BoardController {

    private BoardService boardService;


    @Autowired
    public BoardController(BoardService boardService) { this.boardService = boardService; }

    @Tag(name = "공지사항 조회")
    @Operation(summary = "공지사항 조회", description = "공지사항을 조회합니다.")
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
}
