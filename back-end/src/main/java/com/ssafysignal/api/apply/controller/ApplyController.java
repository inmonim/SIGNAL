package com.ssafysignal.api.apply.controller;


import com.ssafysignal.api.apply.dto.Request.ApplyBasicRequest;
import com.ssafysignal.api.apply.entity.Apply;
import com.ssafysignal.api.apply.service.ApplyService;
import com.ssafysignal.api.global.exception.NotFoundException;
import com.ssafysignal.api.global.response.BasicResponse;
import com.ssafysignal.api.global.response.ResponseCode;
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
@Tag(name = "지원", description = "지원서 API")
@RestController
@RequestMapping("/apply")

public class ApplyController {

    private ApplyService applyService;

    @Autowired
    public ApplyController(ApplyService applyService) {
        this.applyService = applyService;
    }

    @Tag(name = "지원")
    @Operation(summary = "지원서 등록",  description = "지원서를 등록한다.")
    @PostMapping("")
    private ResponseEntity<BasicResponse> registApply(@Parameter(description = "지원서 작성을 위한 정보")
                                                          @RequestBody ApplyBasicRequest applyRegistRequest) {
        log.info("regeistApply - Call");

        try {
            applyService.registApply(applyRegistRequest);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.REGIST_FAIL, null));
        }
    }

    @Tag(name = "지원")
    @Operation(summary = "지원서 상세 조회", description = "지원서 상세 정보 조회")
    @GetMapping("/{applySeq}")
    private ResponseEntity<BasicResponse> findApply(@Parameter(description = "지원 Seq", required = true) @PathVariable("applySeq") Integer applySeq) {

        log.info("findApply - Call");

        try {
            Apply apply = applyService.findApply(applySeq);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, apply));
        } catch (NotFoundException e){
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getErrorCode(), null));
        }
    }
}
