package com.ssafysignal.api.admin.controller;

import com.ssafysignal.api.admin.dto.Request.BasicAdminSignalWeekRequest;
import com.ssafysignal.api.admin.dto.Response.FindAdminSignalWeekResponse;
import com.ssafysignal.api.admin.service.AdminNoticeService;
import com.ssafysignal.api.admin.service.AdminSignalWeekService;
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

import java.util.HashMap;
import java.util.List;
import java.util.Objects;

@Slf4j
@RequiredArgsConstructor
@Tag(name = "관리자", description = "관리자 API")
@RestController
@RequestMapping("/admin/signalweek")
public class AdminSignalWeekController {

    private final AdminSignalWeekService adminSignalWeekService;

    @Tag(name = "관리자")
    @Operation(summary = "시그널 위크 스케줄 목록 조회", description = "시그널 위크 스케줄 목록을 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "시그널 위크 목록 조회 완료"),
            @ApiResponse(responseCode = "400", description = "시그널 위크 목록 조회 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요")})
    @GetMapping("")
    private ResponseEntity<BasicResponse> findAllSignalWeek() {
        log.info("findAllSignalWeek - Call");

        try {
            List<FindAdminSignalWeekResponse> signalWeekList = adminSignalWeekService.findAllSignalWeek();
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, new HashMap<String, Object>() {{ put("signalWeekList", signalWeekList); }}));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.LIST_NOT_FOUND, null));
        }
    }

    @Tag(name = "관리자")
    @Operation(summary = "시그널 위크 스케줄 등록", description = "시그널 위크 스케줄을 등록한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "시그널 위크 등록 완료"),
            @ApiResponse(responseCode = "400", description = "시그널 위크 등록 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요")})
    @PostMapping("")
    private ResponseEntity<BasicResponse> registSignalWeek(@Parameter(name = "basicSignalWeekRequest", description = "시그널 위크 등록 정보", required = true) @RequestBody BasicAdminSignalWeekRequest basicAdminSignalWeekRequest) {
        log.info("registSignalWeek - Call");

        try {
            adminSignalWeekService.registSignalWeek(basicAdminSignalWeekRequest);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.REGIST_FAIL, null));
        }
    }
    @Tag(name = "관리자")
    @Operation(summary = "시그널 위크 스케줄 수정", description = "시그널 위크 스케줄을 수정한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "시그널 위크 스케줄 수정 완료"),
            @ApiResponse(responseCode = "400", description = "시그널 위크 스케줄 수정 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요")})
    @PutMapping("/{signalweekScheduleSeq}")
    private ResponseEntity<BasicResponse> modifySignalWeek(@Parameter(name = "signalweekScheduleSeq", description = "시그널 위크 스케줄 수정 정보", required = true) @PathVariable("signalweekScheduleSeq") Integer signalweekScheduleSeq,
                                                           @Parameter(name = "basicSignalWeekRequest", description = "시그널 위크 스케줄 수정 정보", required = true) @RequestBody BasicAdminSignalWeekRequest basicAdminSignalWeekRequest) {
        log.info("modifySignalWeek - Call");

        try {
            adminSignalWeekService.modifySignalWeek(signalweekScheduleSeq, basicAdminSignalWeekRequest);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        } catch (NotFoundException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.MODIFY_NOT_FOUND, null));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.MODIFY_FAIL, null));
        }
    }
    @Tag(name = "관리자")
    @Operation(summary = "시그널 위크 삭제", description = "시그널 위크를 삭제한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "시그널 위크 삭제 완료"),
            @ApiResponse(responseCode = "400", description = "시그널 위크 삭제 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요")})
    @DeleteMapping("/{signalweekScheduleSeq}")
    private ResponseEntity<BasicResponse> deleteSignalWeek(@Parameter(name = "signalweekScheduleSeq", description = "시그널 위크 스케줄 Seq", required = true) @PathVariable("signalweekScheduleSeq") Integer signalweekScheduleSeq) {
        log.info("deleteSignalWeek - Call");

        try {
            adminSignalWeekService.deleteSignalWeek(signalweekScheduleSeq);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        } catch (NotFoundException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.DELETE_NOT_FOUND, null));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.DELETE_FAIL, null));
        }
    }
}