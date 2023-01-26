package com.ssafysignal.api.apply.service;

import com.ssafysignal.api.apply.dto.Request.ApplyBasicRequest;
import com.ssafysignal.api.apply.dto.Response.ApplyFindRes;
import com.ssafysignal.api.apply.entity.*;
import com.ssafysignal.api.apply.repository.*;
import com.ssafysignal.api.global.exception.NotFoundException;
import com.ssafysignal.api.global.response.BasicResponse;
import com.ssafysignal.api.global.response.ResponseCode;
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

    @Transactional
    public void registApply(ApplyBasicRequest applyRegistRequest) throws RuntimeException {

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
    }

    @Transactional(readOnly = true)
    public Apply findApply(Integer applySeq) {
        Apply apply = applyRepository.findByApplySeq(applySeq)
                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));
        return apply;
    }

    @Transactional
    public void modifyApply(Integer applySeq, ApplyBasicRequest applyModifyRequest) throws RuntimeException {

        // 지원서 수정
        Apply apply = applyRepository.findById(applySeq)
                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));

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
        applyExpList.clear();
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
        applyCareerList.clear();
        for (String career : applyModifyRequest.getApplyCareerList()) {
            applyCareerList.add(ApplyCareer.builder()
                    .applySeq(applySeq)
                    .content(career)
                    .build()
            );
        }
        apply.setApplyCareerList(applyCareerList);

        applyRepository.save(apply);
    }


    @Transactional
    public void cancleApply(Integer applySeq) throws RuntimeException {
        Apply apply = applyRepository.findById(applySeq)
                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));

        apply.setApplyCode("PAS104");
        applyRepository.save(apply);
    }
}
