package com.ssafysignal.api.posting.controller;

import com.ssafysignal.api.global.db.entity.CommonCode;
import com.ssafysignal.api.global.response.BasicResponse;
import com.ssafysignal.api.posting.entity.Posting;
import com.ssafysignal.api.user.entity.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Date;

@Slf4j
@RequiredArgsConstructor
@Tag(name = "공고", description = "공고 컨트롤러")
@RestController
@RequestMapping("/posting")
public class PostingController {
    @Operation(summary = "공고 목록 조회", description = "공고 전체 목록을 조회한다.")
    @GetMapping("")
    private ResponseEntity<BasicResponse> findAllPosting() {
        log.info("findAllPosting - Call");

        CommonCode userCode = new CommonCode("US100", "일반 회원", "US", "회원 구분");
        User user = new User(1, "박싸피", "abc@abc.com", "싸피드가자", 2023, 1, 1, "01012345678", LocalDateTime.now(), userCode, 100);
        CommonCode postingCode = new CommonCode("PPS102", "모집중", "PPS", "작성한 공고 상태 구분");
        Posting posting = new Posting(1, user, "공고 테스트", LocalDateTime.now(), LocalDateTime.now(), 5, postingCode, LocalDateTime.now());

        return ResponseEntity.ok().body(BasicResponse.Body("success", "공고 조회 성공", posting));
    }
}
