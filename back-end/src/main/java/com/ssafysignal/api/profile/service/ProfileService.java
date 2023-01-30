package com.ssafysignal.api.profile.service;

import com.ssafysignal.api.global.exception.NotFoundException;
import com.ssafysignal.api.global.response.ResponseCode;
import com.ssafysignal.api.profile.dto.request.ProfilePositionRegistRequest;
import com.ssafysignal.api.profile.dto.response.ProfileBasicResponse;
import com.ssafysignal.api.profile.entity.UserCareer;
import com.ssafysignal.api.profile.entity.UserExp;
import com.ssafysignal.api.profile.entity.UserPosition;
import com.ssafysignal.api.profile.entity.UserSkill;
import com.ssafysignal.api.profile.repository.UserCareerRepository;
import com.ssafysignal.api.profile.repository.UserExpRepository;
import com.ssafysignal.api.profile.repository.UserPositionRepository;
import com.ssafysignal.api.profile.repository.UserSkillRepository;
import com.ssafysignal.api.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final UserCareerRepository userCareerRepository;
    private final UserExpRepository userExpRepository;
    private final UserPositionRepository userPositionRepository;
    private final UserSkillRepository userSkillRepository;

    // 프로필 조회
    @Transactional
    public ProfileBasicResponse findProfile(Integer userSeq) throws RuntimeException {

        return ProfileBasicResponse.builder()
                .userCareerList(userCareerRepository.findByUserSeq(userSeq))
                .userExpList(userExpRepository.findByUserSeq(userSeq))
                .userPositionList(userPositionRepository.findByUserSeq(userSeq))
                .userSkillList(userSkillRepository.findByUserSeq(userSeq))
                .build();
    }


    // ========== 프로필 포지션 ==========
    // 프로필 포지션 등록
    @Transactional
    public void registPosition(Integer userSeq, Map<String, Object> param) throws RuntimeException {
        List<UserPosition> existPositionList = userPositionRepository.findByUserSeq(userSeq);

        for (UserPosition existPosition:existPositionList) {
            if (existPosition.getPositionCode().equals(param.get("positionCode"))) {
                // 이미 유저 프로필에 존재하는 포지션이면 등록 실패 에러 Raise
                throw new NotFoundException(ResponseCode.REGIST_FAIL);
            }
        }
        // 유저가 없으면 어카노!

        UserPosition userPosition = UserPosition.builder()
                .userSeq(userSeq)
                .positionCode(param.get("positionCode").toString())
                .build();
        userPositionRepository.save(userPosition);
    }


    // 프로필 포지션 조회
    @Transactional()
    public ProfileBasicResponse findAllPosition(Integer userSeq) throws RuntimeException {
        return ProfileBasicResponse.builder()
                .userPositionList(userPositionRepository.findByUserSeq(userSeq))
                .build();
    }

    // 프로필 포지션 삭제
    @Transactional
    public void deletePosition(Integer userPositionSeq) throws RuntimeException {

        Optional<UserPosition> userPosition = userPositionRepository.findByUserPositionSeq(userPositionSeq);
        userPosition.orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));
        userPositionRepository.delete(userPosition.get());
    }


    // ========== 기술스택 ==========
    // 프로필 기술스택 등록
    @Transactional
    public void registSkill(Integer userSeq, Map<String, Object> param) {
        List<UserSkill> existSkillList = userSkillRepository.findByUserSeq(userSeq);
        for (UserSkill existSkill : existSkillList) {
            if (existSkill.getSkillCode().equals(param.get("skillCode"))) {
                throw new NotFoundException(ResponseCode.REGIST_FAIL);
            }
        }
        UserSkill userSkill = UserSkill.builder()
                .userSeq(userSeq)
                .skillCode(param.get("skillCode").toString())
                .build();
        userSkillRepository.save(userSkill);
    }


    // 프로필 기술스택 조회
    @Transactional
    public ProfileBasicResponse findAllSkill(Integer userSeq) throws RuntimeException {
        return ProfileBasicResponse.builder()
                .userSkillList(userSkillRepository.findByUserSeq(userSeq))
                .build();

    }

    
    // 프로필 기술스택 삭제
    @Transactional
    public void deleteSkill(Integer userSkillSeq) throws RuntimeException {

        Optional<UserSkill> userSkill = userSkillRepository.findByUserSkillSeq(userSkillSeq);
        userSkill.orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));
        userSkillRepository.delete(userSkill.get());
    }


    // ========== 커리어 ==========
    // 프로필 커리어 등록
    @Transactional
    public void registCareer(Integer userSeq, Map<String, Object> param) throws RuntimeException {
        UserCareer userCareer = UserCareer.builder()
                .userSeq(userSeq)
                .content(param.get("content").toString())
                .build();
        userCareerRepository.save(userCareer);
    }

    
    // 프로필 커리어 조회
    @Transactional
    public ProfileBasicResponse findAllCareer(Integer userSeq) throws RuntimeException {
        return ProfileBasicResponse.builder()
                .userCareerList(userCareerRepository.findByUserSeq(userSeq))
                .build();
    }


    // 프로필 커리어 삭제
    @Transactional
    public void deleteCareer(Integer userCareerSeq) throws RuntimeException {

        Optional<UserCareer> userCareer = userCareerRepository.findByUserCareerSeq(userCareerSeq);
        userCareer.orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));
        userCareerRepository.delete(userCareer.get());
    }


    // ========== 경험 ==========
    // 프로필 경험 등록
    @Transactional
    public void registExp(Integer userSeq, Map<String, Object> param) {

        UserExp userExp = UserExp.builder()
                .userSeq(userSeq)
                .content(param.get("content").toString())
                .build();

        userExpRepository.save(userExp);
    }

    // 프로필 경험 조회
    @Transactional
    public ProfileBasicResponse findAllExp(Integer userSeq) throws RuntimeException {
        return ProfileBasicResponse.builder()
                .userExpList(userExpRepository.findByUserSeq(userSeq))
                .build();
    }

    // 프로필 경험 삭제
    @Transactional
    public void deleteExp(Integer userExpSeq) throws RuntimeException {

        Optional<UserExp> userExp = userExpRepository.findByUserExpSeq(userExpSeq);
        userExp.orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));
        userExpRepository.delete(userExp.get());
    }
}
