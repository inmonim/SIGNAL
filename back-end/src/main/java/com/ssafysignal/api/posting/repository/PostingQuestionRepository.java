package com.ssafysignal.api.posting.repository;

import com.ssafysignal.api.posting.entity.PostingQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostingQuestionRepository extends JpaRepository<PostingQuestion, Integer> {
    Optional<List<PostingQuestion>> findPostingQuestionsByPostingSeqOrderByNum(Integer postingSeq);
}
