package com.ssafysignal.api.project.dto.request;

import com.ssafysignal.api.profile.dto.response.HeartLogAllResponse;
import com.ssafysignal.api.profile.dto.response.HeartLogResponse;
import com.ssafysignal.api.profile.entity.UserHeartLog;
import com.ssafysignal.api.project.entity.ProjectUserHeartLog;
import io.swagger.annotations.ApiModel;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;


@Data
@ApiModel(value = "ProjectUserHeartLogAllResponse")
public class ProjectUserHeartLogAllResponse {

    @Schema(description = "프로젝트 유저 하트 로고 목록", required = true)
    List<ProjectUserHeartLogResponse> projectUserHeartLogList;

    private ProjectUserHeartLogAllResponse(final List<ProjectUserHeartLogResponse> projectUserHeartLogList) {
        this.projectUserHeartLogList = projectUserHeartLogList;
    }


    public static ProjectUserHeartLogAllResponse fromEntity(final List<ProjectUserHeartLog> findProjectUserHeartLogList) {
        return new ProjectUserHeartLogAllResponse(findProjectUserHeartLogList.stream()
                .map(ProjectUserHeartLogResponse::fromEntity)
                .collect(Collectors.toList()));
    }
}