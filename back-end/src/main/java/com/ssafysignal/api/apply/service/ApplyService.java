package com.ssafysignal.api.apply.service;

import com.ssafysignal.api.admin.Entity.BlackUser;
import com.ssafysignal.api.admin.Repository.BlackUserRepository;
import com.ssafysignal.api.apply.dto.Request.ApplyBasicRequest;
import com.ssafysignal.api.apply.dto.Response.ApplyApplyerFindResponse;
import com.ssafysignal.api.apply.dto.Response.ApplyFindResponse;
import com.ssafysignal.api.apply.dto.Response.ApplyWriterFindResponse;
import com.ssafysignal.api.apply.entity.*;
import com.ssafysignal.api.apply.repository.*;
import com.ssafysignal.api.common.entity.CommonCode;
import com.ssafysignal.api.common.repository.CommonCodeRepository;
import com.ssafysignal.api.global.exception.NotFoundException;
import com.ssafysignal.api.global.response.ResponseCode;
import com.ssafysignal.api.posting.entity.PostingMeeting;
import com.ssafysignal.api.posting.entity.PostingPosition;
import com.ssafysignal.api.posting.repository.PostingMeetingRepository;
import com.ssafysignal.api.posting.repository.PostingPositionRepository;
import com.ssafysignal.api.project.entity.Project;
import com.ssafysignal.api.project.repository.ProjectRepository;
import com.ssafysignal.api.user.entity.User;
import com.ssafysignal.api.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import static java.util.stream.Collectors.reducing;

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
    private final CommonCodeRepository commonCodeRepository;
    private final PostingPositionRepository postingPositionRepository;
    private final UserRepository userRepository;
    private final BlackUserRepository blackUserRepository;
    private final ProjectRepository projectRepository;

    @Transactional
    public void registApply(ApplyBasicRequest applyRegistRequest, Integer postingSeq) throws RuntimeException {

        User user = userRepository.findByUserSeq(applyRegistRequest.getUserSeq()).orElseThrow(
                () -> new NotFoundException(ResponseCode.REGIST_NOT_FOUNT));

        // 블랙리스트 확인
        Project project = projectRepository.findByPostingSeq(postingSeq).orElseThrow(
                () -> new NotFoundException(ResponseCode.REGIST_NOT_FOUNT));

        if (blackUserRepository.findByUserSeqAndProjectSeq(user.getUserSeq(), project.getProjectSeq()).isPresent()) {
            throw new NotFoundException(ResponseCode.REGIST_BLACK);
        }

        // 중복 지원서 확인

        if (applyRepository.findByUserSeqAndPostingSeq(user.getUserSeq(), postingSeq).isPresent()) {
            Apply apply = applyRepository.findByUserSeqAndPostingSeq(user.getUserSeq(), postingSeq).get();
            if (!(apply.getApplyCode().equals("AS103") & apply.getStateCode().equals("PAS102"))) {
                throw new NotFoundException(ResponseCode.REGIST_DUPLICATE);
            }
        }
        
        // 잔여 하트 충분한지 확인
        int userHeartCnt = user.getHeartCnt();
        if (userHeartCnt < 100) {
            throw new NotFoundException(ResponseCode.REGIST_LACK_HEART);
        }

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
            int postingQuestionSeq = (int)answerRequest.get("postingQuestionSeq");
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

        if(!postingMeeting.getCode().getCode().equals("PM102")){ //이미 선택된 시간
            System.out.println("이미 선택된 사전미팅시간");
            throw new DuplicateKeyException("이미 선택된 사전미팅시간");
        }
        postingMeeting.setToUserSeq(applyRegistRequest.getUserSeq());
        postingMeeting.setApplySeq(apply.getApplySeq());
        postingMeeting.setPostingMeetingCode("PM100");

        postingMeetingRepository.save(postingMeeting);


    }

    @Transactional(readOnly = true)
    public ApplyFindResponse findApply(Integer applySeq) {
        Apply apply = applyRepository.findById(applySeq)
                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));

        //포지션
        String positionCode = apply.getPositionCode();
        CommonCode code = commonCodeRepository.findById(positionCode).get();

        //기술스택
        List<ApplySkill> skillList = applySkillRepository.findAllByApplySeq(applySeq);
        List<CommonCode> skillCommonCodeList = new ArrayList<>();
        for(ApplySkill as : skillList){
            String skillCode = as.getSkillCode();
            CommonCode skillCommonCode = commonCodeRepository.findById(skillCode).get();
            skillCommonCodeList.add(skillCommonCode);
        }

        //사전미팅
        PostingMeeting postingMeeting = postingMeetingRepository.findByApplySeqAndToUserSeq(applySeq, apply.getUserSeq());

        ApplyFindResponse res = ApplyFindResponse.builder()
                .userSeq(apply.getUserSeq())
                .postingSeq(apply.getPostingSeq())
                .content(apply.getContent())
                .position(code)
                .answerList(apply.getApplyAnswerList())
                .careerList(apply.getApplyCareerList())
                .expList(apply.getApplyExpList())
                .skillList(skillCommonCodeList)
                .postingMeeting(postingMeeting)
                .build();
        
        return res;
    }

    @Transactional
    public void modifyApply( ApplyBasicRequest applyModifyRequest,Integer applySeq) throws RuntimeException {
        System.out.println("asdf"+applySeq);
        // 지원서 수정
        Apply apply = applyRepository.findById(applySeq)
                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));
        System.out.println("apply"+apply);

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

        
        //답변
        for(Map<String, Object> answerRequest : applyModifyRequest.getApplyAnswerList()){
            int applyAnswerSeq = (int)answerRequest.get("applyAnswerSeq");
            String content = (String)answerRequest.get("content");
            ApplyAnswer answer = applyAnswerRepository.findById(applyAnswerSeq).get();
            answer.setContent(content);
            applyAnswerRepository.save(answer);
        }


        //미팅시간
        int newPostingMeetingSeq = applyModifyRequest.getPostingMeetingSeq();
        int curPostingMeetingSeq = apply.getPostingMeetingSeq();
        System.out.println(curPostingMeetingSeq+", "+newPostingMeetingSeq);
        if(newPostingMeetingSeq != curPostingMeetingSeq) {	
        	PostingMeeting newPostingmeeting = postingMeetingRepository.findById(newPostingMeetingSeq).get();
        	if(!newPostingmeeting.getPostingMeetingCode().equals("PM102")) 
        		throw new DuplicateKeyException("이미 선택된 사전미팅시간");
        	apply.setPostingMeetingSeq(newPostingMeetingSeq);
        	
        	PostingMeeting curPostingMeeting = postingMeetingRepository.findById(curPostingMeetingSeq).get();
        	if(curPostingMeeting.getPostingMeetingCode().equals("PM101"))
        		throw new DuplicateKeyException("이미 사전미팅 했음");
        	curPostingMeeting.setApplySeq(null);
        	curPostingMeeting.setToUserSeq(null);
        	curPostingMeeting.setPostingMeetingCode("PM102");
        	postingMeetingRepository.save(curPostingMeeting);
        	
        	newPostingmeeting.setApplySeq(applySeq);
        	newPostingmeeting.setToUser(applyModifyRequest.getUserSeq());
        	newPostingmeeting.setPostingMeetingCode("PM100");
        	postingMeetingRepository.save(newPostingmeeting);
        }
        applyRepository.save(apply);


    }

    @Transactional
    public void cancleApply(Integer applySeq) throws RuntimeException {
        Apply apply = applyRepository.findById(applySeq)
                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));
        
        //미팅 시간 비워주기
        int postingMeetingSeq = apply.getPostingMeetingSeq();
        PostingMeeting postingMeeting= postingMeetingRepository.findById(postingMeetingSeq).get();
        if(!postingMeeting.getPostingMeetingCode().equals("PM101")) {
        	postingMeeting.setApplySeq(null);
        	postingMeeting.setToUserSeq(null);
        	postingMeeting.setPostingMeetingCode("PM102");
        	postingMeetingRepository.save(postingMeeting);
        }
        apply.setApplyCode("AS104");
        apply.setStateCode("PAS104");
        applyRepository.save(apply);
    }

    @Transactional(readOnly = true)
    public String findApplyMemo(Integer applySeq) {
        Apply apply = applyRepository.findById(applySeq)
                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));

        return apply.getMemo();
    }

    @Transactional(readOnly = true)
    public Map<String,Integer> countApplyWriter(int postingSeq){
        Map<String,Integer> ret = new HashMap<>();
        int totalCnt = applyRepository.countByPostingSeq(postingSeq);
        ret.put("count",totalCnt);
        return ret;
    }
    @Transactional(readOnly = true)
    public Map<String,Integer> countApplyApplyer(int userSeq){
        Map<String,Integer> ret = new HashMap<>();
        int totalCnt = applyRepository.countByUserSeq(userSeq);
        ret.put("count",totalCnt);
        return ret;
    }

    @Transactional(readOnly = true)
    public Map<String, Object> findAllApplyWriter(int postingSeq, int page, int size){

        List<Apply> applyList = applyRepository.findAllByPostingSeq(postingSeq, PageRequest.of(page - 1, size, Sort.Direction.DESC, "applySeq"));
        Integer totalCnt = postingPositionRepository.findPostingPositiosnByPostingSeq(postingSeq).stream().map(PostingPosition::getPositionCnt).collect(reducing(Integer::sum)).get();
        Integer selectCnt = applyRepository.countByPostingSeqAndApplyCode(postingSeq, "AS101");     // 확정인 사람들만 카운트
        Integer waitCnt = applyRepository.countByPostingSeqAndApplyCode(postingSeq, "AS100");       // 대기중인 사람들만 카운트

        Map<String, Object> resList = new HashMap<>();
        resList.put("applyList", ApplyWriterFindResponse.toList(applyList));
        resList.put("totalCnt", totalCnt);
        resList.put("selectCnt",selectCnt);
        resList.put("waitCnt", waitCnt);
        return resList;
    }

    @Transactional(readOnly = true)
    public List<ApplyApplyerFindResponse> findAllApplyApplyer(int userSeq, int page, int size){
        List<Apply> applyList = applyRepository.findALlByUserSeqAndStateCodeIsNot(userSeq, "PAS104", PageRequest.of(page - 1, size, Sort.Direction.DESC, "applySeq"));
        return ApplyApplyerFindResponse.toList(applyList);
    }
}