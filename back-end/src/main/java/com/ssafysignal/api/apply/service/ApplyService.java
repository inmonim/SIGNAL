package com.ssafysignal.api.apply.service;

import com.ssafysignal.api.global.common.response.BasicResponse;
import com.ssafysignal.api.apply.dto.Request.ApplyBasicRequest;
import com.ssafysignal.api.apply.dto.Response.ApplyFindRes;
import com.ssafysignal.api.apply.entity.*;
import com.ssafysignal.api.apply.repository.*;
import com.ssafysignal.api.user.dto.response.FindUserRes;
import com.ssafysignal.api.user.entity.User;
import com.ssafysignal.api.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;



@Service
@RequiredArgsConstructor
public class ApplyService {

    private final ApplyRepository applyRepository;

    private final ApplyCareerRepository applyCareerRepository;

    private final ApplyExpRepository applyExpRepository;

    private final ApplySkillRepository applySkillRepository;
    private final UserRepository userRepository;

    @Transactional
    public BasicResponse registApply(ApplyBasicRequest applyRegistRequest) {

        // 지원서 등록
        Apply apply = Apply.builder()
                .content(applyRegistRequest.getContent())
                .positionCode(applyRegistRequest.getPositionCode())
                .build();

        applyRepository.save(apply);

        // 기술 스택
        for (String skill : applyRegistRequest.getApplySkillList()) {
            applySkillRepository.save(ApplySkill.builder()
                    .applySeq(apply.getApplySeq())
                    .skillCode(skill)
                    .build()
            );
        }

        // 이전 프로젝트 경험
        for (String exp : applyRegistRequest.getApplyExpList()) {
            applyExpRepository.save(ApplyExp.builder()
                    .applySeq(apply.getApplySeq())
                    .content(exp)
                    .build()
            );
        }

        // 경력
        for (String career : applyRegistRequest.getApplyCareerList()) {
            applyCareerRepository.save(ApplyCareer.builder()
                    .applySeq(apply.getApplySeq())
                    .content(career)
                    .build()
            );
        }
        return BasicResponse.Body("success", "지원서 등록 성공", null);

    }

    @Transactional(readOnly = true)
    public BasicResponse findApply(Integer applySeq) {
        if (applyRepository.findById(applySeq).isPresent()) {
            Apply apply = applyRepository.findByApplySeq(applySeq).get();
            FindUserRes user = userRepository.findByUserSeq(apply.getUser());
            user.getEmail();
            return BasicResponse.Body("success", "지원서 상세 조회 성공", ApplyFindRes.fromEntity(apply));
        }

        return BasicResponse.Body("fail", "지원서 상세 조회 실패", null);
    }

    @Transactional
    public BasicResponse modifyApply(Integer applySeq, ApplyBasicRequest applyModifyRequest) {
        if (applyRepository.findById(applySeq).isPresent()) {
            // 지원서 수정
            Apply apply = applyRepository.findById(applySeq).get();
            apply.setContent(applyModifyRequest.getContent());
            apply.setPositionCode(applyModifyRequest.getPositionCode());

            // 기술 스택
            List<ApplySkill> applySkillList = apply.getApplySkillList();
            applySkillList.clear();
            for (String skill : applyModifyRequest.getApplySkillList()) {
                applySkillList.add(ApplySkill.builder()
                        .applySeq(applySeq)
                        .skillCode(skill)
                        .build()
                );
            }
            apply.setApplySkillList(applySkillList);

            // 이전 프로젝트 경험
            List<ApplyExp> applyExpList = apply.getApplyExpList();
            for (String exp : applyModifyRequest.getApplyExpList()) {
                applyExpList.add(ApplyExp.builder()
                        .applySeq(applySeq)
                        .content(exp)
                        .build()
                );
            }
            apply.setApplyExpList(applyExpList);

            // 경력
            List<ApplyCareer> applyCareerList = apply.getApplyCareerList();
            for (String career : applyModifyRequest.getApplyCareerList()) {
                applyCareerList.add(ApplyCareer.builder()
                        .applySeq(applySeq)
                        .content(career)
                        .build()
                );
            }
            apply.setApplyCareerList(applyCareerList);

            return BasicResponse.Body("success", "지원서 수정 완료", null);
        }

        return BasicResponse.Body("fail", "지원서 수정 실패", null);
    }


    @Transactional
    public BasicResponse cancleApply(Integer applySeq) {
        if (applyRepository.findById(applySeq).isPresent()) {
            Apply apply = applyRepository.findById(applySeq).get();
            apply.setApplyCode("PAS104");
            applyRepository.save(apply);
            return BasicResponse.Body("success", "지원 취소 성공", null);
        }
        return BasicResponse.Body("fail", "지원 취소 실패", null);
    }

}
