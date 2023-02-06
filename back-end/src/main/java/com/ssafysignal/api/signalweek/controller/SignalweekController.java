package com.ssafysignal.api.signalweek.controller;

import com.ssafysignal.api.global.response.BasicResponse;
import com.ssafysignal.api.global.response.ResponseCode;
import com.ssafysignal.api.signalweek.dto.request.SignalweekModifyRequest;
import com.ssafysignal.api.signalweek.dto.request.SignalweekRegistRequest;
import com.ssafysignal.api.signalweek.dto.request.SignalweekVoteRequest;
import com.ssafysignal.api.signalweek.dto.response.SignalweekFindAllResponse;
import com.ssafysignal.api.signalweek.dto.response.SignalweekFindResponse;
import com.ssafysignal.api.signalweek.entity.Signalweek;
import com.ssafysignal.api.signalweek.service.SignalweekService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

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
    private ResponseEntity<BasicResponse> registSignalweek(@Parameter(description = "시그널 위크 등록 정보", required = true) @RequestBody SignalweekRegistRequest signalweekRegistRequest,
                                                           @RequestPart(value = "pptFile", required = false) MultipartFile pptFile,
                                                           @RequestPart(value = "readameFile", required = false) MultipartFile readmeFile) {
        log.info("registSignalweek - Call");

        try {
            signalweekService.registSinalweek(signalweekRegistRequest, pptFile, readmeFile);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        } catch (RuntimeException | IOException e) {
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.REGIST_FAIL, null));
        }
    }

    @Tag(name = "시그널 위크")
    @Operation(summary = "시그널 위크 목록 조회", description = "시그널 위크의 목록을 조회한다")
    @GetMapping("")
    private ResponseEntity<BasicResponse> findAllSignalweek(@Parameter(description = "page", required = true) Integer page,
                                                            @Parameter(description = "size", required = true) Integer size,
                                                            @Parameter(description = "search keyword(subject)") String subject) {
        log.info("findAllSignalweek - Call");

        try {
            SignalweekFindAllResponse signalweekList = signalweekService.findAllSignalweek(page, size, subject);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, signalweekList));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.LIST_NOT_FOUND, null));
        }
    }

    @Tag(name = "시그널 위크")
    @Operation(summary = "시그널 위크 상세 조회", description = "시그널 위크 중 하나의 항목을 조회한다")
    @GetMapping("{signalweekSeq}")
    private ResponseEntity<BasicResponse> findSignalweek(@Parameter(description = "시그널 위크 seq") @PathVariable(name = "signalweekSeq") Integer signalweekSeq,
                                                         @Parameter(description = "유저 seq") Integer userSeq) {
        log.info("findSignalweek - Call");

        try {
            SignalweekFindResponse signalweek = signalweekService.findSignalweek(signalweekSeq, userSeq);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, signalweek));
        } catch (RuntimeException e) {
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.NOT_FOUND, null));
        }
    }

    
    // 파일 등록 이슈로 regist 와 통합
//    @Tag(name = "시그널 위크")
//    @Operation(summary = "시그널 위크 정보 수정", description = "시그널 위크 등록 정보를 수정한다")
//    @PutMapping("{signalweekSeq}")
//    private ResponseEntity<BasicResponse> modifySignalweek(@Parameter(description = "시그널 위크 seq") @PathVariable(name = "signalweekSeq") Integer signalweekSeq,
//                                                           @Parameter(description = "modify RequestBody") @RequestBody SignalweekModifyRequest signalweekModifyRequest) {
//        log.info("modifySignalweek - Call");
//
//        signalweekService.modifySignalweek(signalweekSeq, signalweekModifyRequest);
//        return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
//    }

    @Tag(name = "시그널 위크")
    @Operation(summary = "시그널 위크 투표", description = "시그널 위크 프로젝트에 투표를 한다.")
    @PostMapping("vote")
    private ResponseEntity<BasicResponse> registSignalweekVote(@Parameter(description = "시그널 위크 투표 등록 정보") @RequestBody SignalweekVoteRequest signalweekVoteRequest) {
        log.info("registSignalweekVote - Call");

        try {
            signalweekService.registSignalweekVote(signalweekVoteRequest);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        } catch (RuntimeException e) {
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.REGIST_FAIL, null));
        }
    }

    @Tag(name = "시그널 위크")
    @Operation(summary = "시그널 위크 명예의 전당 목록 조회", description = "시그널 위크 명예의 전당을 조회한다.")
    @GetMapping("rank")
    private ResponseEntity<BasicResponse> findAllSignalweekRank(@Parameter(description = "연도") Integer year,
                                                                @Parameter(description = "분기") Integer quarter) {
        log.info("findAllSignalweekRank - Call");

//        try {
//            signalweekService.
//        }
        return null;
    }



    // 삭제는 관리자만 가능!
//    @Tag(name = "시그널 위크")
//    @Operation(summary = "시그널 위크 삭제", description = "시그널 위크 등록 정보를 삭제한다")
//    @DeleteMapping("{signalweekSeq}")
//    private ResponseEntity<BasicResponse> deleteSignalweek(@Parameter(description = "시그널 위크 Seq") @PathVariable(name = "signalweekSeq") Integer signalweekSeq) {
//        log.info("deleteSignalweek - Call");
//
//        try {
//            signalweekService.deleteSignalweek(signalweekSeq);
//            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
//        } catch (RuntimeException e) {
//            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.DELETE_FAIL, null));
//        }
//    }
}