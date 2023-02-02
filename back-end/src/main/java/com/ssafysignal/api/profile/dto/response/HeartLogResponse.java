package com.ssafysignal.api.profile.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafysignal.api.profile.entity.UserHeartLog;
import io.swagger.annotations.ApiModel;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
@ApiModel(value = "HeartLogResponse")
public class HeartLogResponse {


    @Schema(description = "하트의 증감 갯수")
    Integer heartCnt;

    @Schema(description = "로그 날짜")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSS", shape = JsonFormat.Shape.STRING)
    LocalDateTime regDt;

    @Schema(description = "상세 내역")
    String content;

    public static HeartLogResponse fromEntity(final UserHeartLog userHeartLog) {
        return HeartLogResponse.builder()
                .heartCnt(userHeartLog.getHeartCnt())
                .regDt(userHeartLog.getRegDt())
                .content(userHeartLog.getContent())
                .build();
    }
}
