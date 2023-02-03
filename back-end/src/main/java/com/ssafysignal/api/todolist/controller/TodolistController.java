package com.ssafysignal.api.todolist.controller;

import com.ssafysignal.api.global.response.BasicResponse;
import com.ssafysignal.api.global.response.ResponseCode;
import com.ssafysignal.api.todolist.dto.request.TodoRegistRequest;
import com.ssafysignal.api.todolist.service.TodolistService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@Tag(name = "ToDoList", description = "ToDoList API")
@RestController
@RequestMapping("/todo")
public class TodolistController {

    private final TodolistService todolistService;

    @Tag(name = "ToDoList")
    @Operation(summary = "ToDoList", description = "TodoList를 생성한다.")
    @PostMapping("")
    private ResponseEntity<BasicResponse> registTodo(@Parameter(description = "Todo 정보") @RequestBody TodoRegistRequest todoRegistRequest) {
        log.info("registTodo - Call");

        try {
            todolistService.registTodo(todoRegistRequest);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.REGIST_FAIL, null));
        }
    }


}
