package com.ssafysignal.api.todolist.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ApiModel(value = "RegistTodoRequest", description = "Todo 등록 정보")
public class TodoRegistRequest {

    @Schema(description = "프로젝트 seq")
    private Integer projectSeq;

    @Schema(description = "유저seq")
    private Integer userSeq;

    @Schema(description = "내용")
    private String content;
}
