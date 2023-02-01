package com.ssafysignal.api.posting.repository;

import com.ssafysignal.api.posting.entity.PostingSkill;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class PostingSkillRepositoryTest {
    @Autowired
    private PostingSkillRepository postingSkillRepository;
    @Test
    void find() {
        List<PostingSkill> postingSkillList = postingSkillRepository.findPostingSkillsByPostingSeq(1).get();
        assertEquals(postingSkillList.get(0).getSkillCode(), "WE100");
        assertEquals(postingSkillList.get(1).getSkillCode(), "WE101");
        assertEquals(postingSkillList.get(2).getSkillCode(), "WE102");
    }

    @Test
    void regist() {
        PostingSkill postingSkill = PostingSkill.builder()
                .postingSeq(1)
                .skillCode("WE100")
                .build();

        postingSkillRepository.save(postingSkill);

        postingSkill = postingSkillRepository.findById(postingSkill.getPostingSkillSeq()).get();
        assertEquals(postingSkill.getSkillCode(), "WE100");

        postingSkillRepository.deleteById(postingSkill.getPostingSkillSeq());
    }

}