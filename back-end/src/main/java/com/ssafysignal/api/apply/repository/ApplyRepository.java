package com.ssafysignal.api.apply.repository;

import com.ssafysignal.api.apply.entity.Apply;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ApplyRepository extends JpaRepository<Apply, Integer>{
    List<Apply> findByUserSeq(Integer userSeq);
    Integer countByPostingSeq(Integer postingSeq);
    Integer countByUserSeq(Integer userSeq);
    List<Apply> findAllByPostingSeq(Integer postingSeq, PageRequest pagenation);
    List<Apply> findAllByUserSeq(Integer userSeq, PageRequest pagenation);
    List<Apply> findByPostingSeqAndApplyCodeNot(Integer postingSeq, String applyCode);
    Optional<Apply> findTop1ByUserSeqAndPostingSeq(Integer userSeq, Integer postingSeq);
    List<Apply> findByPostingSeq(Integer postingSeq);
}
