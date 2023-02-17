package com.ssafysignal.api.letter.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
@ApiModel(value = "FindFromLetterRes", description = "보낸 쪽지 목록")
public class FindLetterResponse {
    Integer letterSeq;
    String fromNickname;
    String toNickname;
    String title;
    String content;
    boolean isRead;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", shape = JsonFormat.Shape.STRING)
    LocalDateTime regDt;
}
