package com.ssafysignal.api.posting.repository;

import com.ssafysignal.api.posting.entity.PostingSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostingSkillRepository extends JpaRepository<PostingSkill, Integer> {
    Optional<List<PostingSkill>> findPostingSkillsByPostingSeq(Integer postingSeq);
}
