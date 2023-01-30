package com.ssafysignal.api.project.dto.reponse;

import com.ssafysignal.api.project.entity.Project;
import io.swagger.annotations.ApiModel;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@ApiModel(value = "ProjectFindAllResponseItem", description = "프로젝트 목록 정보 항목")
public class ProjectFindAllDto {
    @Schema(description = "프로젝트 Seq")
    private Integer projectSeq;
    @Schema(description = "프로젝트 주제")
    private String subject;
    @Schema(description = "프로젝트 대표 이미지 URL")
    private String projectImageUrl;

    public static ProjectFindAllDto fromEntity(final Project project){
        return ProjectFindAllDto.builder()
                .projectSeq(project.getProjectSeq())
                .subject(project.getSubject())
                .projectImageUrl(project.getImageFile().getUrl())
                .build();
    }
}
