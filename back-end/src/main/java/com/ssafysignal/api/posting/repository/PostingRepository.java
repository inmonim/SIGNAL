package com.ssafysignal.api.posting.repository;

import com.ssafysignal.api.posting.entity.Posting;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostingRepository extends JpaRepository<Posting, Integer> {
    List<Posting> findByUserSeq(Integer userSeq, PageRequest pageRequest);
    Integer countByUserSeq(Integer userSeq);
}
