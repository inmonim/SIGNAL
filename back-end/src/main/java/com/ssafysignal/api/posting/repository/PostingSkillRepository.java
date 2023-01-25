package com.ssafysignal.api.posting.repository;

import com.ssafysignal.api.posting.entity.PostingMeeting;
import com.ssafysignal.api.posting.entity.PostingSkill;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostingSkillRepository extends JpaRepository<PostingSkill, Integer> {
}
