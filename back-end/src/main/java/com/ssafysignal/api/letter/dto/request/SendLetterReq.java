package com.ssafysignal.api.letter.dto.request;

import lombok.Getter;

@Getter
public class SendLetterReq {
    private int userSeq;
    private String nickname;
    private String title;
    private String content;

}
