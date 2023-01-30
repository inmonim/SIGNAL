package com.ssafysignal.api.project.dto.reponse;

import com.ssafysignal.api.common.entity.CommonCode;
import com.ssafysignal.api.project.entity.ProjectUser;
import io.swagger.annotations.ApiModel;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@ApiModel(value = "ProjectUserFindAllDto", description = "프로젝트 팀 구성원 정보")
public class ProjectUserFindAllDto {
    @Schema(description = "사용자 Seq")
    private Integer userSeq;
    @Schema(description = "팀원 Seq")
    private Integer projectUserSeq;
    @Schema(description = "팀원 nickname")
    private String nickname;
    @Schema(description = "팀원 포지션")
    private CommonCode position;
    @Schema(description = "경고 횟수")
    private Integer warningCnt;
    @Schema(description = "팀원 프로필 이미지 Url")
    private String profileImageUrl;

    public static ProjectUserFindAllDto fromEntity(final ProjectUser projectUser){
        return ProjectUserFindAllDto.builder()
                .userSeq(projectUser.getUserSeq())
                .projectUserSeq(projectUser.getProjectUserSeq())
                .nickname(projectUser.getUser().getNickname())
                .position(projectUser.getCode())
                .warningCnt(projectUser.getWarningCnt())
                .profileImageUrl(projectUser.getUser().getImageFile().getUrl())
                .build();
    }
}
