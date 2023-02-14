package com.ssafysignal.api.apply.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafysignal.api.apply.entity.Apply;
import com.ssafysignal.api.common.entity.CommonCode;
import io.swagger.annotations.ApiModel;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "ApplyWriterFindResponse", description = "공고 지원자 기준 지원서 목록 항목")
public class FindApplyApplyerResponse {
    @Schema(description = "지원서 Seq", example = "1")
    private Integer applySeq;
    @Schema(description = "프로젝트 주제", example = "프로젝트 팀 빌딩 서비스 시그널")
    private String subject;
    @Schema(description = "지원자가 신청한 사전 미팅 시간")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSS", shape = JsonFormat.Shape.STRING)
    private LocalDateTime meetingDt;
    @Schema(description = "지원서의 진행 상황")
    private CommonCode stateCode;

    public static List<FindApplyApplyerResponse> toList(List<Apply> applyList){
        return applyList.stream()
                .map(FindApplyApplyerResponse::fromEntity)
                .collect(Collectors.toList());
    }
    public static FindApplyApplyerResponse fromEntity(Apply apply){
        return FindApplyApplyerResponse.builder()
                .applySeq(apply.getApplySeq())
                .subject(apply.getPosting().getProject().getSubject())
                .meetingDt(apply.getPostingMeeting() != null ? apply.getPostingMeeting().getMeetingDt() : null)
                .stateCode(apply.getState())
                .build();
    }
}
