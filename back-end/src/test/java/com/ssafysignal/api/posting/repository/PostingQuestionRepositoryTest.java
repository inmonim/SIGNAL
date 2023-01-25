package com.ssafysignal.api.posting.repository;

import com.ssafysignal.api.posting.entity.PostingQuestion;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class PostingQuestionRepositoryTest {

    @Autowired
    private PostingQuestionRepository postingQuestionRepository;

    @Test
    void find() {
        List<PostingQuestion> postingQuestionList = postingQuestionRepository.findPostingQuestionsByPostingSeqOrderByNum(1).get();
        assertEquals(postingQuestionList.get(2).getNum(), 3);
    }

    @Test
    void regist() {
        PostingQuestion postingQuestion = PostingQuestion.builder()
                .postingSeq(1)
                .num(1)
                .content("질문 테스트 코드")
                .build();
        postingQuestionRepository.save(postingQuestion);

        postingQuestion = postingQuestionRepository.findById(postingQuestion.getPostingQuestionSeq()).get();
        assertEquals(postingQuestion.getContent(), "질문 테스트 코드");

        postingQuestionRepository.deleteById(postingQuestion.getPostingQuestionSeq());
    }

}