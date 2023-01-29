package com.ssafysignal.api.board.repository;

import com.ssafysignal.api.board.entity.Qna;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
public interface QnaRepository extends JpaRepository<Qna, Integer> {
    @Override
    Optional<Qna> findById(Integer qnaSeq);
}
