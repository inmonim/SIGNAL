package com.ssafysignal.api.todolist.dto.response;


import com.ssafysignal.api.common.entity.CommonCode;
import com.ssafysignal.api.todolist.entity.Todolist;
import io.swagger.annotations.ApiModel;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@ApiModel(value = "TodolistFindResponse", description = "To do 정보")
public class FindTodolistResponse {

    @Schema(description = "Todo Seq")
    private Integer projectToDoSeq;

    @Schema(description = "content")
    private String content;

    @Schema(description = "todo code")
    private CommonCode toDoCode;

    public static FindTodolistResponse fromEntity(final Todolist toDolist) {
        return FindTodolistResponse.builder()
                .projectToDoSeq(toDolist.getProjectToDoSeq())
                .content(toDolist.getContent())
                .toDoCode(toDolist.getCode())
                .build();
    }

}
