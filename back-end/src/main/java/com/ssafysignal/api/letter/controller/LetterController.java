package com.ssafysignal.api.letter.controller;

import com.ssafysignal.api.global.common.response.BasicResponse;
import com.ssafysignal.api.letter.dto.request.DeleteLetterSeqListReq;
import com.ssafysignal.api.letter.dto.request.DeleteLetterSeqReq;
import com.ssafysignal.api.letter.dto.request.SendLetterReq;
import com.ssafysignal.api.letter.dto.response.FindLetterRes;
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
    private ResponseEntity<BasicResponse> sendLetter(@Parameter(description = "전송 쪽지", required = true) @RequestBody SendLetterReq sendLette) {
        log.info("sendLetter - Call");
        String nickname = sendLette.getNickname();
        User toUser = letterService.findUserSeq(nickname);
        if(toUser == null){
            return ResponseEntity.badRequest().body(BasicResponse.Body("fail", "존재하지 않는 nickname입니다.", null));
        }
        int toUserSeq = toUser.getUserSeq();

        Letter letter = Letter.builder()
                .fromUserSeq(sendLette.getUserSeq())
                .toUserSeq(toUserSeq)
                .title(sendLette.getTitle())
                .content(sendLette.getContent())
                .build();
        //System.out.println("letter:"+letter);
        Letter ret = letterService.registLetter(letter);
        //System.out.println(ret);
        return ResponseEntity.ok().body(BasicResponse.Body("success", "쪽지 전송이 성공했습니다.", ret));
    }

    @Tag(name = "쪽지")
    @Operation(summary = "보낸 쪽지 목록 조희", description = "userSeq 기준으로 보낸 쪽지 목록 조회")
    @GetMapping("/from/{userSeq}")
    private ResponseEntity<BasicResponse> findAllFromLetter(@Parameter(description = "유저seq", required = true) @PathVariable int userSeq,
                                                            @Parameter(description = "page", required = true)  int page,
                                                            @Parameter(description = "size", required = true)  int size) {
        List<FindLetterRes> letterList= letterService.findFromLetter(userSeq,page,size);
        //System.out.println(letterList);
        return ResponseEntity.ok().body(BasicResponse.Body("success", "보낸 쪽지 조회가 성공했습니다.", letterList));
    }

    @Tag(name = "쪽지")
    @Operation(summary = "받은 쪽지 목록 조희", description = "userSeq 기준으로 받은 쪽지 목록 조회")
    @GetMapping("/to/{userSeq}")
    private ResponseEntity<BasicResponse> findAllToLetter(@Parameter(description = "유저seq", required = true) @PathVariable int userSeq,
                                                          @Parameter(description = "page", required = true)  int page,
                                                          @Parameter(description = "size", required = true)  int size) {
        List<FindLetterRes> letterList= letterService.findAllToLetter(userSeq,page,size);
        //System.out.println(letterList);
        return ResponseEntity.ok().body(BasicResponse.Body("success", "받은 쪽지 조회가 성공했습니다.", letterList));
    }

    @Tag(name = "쪽지")
    @Operation(summary = "휴지통 쪽지 목록 조희", description = "받은 쪽지 중 휴지통 쪽지 목록 조회")
    @GetMapping("/trash/{userSeq}")
    private ResponseEntity<BasicResponse> findAllTrashLetter(@Parameter(description = "유저seq", required = true) @PathVariable int userSeq,
                                                             @Parameter(description = "page", required = true)  int page,
                                                             @Parameter(description = "size", required = true)  int size) {
        List<FindLetterRes> letterList= letterService.findAllTrashLetter(userSeq,page,size);
        //System.out.println(letterList);
        return ResponseEntity.ok().body(BasicResponse.Body("success", "휴지통 쪽지 조회가 성공했습니다.", letterList));
    }

    @Tag(name = "쪽지")
    @Operation(summary = "쪽지 상세 조회", description = "쪽지 seq로 쪽지 상세 조회")
    @GetMapping("/{letterSeq}")
    private ResponseEntity<BasicResponse> findLetter(@Parameter(description = "쪽지seq", required = true) @PathVariable int letterSeq){
        FindLetterRes res = letterService.findLetter(letterSeq);
        if(res == null) return ResponseEntity.badRequest().body(BasicResponse.Body("fail", "존재하지 않는 메시지 입니다.", null));

        return ResponseEntity.ok().body(BasicResponse.Body("success", "쪽지 상세 조회가 성공했습니다.", res));
    }

    @Tag(name = "쪽지")
    @Operation(summary = "쪽지 휴지통 보내기", description = "쪽지seq에 해당하는 쪽지 휴지통 보내기")
    @DeleteMapping("/{letterSeq}")
    private ResponseEntity<BasicResponse> deleteLetter(@Parameter(description = "쪽지seq", required = true) @PathVariable int letterSeq){
        Letter res = letterService.deleteLetter(letterSeq);
        if(res == null) return ResponseEntity.badRequest().body(BasicResponse.Body("fail", "존재하지 않거나 이미 삭제된 메시지 입니다.", null));

        return ResponseEntity.ok().body(BasicResponse.Body("success", "쪽지를 삭제했습니다.", res));
    }

    @Tag(name = "쪽지")
    @Operation(summary = "쪽지 리스트 휴지통 보내기", description = "쪽지seq 리스트에 해당하는 쪽지 휴지통 보내기")
    @DeleteMapping("/list")
    private ResponseEntity<BasicResponse> deleteListLetter(@Parameter(description = "쪽지seq 리스트", required = true)@RequestBody DeleteLetterSeqListReq deleteLetterSeqList){
        List<DeleteLetterSeqReq> letterSeqList = deleteLetterSeqList.getLetterSeqList();
        for(DeleteLetterSeqReq deleteLetterSeqReq : letterSeqList){
            int letterSeq = deleteLetterSeqReq.getLetterSeq();
            letterService.deleteLetter(letterSeq);
        }
        return ResponseEntity.ok().body(BasicResponse.Body("success", "리스트에 해당하는 모든 쪽지를 삭제했습니다.", null));
    }
}
