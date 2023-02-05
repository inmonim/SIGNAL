package com.ssafysignal.api.signalweek.dto.response;

import io.swagger.annotations.ApiModel;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@ApiModel(value = "SignalweekFindResponse", description = "시그널 위크 프로젝트 상세 조회 response")
public class SignalweekFindResponse {

    @Schema(description = "title")
    private String title;

    @Schema(description = "pptUrl")
    private String pptUrl;

    @Schema(description = "readmeUrl")
    private String readmeUrl;

    @Schema(description = "uccUrl")
    private String uccUrl;

    @Schema(description = "deployUrl")
    private String deployUrl;

    @Schema(description = "content")
    private String content;

    @Schema(description = "투표 여부")
    private boolean vote;
}
