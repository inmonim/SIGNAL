package com.ssafysignal.api.project.dto.request;

import com.ssafysignal.api.project.entity.ProjectEvaluationQuestion;
import io.swagger.annotations.ApiModel;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ApiModel(value = "ProjectEvaluationRegistRequest", description = "팀원 평가 등록 정보")
public class ProjectEvaluationRegistRequest {
    @Schema(description = "프로젝트 Seq")
    private Integer projectSeq;
    @Schema(description = "평가자")
    private Integer fromUserSeq;
    @Schema(description = "평가 대상")
    private Integer toUserSeq;
    @Schema(description = "평가 회차")
    private Integer term;
    @Schema(description = "평가 항목 별 점수")
    private List<Map<String, Integer>> scoreList;
}
