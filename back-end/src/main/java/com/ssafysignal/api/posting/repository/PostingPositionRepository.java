package com.ssafysignal.api.posting.repository;

import com.ssafysignal.api.posting.entity.PostingPosition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostingPositionRepository extends JpaRepository<PostingPosition, Integer> {
    List<PostingPosition> findPostingPositiosnByPostingSeq(Integer postingSeq);
    Integer countByPostingSeq(Integer postingSeq);
}
