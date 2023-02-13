package com.ssafysignal.api.signalweek.dto.response;

import com.ssafysignal.api.signalweek.entity.SignalweekSchedule;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FindAllSignalweekScheduleResponse {
    private Integer signalweekScheduleSeq;
    private Integer year;
    private Integer quarter;

    public static FindAllSignalweekScheduleResponse fromEntity(SignalweekSchedule signalweekSchedule) {
        return FindAllSignalweekScheduleResponse.builder()
                .signalweekScheduleSeq(signalweekSchedule.getSignalweekScheduleSeq())
                .year(signalweekSchedule.getYear())
                .quarter(signalweekSchedule.getQuarter())
                .build();
    }
}
