package com.ssafysignal.api.project.dto.request;

import com.ssafysignal.api.common.entity.CommonCode;
import com.ssafysignal.api.project.entity.ProjectPosition;
import io.swagger.annotations.ApiModel;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@ApiModel(value = "ProjectMemberModifyDto", description = "프로젝트 포지션 정보")
public class ProjectMemberModifyDto {
    @Schema(description = "포지션")
    private CommonCode position;
    @Schema(description = "포지션 수")
    private Integer positionCnt;

    public static ProjectMemberModifyDto fromEntity(final ProjectPosition projectPosition){
        return ProjectMemberModifyDto.builder()
                .position(projectPosition.getCode())
                .positionCnt(projectPosition.getPositionCnt())
                .build();
    }
}
