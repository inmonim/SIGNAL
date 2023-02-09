package com.ssafysignal.api.project.dto.reponse;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafysignal.api.project.entity.Project;
import io.swagger.annotations.ApiModel;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@ApiModel(value = "ProjectFindResponse", description = "프로젝트 상세 정보")
public class ProjectFindResponse {
    @Schema(description = "프로젝트 주제")
    private String subject;
    @Schema(description = "프로젝트 설명")
    private String content;
    @Schema(description = "평가 예정일자")
    @JsonFormat(pattern = "yyyy-MM-dd", shape = JsonFormat.Shape.STRING)
    private LocalDate evaluationDt;
    @Schema(description = "프로젝트 진행 회차")
    private Integer weekCnt;
    @Schema(description = "프로젝트 내 남은 하트 개수")
    private Integer heartCnt;
    @Schema(description = "프로젝트 내 경고 개수")
    private Integer warningCnt;
    @Schema(description = "프로젝트 팀 구성원 nickname 목록")
    private List<Object> projectUserList;

    public static ProjectFindResponse fromEntity(final Project project){
        return ProjectFindResponse.builder()
                .subject(project.getSubject())
                .content(project.getContent())
                .evaluationDt(project.getEvaluationDt())
                .weekCnt(project.getWeekCnt())
                .build();
    }
}
