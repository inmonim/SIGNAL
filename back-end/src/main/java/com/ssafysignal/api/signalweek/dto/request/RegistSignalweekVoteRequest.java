package com.ssafysignal.api.signalweek.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@ApiModel(value = "RegistSignalweekVoteRequest", description = "시그널 위크 투표 등록 정보")
public class RegistSignalweekVoteRequest {
    @Schema(name = "userSeq")
    private Integer userSeq;
    @Schema(name = "signalweekSeq")
    private Integer signalweekSeq;

}
