package com.ssafysignal.api.todolist.dto.response;

import com.ssafysignal.api.todolist.entity.Todolist;
import io.swagger.annotations.ApiModel;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@ApiModel(value = "TodolistFindAllResponse", description = "To Do List 목록 정보")
public class FindAllTodolistResponse {
    @Schema(description = "TodoList 목록", required = true)
    private List<FindTodolistResponse> todoList;

    private FindAllTodolistResponse(final List<FindTodolistResponse> todoList) {
        this.todoList = todoList;
    }

    public static FindAllTodolistResponse fromEntity(final List<Todolist> findTodoList) {
        List<FindTodolistResponse> todoList = findTodoList.stream()
                .map(FindTodolistResponse::fromEntity)
                .collect(Collectors.toList());
        return new FindAllTodolistResponse(todoList);
    }
}
