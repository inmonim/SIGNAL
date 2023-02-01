package com.ssafysignal.api.profile.repository;

import com.ssafysignal.api.profile.entity.UserCareer;
import com.ssafysignal.api.profile.entity.UserExp;
import com.ssafysignal.api.profile.entity.UserPosition;
import com.ssafysignal.api.profile.entity.UserSkill;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ProfileRepositoryTest {

    @Autowired
    private UserCareerRepository userCareerRepository;
    @Autowired
    private UserExpRepository userExpRepository;
    @Autowired
    private UserSkillRepository userSkillRepository;
    @Autowired
    private UserPositionRepository userPositionRepository;

    @Test
//    @Transactional
    void registAll() {
        List<UserCareer> userCareerList = new ArrayList<>();
        userCareerList.add(UserCareer.builder().userSeq(1).content("경력 단위 테스트").build());
        userCareerList.add(UserCareer.builder().userSeq(1).content("경력 단위 테스트2").build());

        List<UserExp> userExpList = userExpRepository.findByUserSeq(1);
        userExpList.add(UserExp.builder().userSeq(1).content("경험 단위 테스트").build());
        userExpList.add(UserExp.builder().userSeq(1).content("경험 단위 테스트2").build());

        List< UserSkill> userSkillList = userSkillRepository.findByUserSeq(1);
        userSkillList.add(UserSkill.builder().userSeq(1).skillCode("AI100").build());
        userSkillList.add(UserSkill.builder().userSeq(1).skillCode("AI101").build());

        List<UserPosition> userPositionList = userPositionRepository.findByUserSeq(1);
        userPositionList.add(UserPosition.builder().userSeq(1).positionCode("PO100").build());
        userPositionList.add(UserPosition.builder().userSeq(1).positionCode("PO101").build());

        userCareerRepository.saveAll(userCareerList);
        userExpRepository.saveAll(userExpList);
        userSkillRepository.saveAll(userSkillList);
        userPositionRepository.saveAll(userPositionList);

        assertTrue(userCareerRepository.findByUserSeq(1).size() == 2);
        assertTrue(userExpRepository.findByUserSeq(1).size() == 2);
        assertTrue(userSkillRepository.findByUserSeq(1).size() == 2);
        assertTrue(userPositionRepository.findByUserSeq(1).size() == 2);
    }
}