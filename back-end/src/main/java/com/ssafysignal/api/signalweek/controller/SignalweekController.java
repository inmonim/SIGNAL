package com.ssafysignal.api.signalweek.controller;

import com.ssafysignal.api.global.response.BasicResponse;
import com.ssafysignal.api.global.response.ResponseCode;
import com.ssafysignal.api.signalweek.dto.request.SignalweekRegistRequest;
import com.ssafysignal.api.signalweek.service.SignalweekService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}