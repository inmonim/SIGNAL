package com.ssafysignal.api.posting.repository;

import com.ssafysignal.api.posting.entity.Posting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostingRepository extends JpaRepository<Posting, Integer> {
    List<Posting> findByUserSeq(Integer userSeq);
}
