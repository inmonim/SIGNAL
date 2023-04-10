package com.ssafysignal.api.board.repository;

import com.ssafysignal.api.board.entity.Qna;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QnaRepository extends JpaRepository<Qna, Integer> {
    @Query(value = "select * from qna order by is_top desc, qna_seq desc limit :limit offset :offset", nativeQuery = true)
    List<Qna> findAllByIsTop(Integer limit, Integer offset);
}
