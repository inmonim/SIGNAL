package com.ssafysignal.api.signalweek.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SignalweekRankFindResponse {

    @Schema(description = "signalweekSeq")
    private Integer signalweekSeq;

    @Schema(description = "시그널 위크 프로젝트 title")
    private String subject;

    @Schema(description = "프로젝트 대표 이미지 url")
    private String projectImageUrl;

    @Schema(description = "랭킹")
    private Integer rank;
}
