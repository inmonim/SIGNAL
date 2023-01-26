package com.ssafysignal.api.common.controller;

import com.ssafysignal.api.common.entity.CommonCode;
import com.ssafysignal.api.common.repository.CommonCodeRepository;
import com.ssafysignal.api.common.service.CommonCodeService;
import com.ssafysignal.api.global.exception.NotFoundException;
import com.ssafysignal.api.global.response.BasicResponse;
import com.ssafysignal.api.global.response.ResponseCode;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Tag(name = "공통 코드", description = "공통 코드 API")
@RestController
@RequestMapping("/commoncode")
public class CommonCodeController {
    private final CommonCodeService commonCodeService;

    @Tag(name = "공통 코드")
    @Operation(summary = "공통 코드 목록 조회", description = "그룹 코드를 기준으로 모든 공통 코드를 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "공통 코드 목록 조회 완료"),
            @ApiResponse(responseCode = "400", description = "공통 코드 목록 조회 조회 중 오류 발생")})
    @GetMapping(value = "")
    private ResponseEntity<BasicResponse> findAllCommonCode(@Parameter(description = "페이지", required = true) String groupCode) {
        log.info("findAllCommonCode - Call");

        try {
            List<CommonCode> commonCodeList = commonCodeService.findAllCommonCode(groupCode);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS,  commonCodeList));
        } catch (NotFoundException e){
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getErrorCode(),  null));
        }
    }

    @Tag(name = "공통 코드")
    @Operation(summary = "공통 코드 상세 조회", description = "공콩 코드를 상세 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "공통 코드 상세 조회 완료"),
            @ApiResponse(responseCode = "400", description = "공통 코드 상세 조회 조회 중 오류 발생")})
    @GetMapping(value = "/{code}")
    private ResponseEntity<BasicResponse> findCommonCode(@Parameter(description = "페이지", required = true) @PathVariable("code") String code) {
        log.info("findCommonCode - Call");

        try {
            CommonCode commonCode = commonCodeService.findCommonCode(code);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS,  commonCode));
        } catch (NotFoundException e){
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getErrorCode(), null));
        }
    }
}
