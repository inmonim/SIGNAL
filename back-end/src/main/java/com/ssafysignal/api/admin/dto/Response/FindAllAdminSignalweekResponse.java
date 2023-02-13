package com.ssafysignal.api.admin.dto.Response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class FindAllAdminSignalweekResponse {
    private List<FindAdminSignalWeekResponse> signalweekList;
    private Long count;
}
