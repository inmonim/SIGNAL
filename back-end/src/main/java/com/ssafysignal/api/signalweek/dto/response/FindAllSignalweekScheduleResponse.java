package com.ssafysignal.api.signalweek.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class FindAllSignalweekScheduleResponse {
    private List<FindAllSignalweekScheduleResponseItem> signalweekList;
    private Long count;
}
