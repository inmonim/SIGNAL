package com.ssafysignal.api.admin.dto.Response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafysignal.api.signalweek.entity.SignalweekSchedule;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
public class FindAdminSignalWeekResponse {
    @Schema(description = "시그널 위크 등록 시작일자")
    @JsonFormat(pattern = "yyyy-MM-dd", shape = JsonFormat.Shape.STRING)
    private LocalDate openStartDt;
    @Schema(description = "시그널 위크 마감 시작일자")
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

    public static List<FindAdminSignalWeekResponse> toList(List<SignalweekSchedule> signalweekScheduleList){
        return signalweekScheduleList.stream().map(FindAdminSignalWeekResponse::fromEntity).collect(Collectors.toList());
    }

    public static FindAdminSignalWeekResponse fromEntity(SignalweekSchedule signalweekSchedule){
        return FindAdminSignalWeekResponse.builder()
                .openStartDt(signalweekSchedule.getOpenStartDt())
                .openEndDt(signalweekSchedule.getOpenEndDt())
                .voteStartDt(signalweekSchedule.getVoteStartDt())
                .voteEndDt(signalweekSchedule.getVoteEndDt())
                .quarter(signalweekSchedule.getQuarter())
                .year(signalweekSchedule.getYear())
                .build();
    }
}
