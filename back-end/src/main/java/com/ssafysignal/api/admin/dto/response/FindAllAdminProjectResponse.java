package com.ssafysignal.api.admin.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class FindAllAdminProjectResponse {
    private List<FindAdminProjectResponse> projectList;
    private Long count;
}
