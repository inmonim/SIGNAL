package com.ssafysignal.api.admin.dto.Request;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BasicAdminSignalWeekRequest {
    @Schema(description = "등록 시작 일자")
    @JsonFormat(pattern = "yyyy-MM-dd", shape = JsonFormat.Shape.STRING)
    private LocalDate openStartDt;
    @Schema(description = "등록 마감 일자")
    @JsonFormat(pattern = "yyyy-MM-dd", shape = JsonFormat.Shape.STRING)
    private LocalDate openEndDt;
    @Schema(description = "투표 시작 일자")
    @JsonFormat(pattern = "yyyy-MM-dd", shape = JsonFormat.Shape.STRING)
    private LocalDate voteStartDt;
    @Schema(description = "투표 마감 일자")
    @JsonFormat(pattern = "yyyy-MM-dd", shape = JsonFormat.Shape.STRING)
    private LocalDate voteEndDt;
    @Schema(description = "분기")
    private Integer quarter;
    @Schema(description = "년도")
    private Integer year;
}
