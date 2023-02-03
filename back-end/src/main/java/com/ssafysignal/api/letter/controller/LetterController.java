package com.ssafysignal.api.letter.controller;

import com.ssafysignal.api.global.response.BasicResponse;
import com.ssafysignal.api.global.response.ResponseCode;
import com.ssafysignal.api.letter.dto.request.DeleteLetterSeqListRequest;
import com.ssafysignal.api.letter.dto.request.DeleteLetterSeqRequest;
import com.ssafysignal.api.letter.dto.request.SendLetterRequest;
import com.ssafysignal.api.letter.dto.response.CountNotReadLetterResponse;
import com.ssafysignal.api.letter.dto.response.FindLetterResponse;
import com.ssafysignal.api.letter.entity.Letter;
import com.ssafysignal.api.letter.service.LetterService;
import com.ssafysignal.api.user.entity.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Tag(name = "쪽지", description = "쪽지를 CRUD 할 수 있는 컨트롤러")
@RestController
@RequestMapping("/letter")
public class LetterController {

    private final LetterService letterService;

    @Tag(name = "쪽지")
    @Operation(summary = "쪽지 전송", description = "사용자 nickname을 기준으로 쪽지 전송")
    @PostMapping("")
    private ResponseEntity<BasicResponse> sendLetter(@Parameter(description = "전송 쪽지", required = true) @RequestBody SendLetterRequest sendLetter) {
        log.info("sendLetter - Call");
        String nickname = sendLetter.getNickname();
        User toUser = letterService.findUserSeq(nickname);
        if(toUser == null){
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.LETTERSEND_FAIL, null));
        }
        int toUserSeq = toUser.getUserSeq();

        Letter letter = Letter.builder()
                .fromUserSeq(sendLetter.getUserSeq())
                .toUserSeq(toUserSeq)
                .title(sendLetter.getTitle())
                .content(sendLetter.getContent())
                .build();
        Letter ret = letterService.registLetter(letter);
        //System.out.println(ret);
        return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, ret));
    }

    @Tag(name = "쪽지")
    @Operation(summary = "보낸 쪽지 목록 조희", description = "userSeq 기준으로 보낸 쪽지 목록 조회")
    @GetMapping("/from/{userSeq}")
    private ResponseEntity<BasicResponse> findAllFromLetter(@Parameter(description = "유저seq", required = true) @PathVariable int userSeq) {
        List<FindLetterResponse> letterList= letterService.findFromLetter(userSeq);
        return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, letterList));
    }

    @Tag(name = "쪽지")
    @Operation(summary = "받은 쪽지 목록 조희", description = "userSeq 기준으로 받은 쪽지 목록 조회")
    @GetMapping("/to/{userSeq}")
    private ResponseEntity<BasicResponse> findAllToLetter(@Parameter(description = "유저seq", required = true) @PathVariable int userSeq) {
        List<FindLetterResponse> letterList= letterService.findAllToLetter(userSeq);
        //System.out.println(letterList);
        return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, letterList));
    }

    @Tag(name = "쪽지")
    @Operation(summary = "휴지통 쪽지 목록 조희", description = "받은 쪽지 중 휴지통 쪽지 목록 조회")
    @GetMapping("/trash/{userSeq}")
    private ResponseEntity<BasicResponse> findAllTrashLetter(@Parameter(description = "유저seq", required = true) @PathVariable int userSeq) {
        List<FindLetterResponse> letterList= letterService.findAllTrashLetter(userSeq);
        return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, letterList));
    }

    @Tag(name = "쪽지")
    @Operation(summary = "쪽지 상세 조회", description = "쪽지 seq로 쪽지 상세 조회")
    @GetMapping("/{letterSeq}")
    private ResponseEntity<BasicResponse> findLetter(@Parameter(description = "쪽지seq", required = true) @PathVariable int letterSeq){
        System.out.println("뭐냐");
        FindLetterResponse res = letterService.findLetter(letterSeq);
        if(res == null) return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.NOT_FOUND, null));

        return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, res));
    }

    @Tag(name = "쪽지")
    @Operation(summary = "쪽지 휴지통 보내기", description = "쪽지seq에 해당하는 쪽지 휴지통 보내기")
    @DeleteMapping("/{letterSeq}")
    private ResponseEntity<BasicResponse> deleteLetter(@Parameter(description = "쪽지seq", required = true) @PathVariable int letterSeq){
        Letter res = letterService.deleteLetter(letterSeq);
        if(res == null) return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.NOT_FOUND, null));

        return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, res));
    }

    @Tag(name = "쪽지")
    @Operation(summary = "쪽지 리스트 휴지통 보내기", description = "쪽지seq 리스트에 해당하는 쪽지 휴지통 보내기")
    @DeleteMapping("/list")
    private ResponseEntity<BasicResponse> deleteListLetter(@Parameter(description = "쪽지seq 리스트", required = true)@RequestBody DeleteLetterSeqListRequest deleteLetterSeqList){
        List<DeleteLetterSeqRequest> letterSeqList = deleteLetterSeqList.getLetterSeqList();
        for(DeleteLetterSeqRequest deleteLetterSeqRequest : letterSeqList){
            int letterSeq = deleteLetterSeqRequest.getLetterSeq();
            letterService.deleteLetter(letterSeq);
        }
        return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
    }


    @Tag(name = "쪽지")
    @Operation(summary = "안읽은 쪽지 갯수 구하기", description = "유저seq가 받은 쪽지 중 안읽은 쪽지 갯수 구하기")
    @GetMapping("/read/{userSeq}")
    private ResponseEntity<BasicResponse> countNotReadLetter(@Parameter(description = "유저seq", required = true) @PathVariable int userSeq){
        Long cnt = letterService.countNotReadLetter(userSeq);

        CountNotReadLetterResponse res = CountNotReadLetterResponse.builder()
                .count(cnt)
                .build();
        return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, res));     
    }

    
}
