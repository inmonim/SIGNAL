package com.ssafysignal.api.apply.controller;


import com.ssafysignal.api.apply.entity.Apply;
import com.ssafysignal.api.global.db.entity.CommonCode;
import com.ssafysignal.api.global.response.BasicResponse;
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

@Slf4j
@RequiredArgsConstructor
@Tag(name = "지원", description = "지원서 CRUD와 지원서 메모")
@RestController
@RequestMapping("/apply")

public class ApplyController {

    @GetMapping("")
    private ResponseEntity<BasicResponse> registApply() {
        log.info("registApply - Call");

//        CommonCode userCode = new CommonCode("US100", "일반 회원", "US", "회원 구분");
//        User user = new User(1, "박싸피", "abc@abc.com", "싸피드가자", 2023, 1, 1, "01012345678", LocalDateTime.now(), userCode, 100);
//        CommonCode postingCode = new CommonCode("PPS102", "모집중", "PPS", "작성한 공고 상태 구분");
//        Posting posting = new Posting(1, user, "공고 테스트", LocalDateTime.now(), LocalDateTime.now(), 5, postingCode, LocalDateTime.now());
//
//        Apply apply = new Apply(1, user, posting, "fdsa", "fsd");


        return ResponseEntity.ok().body(BasicResponse.Body("success", "지원서 등록 성공", "지원서 등록 성공입니다"));
    }

}