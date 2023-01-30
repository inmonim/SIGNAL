package com.ssafysignal.api.board.dto.response;

import com.ssafysignal.api.board.entity.Qna;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class QnaFindAllResponse {

    @Schema(description = "QnA 목록")
    List<QnaFindResponse> qnaList;

    private QnaFindAllResponse(final List<QnaFindResponse> qnaList) {
        this.qnaList = qnaList;
    }

    public static QnaFindAllResponse fromEntity(final Page<Qna> findQnaList) {
        List<QnaFindResponse> qnaList = findQnaList.stream()
                .map(QnaFindResponse::fromEntity)
                .collect(Collectors.toList());
        return new QnaFindAllResponse(qnaList);
    }
}
