package com.ssafysignal.api.project.dto.reponse;

import com.ssafysignal.api.project.entity.ProjectUserHeartLog;
import io.swagger.annotations.ApiModel;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
@ApiModel(value = "ProjectUserHeartLogAllResponse")
public class FindAllProjectUserHeartLogResponse {
    @Schema(description = "프로젝트 유저 하트 로고 목록", required = true)
    List<FindProjectUserHeartLogResponse> projectUserHeartLogList;

    private FindAllProjectUserHeartLogResponse(final List<FindProjectUserHeartLogResponse> projectUserHeartLogList) {
        this.projectUserHeartLogList = projectUserHeartLogList;
    }

    public static FindAllProjectUserHeartLogResponse fromEntity(final List<ProjectUserHeartLog> findProjectUserHeartLogList) {
        return new FindAllProjectUserHeartLogResponse(findProjectUserHeartLogList.stream()
                .map(FindProjectUserHeartLogResponse::fromEntity)
                .collect(Collectors.toList()));
    }
}