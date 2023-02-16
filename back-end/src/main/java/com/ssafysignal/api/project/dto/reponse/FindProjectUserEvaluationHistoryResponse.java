package com.ssafysignal.api.project.dto.reponse;

import com.ssafysignal.api.project.entity.ProjectEvaluation;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FindProjectUserEvaluationHistoryResponse {
    private Integer num;
    private Integer score;

    public static List<FindProjectUserEvaluationHistoryResponse> toList(List<ProjectEvaluation> projectEvaluationList){
        return projectEvaluationList.stream()
                .map(FindProjectUserEvaluationHistoryResponse::fromEntity)
                .collect(Collectors.toList());
    }

    public static FindProjectUserEvaluationHistoryResponse fromEntity(ProjectEvaluation projectEvaluation){
        return FindProjectUserEvaluationHistoryResponse.builder()
                .num(projectEvaluation.getNum())
                .score(projectEvaluation.getScore())
                .build();
    }
}
