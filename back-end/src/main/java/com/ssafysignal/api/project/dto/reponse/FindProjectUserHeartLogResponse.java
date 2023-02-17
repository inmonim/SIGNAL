package com.ssafysignal.api.project.dto.reponse;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafysignal.api.project.entity.ProjectUserHeartLog;
import io.swagger.annotations.ApiModel;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;


@Data
@Builder
@ApiModel(value = "ProjectUserHeartLogResponse")
public class FindProjectUserHeartLogResponse {

    @Schema(description = "하트의 증감 갯수")
    Integer heartCnt;

    @Schema(description = "로그 날짜")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSS", shape = JsonFormat.Shape.STRING)
    LocalDateTime regDt;

    @Schema(description = "상세 내역")
    String content;

    public static FindProjectUserHeartLogResponse fromEntity(final ProjectUserHeartLog projectUserHeartLog) {
        return FindProjectUserHeartLogResponse.builder()
                .heartCnt(projectUserHeartLog.getHeartCnt())
                .regDt(projectUserHeartLog.getRegDt())
                .content(projectUserHeartLog.getContent())
                .build();
    }


}
