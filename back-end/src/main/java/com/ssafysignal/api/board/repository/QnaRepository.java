package com.ssafysignal.api.board.repository;

import com.ssafysignal.api.board.entity.Qna;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QnaRepository extends JpaRepository<Qna, Integer> {

    @Query(value = "(select * from qna where is_top = 1 order by qna_seq desc ) union all (select * from qna where is_top = 0  order by qna_seq desc  limit :limit offset :offset)", nativeQuery = true)
    List<Qna> findAllByIsTop(Integer limit, Integer offset);
}
