package com.ssafysignal.api.todolist.service;

import com.ssafysignal.api.todolist.dto.request.TodoRegistRequest;
import com.ssafysignal.api.todolist.entity.Todolist;
import com.ssafysignal.api.todolist.repository.TodolistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class TodolistService{
    private final TodolistRepository todolistRepository;

    @Transactional
    public void registTodo(TodoRegistRequest todoRegistRequest) {
        Todolist todo = Todolist.builder()
                .projectSeq(todoRegistRequest.getProjectSeq())
                .userSeq(todoRegistRequest.getUserSeq())
                .content(todoRegistRequest.getContent())
                .build();
        todolistRepository.save(todo);
    }
}
