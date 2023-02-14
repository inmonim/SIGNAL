package com.ssafysignal.api.todolist.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ModifyTodoRequest {
    @Schema(description = "내용")
    private String content;

}




