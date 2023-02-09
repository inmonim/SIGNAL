package com.ssafysignal.api.apply.controller;


import com.ssafysignal.api.apply.dto.Request.ApplyBasicRequest;
import com.ssafysignal.api.apply.dto.Request.ApplyMemoRequest;
import com.ssafysignal.api.apply.dto.Response.ApplyApplyerFindResponse;
import com.ssafysignal.api.apply.dto.Response.ApplyFindResponse;
import com.ssafysignal.api.apply.service.ApplyService;
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
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Tag(name = "지원", description = "지원서 API")
@RestController
@RequestMapping("/apply")
public class ApplyController {

    private final ApplyService applyService;

    @Tag(name = "지원")
    @Operation(summary = "지원서 등록",  description = "지원서를 등록한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "지원서 등록 완료"),
            @ApiResponse(responseCode = "400", description = "지원서 등록 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요")})
    @PostMapping("/{postingSeq}")
    private ResponseEntity<BasicResponse> registApply(@Parameter(name = "postingSeq", description = "공고 Seq", required = true) @PathVariable("postingSeq") Integer postingSeq,
                                                      @Parameter(description = "지원서 작성을 위한 정보", required = true) @RequestBody ApplyBasicRequest applyRegistRequest) {
        log.info("regeistApply - Call");

        try {
            applyService.registApply(applyRegistRequest, postingSeq);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        } catch (NotFoundException e){
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getErrorCode(), null));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.REGIST_FAIL, null));
        }
    }

    
    @Tag(name = "지원")
    @Operation(summary = "지원서 수정", description = "지원서를 수정한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "지원서 수정 완료"),
            @ApiResponse(responseCode = "400", description = "지원서 수정 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요"),
            @ApiResponse(responseCode = "403", description = "권한 없음")})
    @PutMapping("/{applySeq}")
    private ResponseEntity<BasicResponse> modifyApply(@Parameter(name = "applySeq", description = "지원서 Seq", required = true) @PathVariable(name = "applySeq") Integer applySeq,
                                                      @Parameter(description = "지원서 수정 정보", required = true) @RequestBody ApplyBasicRequest applyBasicRequest) {
    	
        log.info("modifyApply - Call");
        System.out.println(applyBasicRequest);
        applyService.modifyApply(applyBasicRequest, applySeq);
        try {
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        }
        catch (DuplicateKeyException e) {
        	return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.MODIFY_FAIL, null));
        } catch (NotFoundException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getErrorCode(), null));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.MODIFY_FAIL, null));
        }
    }

    
    @Tag(name = "지원")
    @Operation(summary = "지원서 상세 조회", description = "지원서 상세 정보를 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "지원서 상세 조회 완료"),
            @ApiResponse(responseCode = "400", description = "지원서 상세 조회 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요"),
            @ApiResponse(responseCode = "403", description = "권한 없음")})
    @GetMapping("/{applySeq}")
    private ResponseEntity<BasicResponse> findApply(@Parameter(name = "applySeq", description = "지원 Seq", required = true) @PathVariable("applySeq") Integer applySeq) {

        log.info("findApply - Call");

        try {
            ApplyFindResponse res = applyService.findApply(applySeq);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, res));
        } catch (NotFoundException e){
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getErrorCode(), null));
        }
    }

    @Tag(name = "지원")
    @Operation(summary = "지원서 삭제", description = "지원서를 삭제한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "지원서 삭제 완료"),
            @ApiResponse(responseCode = "400", description = "지원서 삭제 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요"),
            @ApiResponse(responseCode = "403", description = "권한 없음")})
    @DeleteMapping("/{applySeq}")
    private ResponseEntity<BasicResponse> deleteApply(@Parameter(name = "applySeq", description = "지원서 Seq") @PathVariable("applySeq") Integer applySeq){
        log.info("deleteApply - Call");

        try {
        	applyService.cancleApply(applySeq);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        } catch (NotFoundException e){
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.DELETE_NOT_FOUND, null));

        } catch (RuntimeException e){
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.DELETE_FAIL, null));
        }
    }

    @Tag(name = "지원")
    @Operation(summary = "작성자 지원서 목록 조회", description = "작성자 기준으로 지원서 목록을 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "지원서 목록 조회 완료"),
            @ApiResponse(responseCode = "400", description = "지원서 목록 조회 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요"),
            @ApiResponse(responseCode = "403", description = "권한 없음")})
    @GetMapping("/writer/{postingSeq}")
    private ResponseEntity<BasicResponse> findAllApplyWriter(@Parameter(name = "postingSeq", description = "공고 Seq", required = true) @PathVariable("postingSeq") Integer postingSeq,
                                                             @Parameter(description = "페이지", required = true) Integer page,
                                                             @Parameter(description = "사이즈", required = true) Integer size) {
        log.info("findALlApplyToWriter - Call");

        try {
            Map<String, Object> resList = applyService.findAllApplyWriter(postingSeq, page, size);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, resList));
        } catch (NotFoundException e){
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getErrorCode(), null));
        }
    }

    @Tag(name = "지원")
    @Operation(summary = "작성자 지원서 갯수 조회", description = "작성자 기준으로 지원서 갯수 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "지원서 목록 조회 완료"),
            @ApiResponse(responseCode = "400", description = "지원서 목록 조회 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요"),
            @ApiResponse(responseCode = "403", description = "권한 없음")})
    @GetMapping("/writer/count/{postingSeq}")
    private ResponseEntity<BasicResponse> countApplyWriter(@Parameter(name = "postingSeq", description = "공고 Seq", required = true) @PathVariable("postingSeq") Integer postingSeq) {
        log.info("findALlApplyToWriter - Call");

        try {
            Map<String,Integer> ret =applyService.countApplyWriter(postingSeq);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, ret));
        } catch (NotFoundException e){
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getErrorCode(), null));
        }
    }

    @Tag(name = "지원")
    @Operation(summary = "지원자 지원서 목록 조회", description = "지원자 기준으로 지원서 목록을 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "지원서 목록 조회 완료"),
            @ApiResponse(responseCode = "400", description = "지원서 목록 조회 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요"),
            @ApiResponse(responseCode = "403", description = "권한 없음")})
    @GetMapping("/applyer/{userSeq}")
    private ResponseEntity<BasicResponse> findAllApplyApplyer(@Parameter(name = "userSeq", description = "유저 Seq", required = true) @PathVariable("userSeq") Integer userSeq,
                                                              @Parameter(description = "페이지", required = true) Integer page,
                                                              @Parameter(description = "사이즈", required = true) Integer size) {
        log.info("findAllApplyApplyer - Call");

        try {
            List<ApplyApplyerFindResponse> applyList = applyService.findAllApplyApplyer(userSeq, page, size);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, applyList));
        } catch (NotFoundException e){
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getErrorCode(), null));
        }
    }

    @Tag(name = "지원")
    @Operation(summary = "지원자 지원서 갯수 조회", description = "지원자 기준으로 지원서 갯수를 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "지원서 목록 조회 완료"),
            @ApiResponse(responseCode = "400", description = "지원서 목록 조회 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요"),
            @ApiResponse(responseCode = "403", description = "권한 없음")})
    @GetMapping("/applyer/count/{userSeq}")
    private ResponseEntity<BasicResponse> countApplyApplyer(@Parameter(name = "userSeq", description = "지원자 Seq", required = true) @PathVariable("userSeq") Integer userSeq) {
        log.info("findAllApplyApplyer - Call");

        try {
            Map<String,Integer> ret =applyService.countApplyApplyer(userSeq);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, ret));
        } catch (NotFoundException e){
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getErrorCode(), null));
        }
    }


    @Tag(name = "지원")
    @Operation(summary = "지원서 메모 등록", description = "지원서 메모 등록한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "지원서 메모 등록 완료"),
            @ApiResponse(responseCode = "400", description = "지원서 메모 등록 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요"),
            @ApiResponse(responseCode = "403", description = "권한 없음")})
    @PutMapping("/memo")
    private ResponseEntity<BasicResponse> modifyApplyMemo(@Parameter(description = "지원서 메모 정보") @RequestBody ApplyMemoRequest applyMemoRequest){
        log.info("modifyApplyMemo - Call");

        try {
            log.info(applyMemoRequest.toString());
        //할것!
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        } catch (NotFoundException e){
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getErrorCode(), null));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.MODIFY_FAIL, null));
        }
    }

    @Tag(name = "지원")
    @Operation(summary = "지원서 메모 조회", description = "지원서 메모 조회한다..")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "지원서 메모 조회 완료"),
            @ApiResponse(responseCode = "400", description = "지원서 메모 조회 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요"),
            @ApiResponse(responseCode = "403", description = "권한 없음")})
    @GetMapping("/memo/{applySeq}")
    private ResponseEntity<BasicResponse> findApplyMemo(@Parameter(name = "applySeq", description = "지원서 Seq", required = true) @PathVariable("applySeq") Integer applySeq) {

        log.info("findApplyMemo - Call");

        try {
            String memo = applyService.findApplyMemo(applySeq);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, new HashMap<String, String>() {{ put("memo", memo); }}));
        } catch (NotFoundException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getErrorCode(), null));
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.MODIFY_FAIL, null));
        }
    }
}
