package com.ssafysignal.api.profile.dto.response;


import com.ssafysignal.api.profile.entity.UserHeartLog;
import io.swagger.annotations.ApiModel;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

@Data
@ApiModel(value = "HeartLogAllResponse")
public class HeartLogAllResponse {

    @Schema(description = "하트 로고 목록", required = true)
    List<HeartLogResponse> heartLogList;

    private HeartLogAllResponse(final List<HeartLogResponse> heartLogList) {
        this.heartLogList = heartLogList;
    }


    public static HeartLogAllResponse fromEntity(final List<UserHeartLog> findHeartLogList) {
        return new HeartLogAllResponse(findHeartLogList.stream()
                .map(HeartLogResponse::fromEntity)
                .collect(Collectors.toList()));
    }
}
