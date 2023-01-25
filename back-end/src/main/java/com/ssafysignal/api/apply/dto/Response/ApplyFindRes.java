package com.ssafysignal.api.apply.dto.Response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafysignal.api.apply.entity.Apply;
import com.ssafysignal.api.apply.entity.ApplyCareer;
import com.ssafysignal.api.apply.entity.ApplyExp;
import com.ssafysignal.api.apply.entity.ApplySkill;
import com.ssafysignal.api.user.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@ApiModel(value = "ApplyFindResponse", description = "지원서 상세 조회")
public class ApplyFindRes {
    @Schema(description = "지원서 작성자 Seq", example = "1", required = true)
    private Integer userSeq;

    @Schema(description = "지원서 내용", example = "저는 프로젝트 팀 구하는 게 힘들었던 경험이 있어 이 프로젝트에 지원합니다.", required = true)
    private String content;

    @Schema(description = "팀장의 지원자에 대한 메모", example = "이 지원자는 열정이 있음")
    private String memo;

    @Schema(description = "팀장의 팀원 선택 여부", example = "false", required = true)
    private boolean isSelect;

    @Schema(description = "지원서 등록 일시", example = "2023-01-01 11:00:00.000", required = true)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSS", shape = JsonFormat.Shape.STRING)
    private LocalDateTime regDt;

    @Schema(description = "position 코드", example = "PO100", required = true)
    private String positionCode;

    @Schema(description = "현재 지원 상태에 대한 코드", example = "AS101", required = true)
    private String applyCode;

    @Schema(description = "지원을 등록한 공고의 Seq", example = "1", required = true)
    private Integer postingSeq;

    @Schema(description = "지원자의 경력 리스트")
    private List<ApplyCareer> applyCareerList = new ArrayList<>();

    @Schema(description = "지원자의 이전 프로젝트 리스트")
    private List<ApplyExp> applyExpList = new ArrayList<>();

    @Schema(description = "지원자의 기술 스택 리스트")
    private List<ApplySkill> applySkillList = new ArrayList<>();

    public static ApplyFindRes fromEntity(final Apply apply) {
        return ApplyFindRes.builder()
                .content(apply.getContent())
                .memo(apply.getMemo())
                .isSelect(apply.isSelect())
                .regDt(apply.getRegDt())
                .applyCode(apply.getApplyCode())
                .positionCode(apply.getPositionCode())
                .postingSeq(apply.getPostingSeq())
                .applyCareerList(apply.getApplyCareerList())
                .applyExpList(apply.getApplyExpList())
                .applySkillList(apply.getApplySkillList())
                .userSeq(apply.getUserSeq())
                .build();
    }
}
