package com.ssafysignal.api.admin.dto.Response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafysignal.api.common.entity.CommonCode;
import com.ssafysignal.api.project.entity.Project;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
public class FindAdminProjectResponse {
    @Schema(description = "프로젝트 Seq")
    private Integer projectSeq;
    @Schema(description = "프로젝트 상태 코드")
    private CommonCode code;
    @Schema(description = "프로젝트 주제")
    private String subject;
    @Schema(description = "프로젝트 팀장")
    private Integer userSeq;
    @Schema(description = "프로젝트 팀장 닉네임")
    private String nickname;
    @Schema(description = "프로젝트 유저 인원 수")
    private Integer projectUserCnt;
    @Schema(description = "프로젝트 등록 일자")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSS", shape = JsonFormat.Shape.STRING)
    private LocalDateTime regDt;

    public static List<FindAdminProjectResponse> toList(List<Project> projectList){
        return projectList.stream().map(FindAdminProjectResponse::fromEntity).collect(Collectors.toList());
    }
    public static FindAdminProjectResponse fromEntity(Project project){
        return FindAdminProjectResponse.builder()
                .projectSeq(project.getProjectSeq())
                .code(project.getCode())
                .subject(project.getSubject())
                .userSeq(project.getPosting().getUser().getUserSeq())
                .nickname(project.getPosting().getUser().getNickname())
                .projectUserCnt(project.getProjectUserList().size())
                .regDt(project.getRegDt())
                .build();

    }
}
