package com.ssafysignal.api.posting.repository;

import com.ssafysignal.api.posting.entity.Posting;
import com.ssafysignal.api.user.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class PostingRepositoryTest {

    @Autowired
    private PostingRepository postingRepository;

    @Autowired
    private UserRepository userRepository;

    @Test
    @Transactional
    void find() {
        Posting posting = postingRepository.findById(1).get();
        assertEquals(posting.getContent(), "공고 테스트");
    }

    @Test
    void regist() {
        Posting posting = Posting.builder()
                .userSeq(1)
                .content("프로젝트 생성 테스트")
                .postingEndDt(LocalDateTime.now())
                .level(5)
                .build();
        postingRepository.save(posting);

        posting = postingRepository.findById(posting.getPostingSeq()).get();
        postingRepository.deleteById(posting.getPostingSeq());
    }
}