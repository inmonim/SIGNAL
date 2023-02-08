package com.ssafysignal.api.project.dto.reponse;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafysignal.api.common.entity.CommonCode;
import com.ssafysignal.api.project.entity.Project;
import com.ssafysignal.api.project.entity.ProjectPosition;
import io.swagger.annotations.ApiModel;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Data
@Builder
@ApiModel(value = "ProjectSettingFindResponse", description = "프로젝트 설정 정보")
public class ProjectSettingFindResponse {
    @Schema(description = "프로젝트 주제")
    private String subject;
    @Schema(description = "프로젝트 진행 지역")
    private CommonCode local;
    @Schema(description = "분야")
    private CommonCode field;
    @Schema(description = "대면 비대면 여부")
    private boolean isContact;
    @Schema(description = "프로젝트 기간")
    private Integer term;
    @Schema(description = "프로젝트 설명")
    private String content;
    @Schema(description = "프로젝트 Git URL")
    private String gitUrl;
    @Schema(description = "프로젝트 대표 이미지 URL")
    private String projectImageUrl;
    @Schema(description = "프로젝트 포지션 목록")
    private List<ProjectSettingFindDto> position;

    public static ProjectSettingFindResponse fromEntity(final Project project){
        return ProjectSettingFindResponse.builder()
                .subject(project.getSubject())
                .local(project.getLocal())
                .field(project.getField())
                .isContact(project.isContact())
                .term(project.getTerm())
                .content(project.getContent())
                .gitUrl(project.getGitUrl())
                .projectImageUrl(project.getImageFile().getUrl())
                .position(project.getProjectPositionList().stream()
                        .map(ProjectSettingFindDto::fromEntity)
                        .collect(Collectors.toList()))
                .content(project.getContent())

                .build();
    }
}
