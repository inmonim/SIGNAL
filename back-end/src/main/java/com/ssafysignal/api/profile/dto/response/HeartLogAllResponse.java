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
public class HeartLogAllResponse {

    @Schema(description = "하트 로고 목록")
    List<HeartLogResponse> heartLogList;

    private HeartLogAllResponse(final List<HeartLogResponse> heartLogList) {
        this.heartLogList = heartLogList;
    }

    public static HeartLogAllResponse fromEntity(final List<UserHeartLog> findHeartLogList) {
        List<HeartLogResponse> heartLogList = findHeartLogList.stream()
                .map(HeartLogResponse::fromEntity)
                .collect(Collectors.toList());
        return new HeartLogAllResponse(heartLogList);
    }
}
