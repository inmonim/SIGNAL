package com.ssafysignal.api.project.dto.reponse;

import com.ssafysignal.api.project.entity.ProjectEvaluationQuestion;
import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@Builder
public class FindEvaluationResponse {
    private Integer weekCnt;
    private List<Map<String, Object>> questionList;

    public static FindEvaluationResponse fromEntity(Integer weekCnt, List<ProjectEvaluationQuestion> projectEvaluationQuestionList){
        List<Map<String, Object>> questionList = new ArrayList<>();
        for (ProjectEvaluationQuestion p : projectEvaluationQuestionList){
            questionList.add(new HashMap<String, Object>() {{
                put("num", p.getProjectEvaluationQuestionSeq());
                put("content", p.getContent());
            }});
        }

        return FindEvaluationResponse.builder()
                .weekCnt(weekCnt)
                .questionList(questionList)
                .build();
    }
}
