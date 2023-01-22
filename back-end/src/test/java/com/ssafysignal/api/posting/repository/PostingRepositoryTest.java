package com.ssafysignal.api.posting.repository;

import com.ssafysignal.api.posting.entity.Posting;
import com.ssafysignal.api.user.entity.User;
import com.ssafysignal.api.user.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class PostingRepositoryTest {

    @Autowired
    private PostingRepository postingRepository;

    @Autowired
    private UserRepository userRepository;

    @Test
    void find() {
        Posting posting = postingRepository.findById(1).get();

        System.out.println("posting = " + posting);

        assertTrue(posting.getPostingSeq() == 1);
    }


}