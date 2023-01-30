package com.ssafysignal.api.posting.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.ssafysignal.api.common.entity.CommonCode;
import com.ssafysignal.api.posting.entity.*;
import com.ssafysignal.api.project.entity.Project;
import io.swagger.annotations.ApiModel;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@ApiModel(value = "PostingFindResponse", description = "공고 상세")
public class PostingFindResponse {
    @Schema(description = "공고 Seq", example = "1", required = true)
    private Integer postingSeq;
    @Schema(description = "프로젝트 주제", example = "프로젝트 팀 빌딩 시스템 시그널", required = true)
    private String subject;
    @Schema(description = "지역 코드", example = "11", required = true)
    private String localCode;
    @Schema(description = "분야 코드", example = "FI100", required = true)
    private String fieldCode;
    @Schema(description = "대면 여부", example = "true", required = true)
    private Boolean isContact;
    @Schema(description = "프로젝트 기간", example = "3", required = true)
    private Integer term;
    @Schema(description = "공고 설명", example = "1", required = true)
    private String content;
    @Schema(description = "공고 모집 마감 일자", example = "2023-01-01 11:00:00.000", required = true)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSS", shape = JsonFormat.Shape.STRING)
    private LocalDateTime postingEndDt;
    @Schema(description = "프로젝트 난이도", example = "5", required = true)
    private Integer level;
    @Schema(description = "공고 기술 스택")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private final List<PostingSkill> postingSkillList;
    @Schema(description = "공고 사전 미팅 시간")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<PostingMeeting> postingMeetingList;
    @Schema(description = "공고 포지션")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<PostingPosition> postingPositionList;
    @Schema(description = "공고 사전 질문")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<PostingQuestion> postingQuestionList;

    @Schema(description = "공고 상태 코드")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private CommonCode postingCode;
    @Schema(description = "총 모집 인원")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer totalCnt;
    @Schema(description = "모집 된 인원")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer selectCnt;

    public static PostingFindResponse fromEntity(final Project project) {
        return PostingFindResponse.builder()
                .postingSeq(project.getPosting().getPostingSeq())
                .subject(project.getSubject())
                .localCode(project.getLocalCode())
                .fieldCode(project.getFieldCode())
                .isContact(project.isContact())
                .term(project.getTerm())
                .content(project.getPosting().getContent())
                .postingEndDt(project.getPosting().getPostingEndDt())
                .level(project.getPosting().getLevel())
                .postingMeetingList(project.getPosting().getPostingMeetingList())
                .postingPositionList(project.getPosting().getPostingPositionList())
                .postingQuestionList(project.getPosting().getPostingQuestionList())
                .postingSkillList(project.getPosting().getPostingSkillList())
                .build();
    }
}
