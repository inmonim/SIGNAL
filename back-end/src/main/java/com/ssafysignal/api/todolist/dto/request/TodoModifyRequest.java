package com.ssafysignal.api.todolist.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TodoModifyRequest {
    @Schema(description = "내용")
    private String content;

}




