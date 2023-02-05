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
public class TodolistFindAllResponse {

    @Schema(description = "TodoList 목록", required = true)
    private List<TodolistFindResponse> todoList;

    private TodolistFindAllResponse(final List<TodolistFindResponse> todoList) {
        this.todoList = todoList;
    }

    public static TodolistFindAllResponse fromEntity(final List<Todolist> findTodoList) {
        List<TodolistFindResponse> todoList = findTodoList.stream()
                .map(TodolistFindResponse::fromEntity)
                .collect(Collectors.toList());
        return new TodolistFindAllResponse(todoList);
    }
}
