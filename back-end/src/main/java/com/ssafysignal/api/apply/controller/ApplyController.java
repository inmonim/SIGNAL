package com.ssafysignal.api.apply.controller;


import com.ssafysignal.api.apply.dto.Request.ApplyBasicRequest;
import com.ssafysignal.api.apply.dto.Response.ApplyFindResponse;
import com.ssafysignal.api.apply.dto.Response.ApplyWriterFindResponse;
import com.ssafysignal.api.apply.entity.Apply;
import com.ssafysignal.api.apply.entity.ApplyAnswer;
import com.ssafysignal.api.apply.service.ApplyService;
import com.ssafysignal.api.common.entity.CommonCode;
import com.ssafysignal.api.global.exception.NotFoundException;
import com.ssafysignal.api.global.response.BasicResponse;
import com.ssafysignal.api.global.response.ResponseCode;
import com.ssafysignal.api.posting.entity.PostingQuestion;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "지원서 등록 완료"),
            @ApiResponse(responseCode = "400", description = "지원서 등록 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요")})
    @PostMapping("/{postingSeq}")
    private ResponseEntity<BasicResponse> registApply(@Parameter(description = "공고 Seq", required = true) @PathVariable("postingSeq") Integer postingSeq,
                                                      @Parameter(description = "지원서 작성을 위한 정보", required = true) @RequestBody ApplyBasicRequest applyRegistRequest) {
        log.info("regeistApply - Call");

        try {
            applyService.registApply(applyRegistRequest, postingSeq);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
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
    private ResponseEntity<BasicResponse> modifyApply(@Parameter(description = "지원서 Seq", required = true) @PathVariable(name = "applySeq") Integer applySeq,
                                                      @Parameter(description = "지원서 수정 정보", required = true) @RequestBody ApplyBasicRequest applyBasicRequest) {

        log.info("modifyApply - Call");

        try {
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
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
    private ResponseEntity<BasicResponse> findApply(@Parameter(description = "지원 Seq", required = true) @PathVariable("applySeq") Integer applySeq) {

        log.info("findApply - Call");

        try {

            List<ApplyAnswer> applyAnswerList = new ArrayList<>();
            List<String> careerList = new ArrayList<>();
            List<String> expList = new ArrayList<>();
            List<CommonCode> skillList = new ArrayList<>();

            for (int i = 0; i < 5; i++) {
                applyAnswerList.add(ApplyAnswer.builder()
                                .applyAnswerSeq(1)
                                .postingSeq(1)
                                .postingQuestionSeq(11)
                                .content("질문 답변 테스트 " + i)
                                .regDt(LocalDateTime.now())
                                .build());
                careerList.add("커리어 테스트 " + i);
                expList.add("경험 테스트 " + i);
                skillList.add(CommonCode.builder()
                                .code("AI100")
                                .name("keras")
                                .groupCode("AI")
                                .groupName("인공지능 기술스택 구분")
                                .build());
            }

            // dummy
            ApplyFindResponse applyFindResponse = ApplyFindResponse.builder()
                    .userSeq(1)
                    .postingSeq(1)
                    .content("지원서 상세 더미")
                    .position(CommonCode.builder().code("PO100").name("frontend").groupCode("PO").groupName("포지션 구분").build())
                    .fieldCode(CommonCode.builder().code("FI100").name("web").groupCode("FI").groupName("분야구분").build())
                    .answerList(applyAnswerList)
                    .careerList(careerList)
                    .expList(expList)
                    .skillList(skillList)
                    .build();

//            Apply apply = applyService.findApply(applySeq);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, applyFindResponse));
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
    private ResponseEntity<BasicResponse> deleteApply(@Parameter(description = "지원서 Seq") @PathVariable("applySeq") Integer applySeq){
        log.info("deleteApply - Call");

        try {
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
    private ResponseEntity<BasicResponse> findAllApplyWriter(@Parameter(description = "공고 Seq", required = true) @PathVariable("postingSeq") Integer postingSeq,
                                                             @Parameter(description = "페이지", required = true) Integer page,
                                                             @Parameter(description = "사이즈", required = true) Integer size) {
        log.info("findALlApplyToWriter - Call");

        try {
            // dummy
            List<ApplyWriterFindResponse> applyList = new ArrayList<>();

            for (int i = 0; i < size; i++){
                applyList.add(ApplyWriterFindResponse.builder()
                    .applySeq(i)
                    .subject("작성자 지원서 목록 조회 더미 " + i)
                    .statusCode(CommonCode.builder().code("PAS103").groupCode("PAS").name("심사중").groupName("지원한 공고 상태구분").build())
                    .meetingDt(LocalDateTime.now())
                    .build());
            }

//            List<ApplyWriterFindResponse> applyList = applyService.findAllApplyWriter(postingSeq);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, applyList));
        } catch (NotFoundException e){
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getErrorCode(), null));
        }
    }

}
