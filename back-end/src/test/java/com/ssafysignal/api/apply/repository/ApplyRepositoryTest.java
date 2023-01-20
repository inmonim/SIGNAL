package com.ssafysignal.api.apply.repository;

import com.ssafysignal.api.apply.entity.Apply;
import com.ssafysignal.api.user.entity.User;
import com.ssafysignal.api.user.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class ApplyRepositoryTest {

    @Autowired
    private ApplyRepository applyRepository;
    @Autowired
    private UserRepository userRepository;

    @Test
    void saveTest() {
        User user = userRepository.findById(1).get();

        Apply apply = Apply.builder()
                .content("지원서 테스트2")
                .user(user)
                .build();
        applyRepository.save(apply);
    }

    @Test
    void findByIdTest() {
        Apply apply = applyRepository.findById(1).get();
        assertTrue("지원서 테스트".equals((apply.getContent())));
    }
}