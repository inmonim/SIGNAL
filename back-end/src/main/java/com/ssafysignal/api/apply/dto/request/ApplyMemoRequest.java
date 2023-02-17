package com.ssafysignal.api.apply.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(description = "지원자 메모 정보")
public class ApplyMemoRequest {
    @Schema(name = "지원서 Seq")
    private Integer applySeq;
    @Schema(name = "메모")
    private String memo;
}
