package com.ssafysignal.api.posting.controller;

import com.ssafysignal.api.global.exception.NotFoundException;
import com.ssafysignal.api.global.response.BasicResponse;
import com.ssafysignal.api.global.response.ResponseCode;
import com.ssafysignal.api.posting.dto.request.ApplySelectConfirmRequest;
import com.ssafysignal.api.posting.dto.request.PostingBasicRequest;
import com.ssafysignal.api.posting.dto.response.PostingFindAllByUserSeq;
import com.ssafysignal.api.posting.dto.response.PostingFindAllResponse;
import com.ssafysignal.api.posting.dto.response.PostingFindResponse;
import com.ssafysignal.api.posting.service.PostingService;
import com.ssafysignal.api.project.entity.Project;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Tag(name = "공고", description = "공고 API")
@RestController
@RequestMapping("/posting")
public class PostingController {

    private final PostingService postingService;
    @Tag(name = "공고")
    @Operation(summary = "공고 전체 수", description = "공고 전체 수를 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "공고 전체 수를 조회 완료"),
            @ApiResponse(responseCode = "400", description = "공고 전체 수를 조회 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요")})
    @GetMapping("/count")
    private ResponseEntity<BasicResponse> countPosting() {
        log.info("countPosting - Call");

            try {
                Integer postingCount = postingService.countPosting();
                return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, new HashMap<String, Integer>() {{ put("count", postingCount); }}));
            } catch (RuntimeException e) {
                return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.REGIST_FAIL, null));
        }
    }


    @Tag(name = "공고")
    @Operation(summary = "공고 등록", description = "공고를 등록한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "공고 등록 완료"),
            @ApiResponse(responseCode = "400", description = "공고 등록 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요")})
    @PostMapping("")
    private ResponseEntity<BasicResponse> registPosting(@Parameter(description = "공고 등록을 위한 정보") @RequestBody PostingBasicRequest postingRegistRequest) {
        log.info("registPosting - Call");

        System.out.println("postingRegistRequest = " + postingRegistRequest);

        try {
            postingService.registPosting(postingRegistRequest);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.REGIST_FAIL, null));
        }
    }

    @Tag(name = "공고")
    @Operation(summary = "공고 목록 조회", description = "공고 전체 목록을 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "공고 목록 조회 완료"),
            @ApiResponse(responseCode = "400", description = "공고 목록 조회 중 오류 발생")})
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    private ResponseEntity<BasicResponse> findAllPosting(@Parameter(description = "페이지", required = true) Integer page,
                                                         @Parameter(description = "사이즈", required = true) Integer size,
                                                         @Parameter(description = "프로젝트 주제") String subject,
                                                         @Parameter(description = "지역 코드") String localCode,
                                                         @Parameter(description = "분야 코드") String fieldCode,
                                                         @Parameter(description = "기술 스택 목록", schema = @Schema(type = "List")) @RequestParam(required = false) List<String> postingSkillList) {
        log.info("findAllPosting - Call");

        Map<String, Object> searchKeys = new HashMap<>();
        if (subject != null && !subject.equals("")) searchKeys.put("subject", subject);
        if (localCode != null && !localCode.equals("")) searchKeys.put("localCode", localCode);
        if (fieldCode != null && !fieldCode.equals("")) searchKeys.put("fieldCode", fieldCode);

        try {
            List<PostingFindAllResponse> postingFindAllResponseList = postingService.findAllPosting(page, size, searchKeys, postingSkillList);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, new HashMap<String, Object>(){{ put("postingList", postingFindAllResponseList); }}));
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.LIST_NOT_FOUND, null));
        }
    }

    @Tag(name = "공고")
    @Operation(summary = "공고 상세 조회", description = "공고 상세 정보를 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "공고 상세 조회 완료"),
            @ApiResponse(responseCode = "400", description = "공고 상세 조회 중 오류 발생")})
    @GetMapping("/{postingSeq}")
    private ResponseEntity<BasicResponse> findPosting(@Parameter(name = "postingSeq", description = "공고 Seq", required = true) @PathVariable("postingSeq") Integer postingSeq) {
        log.info("findPosting - Call");

        try {
            Project project = postingService.findPosting(postingSeq);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, PostingFindResponse.fromEntity(project)));
        } catch (NotFoundException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getErrorCode(), null));
        }
    }

    @Tag(name = "공고")
    @Operation(summary = "공고 수정", description = "공고를 수정한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "공고 수정 완료"),
            @ApiResponse(responseCode = "400", description = "공고 수정 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요")})
    @PutMapping("/{postingSeq}")
    private ResponseEntity<BasicResponse> modifyPosting(@Parameter(name = "postingSeq", description = "공고 Seq") @PathVariable("postingSeq") Integer postingSeq,
                                                        @Parameter(description = "공고 등록을 위한 정보") @RequestBody PostingBasicRequest postingModifyRequest){
        log.info("modifyPosting - Call");

        log.info(String.valueOf(postingSeq));

        try {
            postingService.modifyPosting(postingSeq, postingModifyRequest);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        } catch (NotFoundException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getErrorCode(), null));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.MODIFY_FAIL, null));
        }
    }

    @Tag(name = "공고")
    @Operation(summary = "공고 취소", description = "공고를 취소 상태로 변경한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "공고 취소 완료"),
            @ApiResponse(responseCode = "400", description = "공고 취소 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요"),
            @ApiResponse(responseCode = "403", description = "권한 없음")})
    @DeleteMapping("/{postingSeq}")
    private ResponseEntity<BasicResponse> canclePosting(@Parameter(name = "postingSeq", description = "공고 Seq") @PathVariable("postingSeq") Integer postingSeq){
        log.info("canclePosting - Call");

        try {
            postingService.canclePosting(postingSeq);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        } catch (NotFoundException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getErrorCode(), null));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.MODIFY_FAIL, null));
        }
    }
    @Tag(name = "공고")
    @Operation(summary = "팀원 선택", description = "한명의 팀원을 선택 또는 선택해제 한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "팀원 선택 완료"),
            @ApiResponse(responseCode = "400", description = "팀원 선택 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요"),
            @ApiResponse(responseCode = "403", description = "권한 없음")})
    @PutMapping("/member/{applySeq}")
    private ResponseEntity<BasicResponse> applySelect(@Parameter(name = "applySeq", description = "지원서 Seq") @PathVariable("applySeq") Integer applySeq){
        log.info("applySelect - Call");

        try {
            postingService.applySelect(applySeq);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        } catch (NotFoundException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getErrorCode(), null));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.MODIFY_FAIL, null));
        }
    }

    @Tag(name = "공고")
    @Operation(summary = "팀원 선택 확정", description = "팀원으로 선택된 지원자가 선택에 대한 확정을 한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "팀원 선택 확정 완료"),
            @ApiResponse(responseCode = "400", description = "팀원 선택 확정 중 오류 발생"),
            @ApiResponse(responseCode = "401", description = "로그인 필요"),
            @ApiResponse(responseCode = "403", description = "권한 없음")})
    @PutMapping("/member/confirm")
    private ResponseEntity<BasicResponse> applySelectConfirm(@Parameter(name = "applySelectConfirmRequest", description = "확정, 거절 여부 요청 정보") @RequestBody ApplySelectConfirmRequest applySelectConfirmRequest){
        log.info("applySelectConfirm - Call");

        try {
            postingService.applySelectConfirm(applySelectConfirmRequest);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        } catch (NotFoundException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getErrorCode(), null));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.MODIFY_FAIL, null));
        }
    }

    @Tag(name = "공고")
    @Operation(summary = "지원한 공고 목록 조회", description = "지원한 공고 전체 목록을 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "지원한 공고 목록 조회 완료"),
            @ApiResponse(responseCode = "400", description = "지원한 공고 목록 조회 중 오류 발생")})
    @GetMapping(value = "/apply/{userSeq}")
    private ResponseEntity<BasicResponse> findAllApplyPosting(@Parameter(name = "userSeq", description = "지원자 Seq", required = true) @PathVariable("userSeq") Integer userSeq) {
        log.info("findAllApplyPosting - Call");

        try {
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, new HashMap<String, Object>(){{ put("postingList", postingService.findAllApplyPosting(userSeq)); }}));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.LIST_NOT_FOUND, null));
        }
    }

    @Tag(name = "공고")
    @Operation(summary = "작성한 공고 개수 조회", description = "작성한 공고 개수을 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "작성한 공고 개수 조회 완료"),
            @ApiResponse(responseCode = "400", description = "작성한 공고 개수 조회 중 오류 발생")})
    @GetMapping(value = "/post/count/{userSeq}")
    private ResponseEntity<BasicResponse> countPostPosting(@Parameter(name = "userSeq", description = "작성자 Seq", required = true) @PathVariable("userSeq") Integer userSeq) {
        log.info("countPostPosting - Call");

        try {
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, new HashMap<String, Object>(){{ put("count", postingService.countPostPosting(userSeq)); }}));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.LIST_NOT_FOUND, null));
        }
    }

    @Tag(name = "공고")
    @Operation(summary = "작성한 공고 목록 조회", description = "작성한 공고 전체 목록을 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "작성한 공고 목록 조회 완료"),
            @ApiResponse(responseCode = "400", description = "작성한 공고 목록 조회 중 오류 발생")})
    @GetMapping(value = "/post/{userSeq}")
    private ResponseEntity<BasicResponse> findAllPostPosting(@Parameter(description = "페이지", required = true) Integer page,
                                                             @Parameter(description = "사이즈", required = true) Integer size,
                                                             @Parameter(name = "userSeq", description = "작성자 Seq", required = true) @PathVariable("userSeq") Integer userSeq) {
        log.info("findAllPostPosting - Call");

        try {
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, new HashMap<String, Object>(){{ put("postingList", postingService.findAllPostPosting(page, size, userSeq)); }}));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.LIST_NOT_FOUND, null));
        }
    }

}
