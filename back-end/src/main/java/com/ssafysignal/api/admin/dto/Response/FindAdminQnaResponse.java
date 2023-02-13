package com.ssafysignal.api.admin.dto.Response;

import com.ssafysignal.api.board.entity.Qna;
import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Builder
public class FindAdminQnaResponse {

    private Integer qnaSeq;
    private Integer userSeq;
    private String title;
    private String content;
    private Boolean isTop;
    private Integer view;
    private String answer;
    private Boolean isAnswer;
    private LocalDateTime regDt;
    private Boolean isMyQna;

    public static FindAdminQnaResponse fromEntity(Qna qna, Boolean isMyQna){
        return FindAdminQnaResponse.builder()
                .qnaSeq(qna.getQnaSeq())
                .userSeq(qna.getUserSeq())
                .title(qna.getTitle())
                .content(qna.getContent())
                .isTop(qna.getIsTop())
                .view(qna.getView())
                .answer(qna.getAnswer())
                .isAnswer(qna.getIsAnswer())
                .regDt(qna.getRegDt())
                .isMyQna(isMyQna)
                .build();
    }
}
