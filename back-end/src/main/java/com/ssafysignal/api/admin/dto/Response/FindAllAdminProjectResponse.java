package com.ssafysignal.api.admin.dto.Response;

import com.ssafysignal.api.project.entity.Project;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
public class FindAllAdminProjectResponse {
    private List<FindAdminProjectResponse> projectList;
}
