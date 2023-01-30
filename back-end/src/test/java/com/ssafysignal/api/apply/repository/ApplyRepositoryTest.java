package com.ssafysignal.api.apply.repository;

import com.ssafysignal.api.apply.entity.Apply;
import com.ssafysignal.api.global.exception.NotFoundException;
import com.ssafysignal.api.global.response.ResponseCode;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ApplyRepositoryTest {

    @Autowired
    private ApplyRepository applyRepository;

    @Test
    void findMemo() {

        Apply apply = applyRepository.findById(9)
                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));

        assertEquals(apply.getMemo(), "testMemo1");
    }
}