package com.ssafysignal.api.posting.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "PostingBasicRequest", description = "공고 등록, 공고 수정을 위한 정보")
public class PostingBasicRequest {
    @Schema(description = "공고 작성자 Seq", example = "1")
    private Integer userSeq;
    @Schema(description = "프로젝트 주제", example = "프로젝트 팀 빌딩 시스템 시그널", required = true)
    private String subject;
    @Schema(description = "지역 코드", example = "11", required = true)
    private String localCode;
    @Schema(description = "분야 코드", example = "FI100", required = true)
    private String fieldCode;
    @Schema(description = "대면 여부", example = "true", required = true)
    private boolean isContact;
    @Schema(description = "프로젝트 기간", example = "3", required = true)
    private Integer term;
    @Schema(description = "공고 설명", example = "1", required = true)
    private String content;
    @Schema(description = "팀장 포지션", required = true)
    private String leaderPosition;
    @Schema(description = "공고 모집 마감 일자", example = "2023-01-01 11:00:00.000", required = true)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSS", shape = JsonFormat.Shape.STRING)
    private LocalDateTime postingEndDt;
    @Schema(description = "프로젝트 난이도", example = "5", required = true)
    private Integer level;
    @Schema(description = "공고 기술 스택")
    private List<String> postingSkillList;
    @Schema(description = "공고 사전 미팅 시간", example = "2023-01-01 11:00:00.000")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSS", shape = JsonFormat.Shape.STRING)
    private List<LocalDateTime> postingMeetingList;
    @Schema(description = "공고 포지션")
    private List<Map<String, Object>> postingPositionList;
    @Schema(description = "공고 사전 질문")
    private List<Map<String, Object>> postingQuestionList;
}
