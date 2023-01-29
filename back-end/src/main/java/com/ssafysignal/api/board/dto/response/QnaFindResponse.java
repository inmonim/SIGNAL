package com.ssafysignal.api.board.dto.response;


import com.ssafysignal.api.board.entity.Qna;
import io.swagger.annotations.ApiModel;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
@ApiModel(value = "QnaFindResponse", description = "QnA 상세 정보")
public class QnaFindResponse {

    // QnA 상세 조회는 findById로 모든 항목을 끌고 가도 괜찮을 것 같음.

    @Schema(description = "제목")
    private String title;

    @Schema(description = "Qna 본문")
    private String content;

    @Schema(description = "작성시간")
    private LocalDateTime regDt;

    public static QnaFindResponse fromEntity(final Qna qna) {
        return QnaFindResponse.builder()
                .title(qna.getTitle())
                .content(qna.getContent())
                .regDt(qna.getRegDt())
                .build();
    }
}