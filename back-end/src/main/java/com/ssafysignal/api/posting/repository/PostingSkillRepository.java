package com.ssafysignal.api.posting.repository;

import com.ssafysignal.api.posting.entity.Posting;
import com.ssafysignal.api.posting.entity.PostingSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostingSkillRepository extends JpaRepository<PostingSkill, Integer> {
    Optional<List<PostingSkill>> findPostingSkillsByPostingSeq(Integer postingSeq);
    @Query(value = "select posting_seq from (select posting_seq from posting_skill where skill_code in(:postingSkillList)) a group by a.posting_seq having count(posting_seq)=(:size); ", nativeQuery = true)
    List<Integer> findBySkillList(@Param("postingSkillList") List<String> postingSkillList, @Param("size") Integer size);
}
