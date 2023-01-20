package com.ssafysignal.api.global.db.repository;

import com.ssafysignal.api.global.db.entity.CommonCode;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class CommonCodeRepositoryTest {

    @Autowired
    private CommonCodeRepository commonCodeRepository;

    @Test
    void findCommonCodeTest() {

        List<CommonCode> commonCodeList = commonCodeRepository.findAll();

        for (CommonCode code : commonCodeList) {
            System.out.println("code = " + code);
        }

        assertTrue(commonCodeList.size() == 95);
    }


}