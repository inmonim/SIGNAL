package com.ssafysignal.api.signalweek.controller;

import com.ssafysignal.api.global.response.BasicResponse;
import com.ssafysignal.api.global.response.ResponseCode;
import com.ssafysignal.api.signalweek.dto.request.SignalweekRegistRequest;
import com.ssafysignal.api.signalweek.entity.Signalweek;
import com.ssafysignal.api.signalweek.service.SignalweekService;
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
@Tag(name = "시그널 위크", description = "시그널 위크를 CRUD 할 수 있는 컨트롤러")
@RestController
@RequestMapping("/signalweek")
public class SignalweekController {

    private final SignalweekService signalweekService;

    @Tag(name = "시그널 위크")
    @Operation(summary = "시그널 위크 등록", description = "프로젝트를 시그널 위크에 등록한다")
    @PostMapping("")
    private ResponseEntity<BasicResponse> registSignalweek(@Parameter(description = "시그널 위크 등록 정보", required = true) @RequestBody SignalweekRegistRequest signalweekRegistRequest) {
        log.info("registSignalweek - Call");


        try {
            signalweekService.registSinalweek(signalweekRegistRequest);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        } catch (RuntimeException e) {
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.REGIST_FAIL, null));
        }
    }

    @Tag(name = "시그널 위크")
    @Operation(summary = "시그널 위크 목록 조회", description = "시그널 위크의 목록을 조회한다")
    @GetMapping("")
    private ResponseEntity<BasicResponse> findAllSignalweek() {
        log.info("findAllSignalweek - Call");

        try {
            List<Signalweek> signalweekList = signalweekService.findAllSignalweek();
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, signalweekList));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.LIST_NOT_FOUND, null));
        }
    }

    @Tag(name = "시그널 위크")
    @Operation(summary = "시그널 위크 상세 조회", description = "시그널 위크 중 하나의 항목을 조회한다")
    @GetMapping("{signalweekSeq}")
    private ResponseEntity<BasicResponse> findSignalweek(@Parameter(description = "시그널 위크 seq") @PathVariable(name = "signalweekSeq") Integer signalweekSeq) {
        log.info("findSignalweek - Call");

        try {
            Signalweek signalweek = signalweekService.findSignalweek(signalweekSeq);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, signalweek));
        } catch (RuntimeException e) {
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.NOT_FOUND, null));
        }
    }

    @Tag(name = "시그널 위크")
    @Operation(summary = "시그널 위크 정보 수정", description = "시그널 위크 등록 정보를 수정한다")
    @PutMapping("{signalweekSeq}")
    private ResponseEntity<BasicResponse> modifySignalweek(@Parameter(description = "시그널 위크 seq") @PathVariable(name = "signalweekSeq") Integer signalweekSeq,
                                                         @Parameter(description = "modify RequestBody") @RequestBody Signalweek signalweek) {
        log.info("modifySignalweek - Call");
        return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
    }

    @Tag(name = "시그널 위크")
    @Operation(summary = "시그널 위크 삭제", description = "시그널 위크 등록 정보를 삭제한다")
    @DeleteMapping("{signalweekSeq}")
    private ResponseEntity<BasicResponse> deleteSignalweek(@Parameter(description = "시그널 위크 Seq") @PathVariable(name = "signalweekSeq") Integer signalweekSeq) {
        log.info("deleteSignalweek - Call");

        try {
            signalweekService.deleteSignalweek(signalweekSeq);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        } catch (RuntimeException e) {
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.DELETE_FAIL, null));
        }
    }
}