package com.ssafysignal.api.project.dto.reponse;

import io.swagger.annotations.ApiModel;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@ApiModel(value = "ProjectFindAllResponse", description = "프로젝트 목록 정보")
public class ProjectFindAllResponse {
    @Schema(description = "완료 된 프로젝트")
    private List<ProjectFindAllDto> endProjectList;
    @Schema(description = "진행 중인 프로젝트")
    private List<ProjectFindAllDto> ingProjectList;
}
