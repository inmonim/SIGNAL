package com.ssafysignal.api.todolist.repository;

import com.ssafysignal.api.todolist.entity.Todolist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TodolistRepository extends JpaRepository<Todolist, Integer> {
    Optional<Todolist> findByProjectToDoSeq(Integer toDoSeq);
    List<Todolist> findByUserSeq(Integer userSeq);
}
