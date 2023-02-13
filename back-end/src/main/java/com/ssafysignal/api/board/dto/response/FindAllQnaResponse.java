package com.ssafysignal.api.board.dto.response;

import com.ssafysignal.api.board.entity.Qna;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class FindAllQnaResponse {

    @Schema(description = "QnA 목록")
    private List<FindQnaResponse> qnaList;

    private FindAllQnaResponse(final List<FindQnaResponse> qnaList) {
        this.qnaList = qnaList;
    }

    public static FindAllQnaResponse fromEntity(final Page<Qna> findQnaList) {
        List<FindQnaResponse> qnaList = findQnaList.stream()
                .map(FindQnaResponse::fromEntity)
                .collect(Collectors.toList());
        return new FindAllQnaResponse(qnaList);
    }
}
