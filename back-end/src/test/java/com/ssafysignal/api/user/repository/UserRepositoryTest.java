package com.ssafysignal.api.user.repository;

import com.ssafysignal.api.user.entity.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    @Transactional
    void find() {
        User user = userRepository.findByEmail("tablemin_park@daum.net").get();
        System.out.println("user = " + user);
        assertTrue(user.getAuthorities().size() == 1);
    }

}