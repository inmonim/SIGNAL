package com.ssafysignal.api.profile.service;

import com.ssafysignal.api.profile.dto.response.ProfileFindResponse;
import com.ssafysignal.api.profile.repository.UserCareerRepository;
import com.ssafysignal.api.profile.repository.UserExpRepository;
import com.ssafysignal.api.profile.repository.UserPositionRepository;
import com.ssafysignal.api.profile.repository.UserSkillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final UserCareerRepository userCareerRepository;
    private final UserExpRepository userExpRepository;
    private final UserPositionRepository userPositionRepository;
    private final UserSkillRepository userSkillRepository;

    @Transactional
    public ProfileFindResponse findProfile(Integer userSeq) throws RuntimeException {

        return ProfileFindResponse.builder()
                .userCareerList(userCareerRepository.findByUserSeq(userSeq))
                .userExpList(userExpRepository.findByUserSeq(userSeq))
                .userPositionList(userPositionRepository.findByUserSeq(userSeq))
                .userSkillList(userSkillRepository.findByUserSeq(userSeq))
                .build();
    }


}
