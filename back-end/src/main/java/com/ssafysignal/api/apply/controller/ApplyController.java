package com.ssafysignal.api.apply.controller;


import com.ssafysignal.api.apply.dto.Request.ApplyBasicRequest;
import com.ssafysignal.api.apply.service.ApplyService;
import com.ssafysignal.api.global.common.response.BasicResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
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

        BasicResponse response = applyService.registApply(applyRegistRequest);

        return ResponseEntity.ok().body(response);
    }




    @Tag(name = "지원")
    @Operation(summary = "지원서 상세 조회", description = "지원서 상세 정보 조회")
    @GetMapping("/{applySeq}")
    private ResponseEntity<BasicResponse> findApply(@Parameter(description = "지원 Seq", required = true) @PathVariable() Integer applySeq) {
//        log.info("findApply - Call");

        BasicResponse response = applyService.findApply(applySeq);

        log.info("지나옴");

        return ResponseEntity.ok().body(response);
    }

}
