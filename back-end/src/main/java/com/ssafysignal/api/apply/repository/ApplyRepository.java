package com.ssafysignal.api.apply.repository;

import com.ssafysignal.api.apply.entity.Apply;
import com.ssafysignal.api.posting.entity.Posting;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;

public interface ApplyRepository extends JpaRepository<Apply, Integer>{
    List<Apply> findByUserSeq(Integer userSeq);
    List<Apply> findByPostingSeq(Integer postingSeq);

    int countByPostingSeq(int postingSeq);

    int countByUserSeq(int userSeq);

    List<Apply> findAllByPostingSeq(int postingSeq, PageRequest pagenation);
}
