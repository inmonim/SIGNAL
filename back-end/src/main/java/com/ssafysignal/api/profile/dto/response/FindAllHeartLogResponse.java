package com.ssafysignal.api.profile.dto.response;

import com.ssafysignal.api.profile.entity.UserHeartLog;
import io.swagger.annotations.ApiModel;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@ApiModel(value = "HeartLogAllResponse")
public class FindAllHeartLogResponse {
    @Schema(description = "하트 로고 목록", required = true)
    List<FindHeartLogResponse> heartLogList;

    private FindAllHeartLogResponse(final List<FindHeartLogResponse> heartLogList) {
        this.heartLogList = heartLogList;
    }

    public static FindAllHeartLogResponse fromEntity(final List<UserHeartLog> findHeartLogList) {
        return new FindAllHeartLogResponse(findHeartLogList.stream()
                .map(FindHeartLogResponse::fromEntity)
                .collect(Collectors.toList()));
    }
}
