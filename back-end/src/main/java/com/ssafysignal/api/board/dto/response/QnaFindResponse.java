package com.ssafysignal.api.board.dto.response;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafysignal.api.board.entity.Qna;
import io.swagger.annotations.ApiModel;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;
import springfox.documentation.spring.web.json.Json;

import java.time.LocalDateTime;

@Data
@Builder
@ApiModel(value = "QnaFindResponse", description = "QnA 상세 정보")
public class QnaFindResponse {

    @Schema(description = "QnA Seq", required = true)
    private Integer qnaSeq;

    @Schema(description = "user Seq", required = true)
    private Integer userSeq;

    @Schema(description = "Qna 제목", required = true)
    private String title;

    @Schema(description = "Qna 본문", required = true)
    private String content;

    @Schema(description = "qna 조회수")
    private Integer view;

    @Schema(description = "관리자 답변")
    private String answer;

    @Schema(description = "답변 완료 여부")
    private Boolean isAnswer;

    @Schema(description = "FAQ 여부")
    private Boolean isTop;

    @Schema(description = "작성시간")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSS", shape = JsonFormat.Shape.STRING)
    private LocalDateTime regDt;

    public static QnaFindResponse fromEntity(final Qna qna) {
        return QnaFindResponse.builder()
                .qnaSeq(qna.getQnaSeq())
                .userSeq(qna.getUserSeq())
                .title(qna.getTitle())
                .content(qna.getContent())
                .isAnswer(qna.getIsAnswer())
                .answer(qna.getAnswer())
                .isTop(qna.getIsTop())
                .view(qna.getView())
                .regDt(qna.getRegDt())
                .build();
    }
}