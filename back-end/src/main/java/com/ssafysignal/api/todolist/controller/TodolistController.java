package com.ssafysignal.api.todolist.controller;

import com.ssafysignal.api.global.response.BasicResponse;
import com.ssafysignal.api.global.response.ResponseCode;
import com.ssafysignal.api.todolist.dto.request.TodoModifyRequest;
import com.ssafysignal.api.todolist.dto.request.TodoRegistRequest;
import com.ssafysignal.api.todolist.dto.response.TodolistFindResponse;
import com.ssafysignal.api.todolist.entity.Todolist;
import com.ssafysignal.api.todolist.repository.TodolistRepository;
import com.ssafysignal.api.todolist.service.TodolistService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Tag(name = "ToDoList", description = "ToDoList API")
@RestController
@RequestMapping("/todo")
public class TodolistController {

    private final TodolistService todolistService;

    @Tag(name = "ToDoList")
    @Operation(summary = "ToDoList 등록", description = "To Do List를 생성한다.")
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

    @Tag(name = "ToDoList")
    @Operation(summary = "ToDoList 목록 조회", description = "To Do List 목록을 조회한다.")
    @GetMapping("")
    private ResponseEntity<BasicResponse> findAllTodoList(@Parameter(description = "UserSeq") Integer userSeq,
                                                          @Parameter(description = "porjectSeq") Integer projectSeq,
                                                          @Parameter(description = "reg_dt") String regDt) {
        log.info("findAllTodo - Call");

        try {
            List<TodolistFindResponse> toDoList = todolistService.findAllTodoList(userSeq, projectSeq, regDt);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, toDoList));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.NOT_FOUND, null));
        }
    }

    @Tag(name = "ToDoList")
    @Operation(summary = "ToDoList 상세 조회", description = "To Do를 조회한다.")
    @GetMapping("{toDoSeq}")
    private ResponseEntity<BasicResponse> findAllTodoList(@Parameter(description = "UserSeq") @PathVariable Integer toDoSeq){

        log.info("findAllTodo - Call");

        try {
            TodolistFindResponse toDo = todolistService.findTodo(toDoSeq);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, toDo));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.NOT_FOUND, null));
        }
    }

    @Tag(name = "TodoList")
    @Operation(summary = "ToDoList 수정", description = "To Do List 상태 및 내용을 수정한다")
    @PutMapping("{toDoSeq}")
    private ResponseEntity<BasicResponse> modifyTodo(@Parameter(name = "toDoSeq", description = "To Do Seq") @PathVariable Integer toDoSeq,
                                                     @Parameter @RequestBody TodoModifyRequest toDoListModifyRequest) {

        log.info(String.format("modifyTodo - %d - Call", toDoSeq));
        try {
            todolistService.modifyToDo(toDoSeq, toDoListModifyRequest);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.MODIFY_FAIL, null));
        }
    }

    @Tag(name = "TodoList")
    @Operation(summary = "ToDoLIST 삭제", description = "To Do List 삭제")
    @DeleteMapping("{toDoSeq}")
    private ResponseEntity<BasicResponse> deleteTodo(@Parameter(name = "ToDoSeq", description = "To Do seq") @PathVariable Integer toDoSeq) {
        log.info(String.format("delete - %d - call", toDoSeq));
        try {
            todolistService.deleteToDo(toDoSeq);
            return ResponseEntity.ok().body(BasicResponse.Body(ResponseCode.SUCCESS, null));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(BasicResponse.Body(ResponseCode.DELETE_FAIL, null));
        }
    }
}