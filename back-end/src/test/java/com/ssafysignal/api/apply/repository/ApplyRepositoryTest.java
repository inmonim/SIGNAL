package com.ssafysignal.api.apply.repository;

import com.ssafysignal.api.apply.entity.Apply;
import com.ssafysignal.api.global.exception.NotFoundException;
import com.ssafysignal.api.global.response.ResponseCode;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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

    @Test
    @Transactional
    void regist() {
        for (int i = 1; i <= 100; i++) {
            applyRepository.save(Apply.builder()
                    .userSeq(i % 4 + 1)
                    .postingSeq(458)
                    .postingMeetingSeq(316)
                    .content("페이지 네이션 테스트 " + i)
                    .positionCode("PO100")
                    .memo("test" + i)
                    .build());
        }
    }

    @Test
    void findAll() {
        List<Apply> applyList = applyRepository.findByPostingSeqAndApplyCodeNot(785, "AS100");
        System.out.println("applyList.toString() = " + applyList.toString());
    }

}