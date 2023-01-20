package com.ssafysignal.api.posting.controller;

import com.ssafysignal.api.global.db.entity.CommonCode;
import com.ssafysignal.api.global.response.BasicResponse;
import com.ssafysignal.api.posting.dto.request.RegistPostingRequest;
import com.ssafysignal.api.posting.entity.Posting;
import com.ssafysignal.api.user.entity.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Tag(name = "공고", description = "공고 컨트롤러")
@RestController
@RequestMapping("/posting")
public class PostingController {

    @Operation(summary = "공고 등록", description = "공고를 등록한다.")
    @PostMapping("")
    private ResponseEntity<BasicResponse> registPosting(@Parameter(description = "공고 등록을 위한 정보") @RequestBody(required = true)RegistPostingRequest registPostingRequest) {
        log.info("registPosting - Call");

        System.out.println(registPostingRequest);

        return ResponseEntity.ok().body(BasicResponse.Body("success", "공고 등록 성공", null));
    }

    @Operation(summary = "공고 목록 조회", description = "공고 전체 목록을 조회한다.")
    @GetMapping("")
    private ResponseEntity<BasicResponse> findAllPosting() {
        log.info("findAllPosting - Call");

        List<Posting> postingList = new ArrayList<>();

        for (int i = 0; i < 10; i++) {
            CommonCode userCode = new CommonCode("US100", "일반 회원", "US", "회원 구분");
            User user = new User(1, "박싸피", "abc@abc.com", "싸피드가자", 2023, 1, 1, "010-1234-5678", LocalDateTime.now(), userCode, 100);
            CommonCode postingCode = new CommonCode("PPS102", "모집중", "PPS", "작성한 공고 상태 구분");
            Posting posting = new Posting(1, user, "공고 테스트", LocalDateTime.now(), LocalDateTime.now(), 5, postingCode, LocalDateTime.now());
            postingList.add(posting);
        }

        return ResponseEntity.ok().body(BasicResponse.Body("success", "공고 목록 조회 성공", postingList));
    }

    @Operation(summary = "공고 상세 조회", description = "공고 상세 목록을 조회한다.")
    @GetMapping("/{postingSeq}")
    private ResponseEntity<BasicResponse> findPosting(@Parameter(description = "공고 Seq", required = true) @PathVariable Integer postingSeq) {
        log.info("findPosting - Call");

        CommonCode userCode = new CommonCode("US100", "일반 회원", "US", "회원 구분");
        User user = new User(postingSeq, "박싸피", "abc@abc.com", "싸피드가자", 2023, 1, 1, "01012345678", LocalDateTime.now(), userCode, 100);
        CommonCode postingCode = new CommonCode("PPS102", "모집중", "PPS", "작성한 공고 상태 구분");
        Posting posting = new Posting(1, user, "공고 테스트", LocalDateTime.now(), LocalDateTime.now(), 5, postingCode, LocalDateTime.now());

        return ResponseEntity.ok().body(BasicResponse.Body("success", "공고 상세 조회 성공", posting));
    }
}
