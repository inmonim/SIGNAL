package com.ssafysignal.api.project.dto.reponse;

import com.ssafysignal.api.common.entity.CommonCode;
import com.ssafysignal.api.project.entity.Project;
import com.ssafysignal.api.project.entity.ProjectPosition;
import io.swagger.annotations.ApiModel;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@ApiModel(value = "ProjectSettingFindDto", description = "프로젝트 설정 정보 항목")
public class ProjectSettingFindDto {
    @Schema(description = "포지션")
    private CommonCode position;
    @Schema(description = "포지션 수")
    private Integer positionCnt;

    public static ProjectSettingFindDto fromEntity(final ProjectPosition projectPosition){
        return ProjectSettingFindDto.builder()
                .position(projectPosition.getCode())
                .positionCnt(projectPosition.getPositionCnt())
                .build();
    }
}
