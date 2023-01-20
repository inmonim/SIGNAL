package com.ssafysignal.api.posting.repository;

import com.ssafysignal.api.posting.entity.PostingMeeting;
import com.ssafysignal.api.posting.entity.PostingQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostingQuestionRepository extends JpaRepository<PostingQuestion, Integer> {
}
