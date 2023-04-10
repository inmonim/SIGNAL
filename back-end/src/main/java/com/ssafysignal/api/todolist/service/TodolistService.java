package com.ssafysignal.api.todolist.service;

import com.ssafysignal.api.global.exception.NotFoundException;
import com.ssafysignal.api.global.response.ResponseCode;
import com.ssafysignal.api.todolist.dto.request.ModifyTodoRequest;
import com.ssafysignal.api.todolist.dto.request.RegistTodoRequest;
import com.ssafysignal.api.todolist.dto.response.FindTodolistResponse;
import com.ssafysignal.api.todolist.entity.Todolist;
import com.ssafysignal.api.todolist.repository.TodolistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TodolistService{
    private final TodolistRepository todolistRepository;

    @Transactional
    public void registTodo(RegistTodoRequest registTodoRequest) {
        Todolist todo = Todolist.builder()
                .projectSeq(registTodoRequest.getProjectSeq())
                .userSeq(registTodoRequest.getUserSeq())
                .content(registTodoRequest.getContent())
                .build();
        todolistRepository.save(todo);
    }
    @Transactional(readOnly=true)
    public List<FindTodolistResponse> findAllTodoList(Integer userSeq,
                                                      Integer projectSeq,
                                                      String regDt) {
        List<Todolist> toDoList = todolistRepository.findByUserSeq(userSeq);
        List<Todolist> responseTodolist = new ArrayList<>();

        for (Todolist toDo:toDoList) {
            if (toDo.getProjectSeq().equals(projectSeq)
                    && toDo.getRegDt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")).equals(regDt)) {
                responseTodolist.add(toDo);
            }
        }
        return responseTodolist
                .stream()
                .map(FindTodolistResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly=true)
    public FindTodolistResponse findTodo(Integer toDoSeq){
        Todolist toDo = todolistRepository.findByProjectToDoSeq(toDoSeq)
                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));

        return FindTodolistResponse.fromEntity(toDo);
    }

    @Transactional
    public void modifyToDo(Integer toDoSeq, ModifyTodoRequest modifyTodoRequest) {
        Todolist toDo = todolistRepository.findByProjectToDoSeq(toDoSeq)
                .orElseThrow(() -> new NotFoundException(ResponseCode.MODIFY_NOT_FOUND));

        toDo.setContent(modifyTodoRequest.getContent());

        todolistRepository.save(toDo);
    }

    @Transactional
    public void deleteToDo(Integer toDoSeq) {
        Todolist toDo = todolistRepository.findByProjectToDoSeq(toDoSeq)
                .orElseThrow(() -> new NotFoundException(ResponseCode.DELETE_FAIL));

        todolistRepository.delete(toDo);
    }

    @Transactional
    public void modifyStateTodo(Integer toDoSeq, boolean isComplete) {
        Todolist todo = todolistRepository.findById(toDoSeq)
                .orElseThrow(() -> new NotFoundException(ResponseCode.MODIFY_NOT_FOUND));

        if (isComplete) todo.setToDoCode("TD101");
        else todo.setToDoCode("TD100");
        todolistRepository.save(todo);
    }
}
