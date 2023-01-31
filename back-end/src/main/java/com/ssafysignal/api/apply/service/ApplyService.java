package com.ssafysignal.api.apply.service;

import com.ssafysignal.api.apply.dto.Request.ApplyBasicRequest;
import com.ssafysignal.api.apply.entity.*;
import com.ssafysignal.api.apply.repository.*;
import com.ssafysignal.api.common.entity.CommonCode;
import com.ssafysignal.api.global.exception.NotFoundException;
import com.ssafysignal.api.global.response.ResponseCode;
import com.ssafysignal.api.posting.entity.PostingMeeting;
import com.ssafysignal.api.posting.repository.PostingMeetingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DuplicateKeyException;
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
    private final ApplyAnswerRepository applyAnswerRepository;
    private final PostingMeetingRepository postingMeetingRepository;

    @Transactional
    public void registApply(ApplyBasicRequest applyRegistRequest, Integer postingSeq) throws RuntimeException {
        //System.out.println("applyRegistRequest"+applyRegistRequest);

        // 지원서 등록
        Apply apply = Apply.builder()
                .userSeq(applyRegistRequest.getUserSeq())
                .postingSeq(postingSeq)
                .content(applyRegistRequest.getContent())
                .positionCode(applyRegistRequest.getPositionCode())
                .postingMeetingSeq(applyRegistRequest.getPostingMeetingSeq())
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

        //답변
        for(Map<String, Object> answerRequest : applyRegistRequest.getApplyAnswerList()){
            int postingQuestionSeq = Integer.parseInt((String)answerRequest.get("postingQuestionSeq"));
            String content = (String)answerRequest.get("content");
            ApplyAnswer applyAnswer = ApplyAnswer.builder()
                    .applySeq(apply.getApplySeq())
                    .postingSeq(postingSeq)
                    .postingQuestionSeq(postingQuestionSeq)
                    .content(content)
                    .build();
            applyAnswerRepository.save(applyAnswer);
        }

        //미팅시간 설정
        PostingMeeting postingMeeting= postingMeetingRepository.findById(applyRegistRequest.getPostingMeetingSeq()).get();
        System.out.println(postingMeeting);
        if(!postingMeeting.getCode().getCode().equals("PM102")){ //이미 선택된 시간
            System.out.println("이미 선택된 사전미팅시간");
            throw new DuplicateKeyException("이미 선택된 사전미팅시간");
        }
        postingMeeting.setToUserSeq(applyRegistRequest.getUserSeq());
        postingMeeting.setApplySeq(apply.getApplySeq());
        postingMeeting.setPostingMeetingCode("PM100");
        System.out.println("수정후"+postingMeeting);
        postingMeetingRepository.save(postingMeeting);


    }

    @Transactional(readOnly = true)
    public Apply findApply(Integer applySeq) {
        return applyRepository.findById(applySeq)
                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));
    }

//    @Transactional(readOnly = true)
//    public Apply findWriterApply(Integer postingSeq, Integer applySeq) {
//        Posting posting = postingRepository.findById(postingSeq).get();
//        Apply apply = applyRepository.findByApplySeq(applySeq).get();
//        Integer posting posting.getPostingSeq()
//    }


    @Transactional
    public void modifyApply( ApplyBasicRequest applyModifyRequest,Integer applySeq) throws RuntimeException {

        // 지원서 수정
        Apply apply = applyRepository.findById(applySeq)
                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));

        apply.setContent(applyModifyRequest.getContent());
        apply.setPositionCode(applyModifyRequest.getPositionCode());
        apply.setPostingMeetingSeq(applyModifyRequest.getPostingMeetingSeq());

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

        //답변
        for(Map<String, Object> answerRequest : applyModifyRequest.getApplyAnswerList()){
            int postingQuestionSeq = Integer.parseInt((String)answerRequest.get("postingQuestionSeq"));
            String content = (String)answerRequest.get("content");
        }


        //미팅시간 설정

    }

    @Transactional
    public void cancleApply(Integer applySeq) throws RuntimeException {
        Apply apply = applyRepository.findById(applySeq)
                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));

        apply.setApplyCode("PAS104");
        applyRepository.save(apply);
    }

    @Transactional(readOnly = true)
    public String findApplyMemo(Integer applySeq) {
        Apply apply = applyRepository.findById(applySeq)
                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));

        return apply.getMemo();
    }
}
