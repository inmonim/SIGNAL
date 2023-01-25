package com.ssafysignal.api.apply.repository;

import com.ssafysignal.api.apply.entity.Apply;
import com.ssafysignal.api.user.entity.User;
import com.ssafysignal.api.user.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class ApplyRepositoryTest {

    @Autowired
    private ApplyRepository applyRepository;

    @Test
    void saveTest() {
        Apply apply = Apply.builder()
                .content("지원서 테스트2")
                .user(1)
                .build();
        applyRepository.save(apply);
    }

    @Test
    void findByIdTest() {
        Apply apply = applyRepository.findById(1).get();
        assertTrue("지원서 테스트".equals((apply.getContent())));
    }
}