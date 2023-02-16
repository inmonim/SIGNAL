package com.ssafysignal.api.project.dto.reponse;

import com.ssafysignal.api.apply.entity.Apply;
import com.ssafysignal.api.common.entity.CommonCode;
import com.ssafysignal.api.posting.entity.PostingMeeting;
import io.swagger.annotations.ApiModel;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@ApiModel(value = "ProjectApplyResponse", description = "프로젝트 팀원 정보")
public class ProjectApplyDto {
    @Schema(description = "팀원 nickname")
    private String nickname;
    @Schema(description = "지원서 Seq")
    private Integer applySeq;
    @Schema(description = "사전 미팅 정보")
    private PostingMeeting postingMeeting;
    @Schema(description = "포지션")
    private CommonCode position;

    public static ProjectApplyDto fromEntity(Apply apply) {
        return ProjectApplyDto.builder()
                .nickname(apply.getUser().getNickname())
                .applySeq(apply.getApplySeq())
                .postingMeeting(apply.getPostingMeeting())
                .position(apply.getCode())
                .build();

    }
}
