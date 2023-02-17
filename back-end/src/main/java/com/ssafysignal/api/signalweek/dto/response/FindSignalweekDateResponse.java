package com.ssafysignal.api.signalweek.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafysignal.api.signalweek.entity.SignalweekSchedule;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FindSignalweekDateResponse {
    private Integer signalweekScheduleSeq;
    @JsonFormat(pattern = "yyyy-MM-dd", shape = JsonFormat.Shape.STRING)
    private LocalDate openStartDt;
    @JsonFormat(pattern = "yyyy-MM-dd", shape = JsonFormat.Shape.STRING)
    private LocalDate openEndDt;
    @JsonFormat(pattern = "yyyy-MM-dd", shape = JsonFormat.Shape.STRING)
    private LocalDate voteStartDt;
    @JsonFormat(pattern = "yyyy-MM-dd", shape = JsonFormat.Shape.STRING)
    private LocalDate voteEndDt;
    private Integer quarter;
    private Integer year;

    public static FindSignalweekDateResponse fromEntity(SignalweekSchedule signalweekSchedule){
        return FindSignalweekDateResponse.builder()
                .signalweekScheduleSeq(signalweekSchedule.getSignalweekScheduleSeq())
                .openStartDt(signalweekSchedule.getOpenStartDt())
                .openEndDt(signalweekSchedule.getOpenEndDt())
                .voteStartDt(signalweekSchedule.getVoteStartDt())
                .voteEndDt(signalweekSchedule.getVoteEndDt())
                .quarter(signalweekSchedule.getQuarter())
                .year(signalweekSchedule.getYear())
                .build();
    }
}
