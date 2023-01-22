package com.ssafysignal.api.posting.repository;

import com.ssafysignal.api.posting.entity.Posting;
import com.ssafysignal.api.posting.entity.PostingMeeting;
import com.ssafysignal.api.posting.entity.PostingSkill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostingSkillRepository extends JpaRepository<PostingSkill, Integer> {
    List<PostingSkill> findPostingSkillByPosting(Posting posting);
}
