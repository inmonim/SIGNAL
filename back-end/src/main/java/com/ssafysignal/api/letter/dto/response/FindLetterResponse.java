package com.ssafysignal.api.letter.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Data;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Data
@ApiModel(value = "FindFromLetterRes", description = "보낸 쪽지 목록")
public class FindLetterResponse {
    int LetterSeq;
    String fromNickname;
    String toNickname;
    String title;
    String content;
    boolean isRead;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", shape = JsonFormat.Shape.STRING)
    LocalDateTime regDt;

    @Builder
    public FindLetterResponse(int letterSeq, String fromNickname, String toNickname, String title, String content, boolean isRead, LocalDateTime regDt) {
        LetterSeq = letterSeq;
        this.fromNickname = fromNickname;
        this.toNickname = toNickname;
        this.title = title;
        this.content = content;
        this.isRead = isRead;
        this.regDt = regDt;
    }
}
