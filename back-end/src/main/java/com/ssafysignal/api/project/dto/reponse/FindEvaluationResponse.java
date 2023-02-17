package com.ssafysignal.api.project.dto.reponse;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafysignal.api.project.entity.Project;
import com.ssafysignal.api.project.entity.ProjectEvaluationQuestion;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@Builder
public class FindEvaluationResponse {
    private Integer weekCnt;
    @JsonFormat(pattern = "yyyy.MM.dd", shape = JsonFormat.Shape.STRING)
    private LocalDate evaluationStartDt;
    @JsonFormat(pattern = "yyyy.MM.dd", shape = JsonFormat.Shape.STRING)
    private LocalDate evaluationEndDt;
    private List<Map<String, Object>> questionList;

    public static FindEvaluationResponse fromEntity(Project project, List<ProjectEvaluationQuestion> projectEvaluationQuestionList){
        List<Map<String, Object>> questionList = new ArrayList<>();
        for (ProjectEvaluationQuestion p : projectEvaluationQuestionList){
            questionList.add(new HashMap<String, Object>() {{
                put("num", p.getProjectEvaluationQuestionSeq());
                put("content", p.getContent());
            }});
        }

        return FindEvaluationResponse.builder()
                .weekCnt(project.getWeekCnt())
                .evaluationStartDt(project.getEvaluationDt().minusDays(7))
                .evaluationEndDt(project.getEvaluationDt())
                .questionList(questionList)
                .build();
    }
}
