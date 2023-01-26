package com.ssafysignal.api.letter.dto.response;

import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Data;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Setter
@ToString
@Data
@ApiModel(value = "FindFromLetterRes", description = "보낸 쪽지 목록")
public class FindLetterRes {
    int LetterSeq;
    String fromNickname;
    String toNickname;
    String title;
    String content;
    boolean isRead;
    LocalDateTime regDt;

    @Builder
    public FindLetterRes(int letterSeq, String fromNickname, String toNickname, String title, String content, boolean isRead, LocalDateTime regDt) {
        LetterSeq = letterSeq;
        this.fromNickname = fromNickname;
        this.toNickname = toNickname;
        this.title = title;
        this.content = content;
        this.isRead = isRead;
        this.regDt = regDt;
    }
}
