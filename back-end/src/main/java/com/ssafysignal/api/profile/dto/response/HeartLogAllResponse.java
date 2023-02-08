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
    private Integer heartLogAllPage;
    private Long heartLogTotalElements;


    public static HeartLogAllResponse fromEntity(final Page<UserHeartLog> findHeartLogList) {
        List<HeartLogResponse> heartLogList = findHeartLogList.stream()
                .map(HeartLogResponse::fromEntity)
                .collect(Collectors.toList());
        HeartLogAllResponse heartLogAllResponse = new HeartLogAllResponse(heartLogList);
        heartLogAllResponse.heartLogTotalElements = findHeartLogList.getTotalElements();
        heartLogAllResponse.heartLogAllPage = findHeartLogList.getTotalPages();

        return heartLogAllResponse;
    }
}
