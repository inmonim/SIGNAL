package com.ssafysignal.api.signalweek.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ApiModel(value = "SignalweekVoteRequest", description = "시그널 위크 투표 등록 정보")
public class SignalweekVoteRequest {

    @Schema(name = "userSeq")
    private Integer userSeq;

    @Schema(name = "signalweekSeq")
    private Integer signalweekSeq;

}
