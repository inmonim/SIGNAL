package com.ssafysignal.api.posting.service;

import com.ssafysignal.api.apply.entity.Apply;
import com.ssafysignal.api.apply.repository.ApplyRepository;
import com.ssafysignal.api.common.service.SecurityService;
import com.ssafysignal.api.global.exception.NotFoundException;
import com.ssafysignal.api.global.response.ResponseCode;
import com.ssafysignal.api.posting.dto.request.ApplySelectConfirmRequest;
import com.ssafysignal.api.posting.dto.request.BasicPostingRequest;
import com.ssafysignal.api.posting.dto.response.FindAllPostingByUserSeqResponse;
import com.ssafysignal.api.posting.dto.response.FindAllPostingResponse;
import com.ssafysignal.api.posting.dto.response.FindPostingResponse;
import com.ssafysignal.api.posting.entity.*;
import com.ssafysignal.api.posting.repository.*;
import com.ssafysignal.api.profile.entity.UserHeartLog;
import com.ssafysignal.api.profile.repository.UserHeartLogRepository;
import com.ssafysignal.api.project.entity.Project;
import com.ssafysignal.api.project.entity.ProjectSpecification;
import com.ssafysignal.api.project.entity.ProjectUser;
import com.ssafysignal.api.project.entity.ProjectUserHeartLog;
import com.ssafysignal.api.project.repository.ProjectRepository;
import com.ssafysignal.api.project.repository.ProjectUserHeartLogRepository;
import com.ssafysignal.api.project.repository.ProjectUserRepository;
import com.ssafysignal.api.user.entity.User;
import com.ssafysignal.api.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostingService {

    private final ProjectRepository projectRepository;
    private final ProjectUserRepository projectUserRepository;
    private final PostingRepository postingRepository;
    private final PostingSkillRepository postingSkillRepository;
    private final ApplyRepository applyRepository;
    private final UserRepository userRepository;
    private final UserHeartLogRepository userHeartLogRepository;
    private final ProjectUserHeartLogRepository projectUserHeartLogRepository;
    private final SecurityService securityService;

    @Transactional
    public Integer countPosting() {
        return postingRepository.findAll().size();
    }

    @Transactional
    public void registPosting(BasicPostingRequest postingRegistRequest) throws RuntimeException {

        User user = userRepository.findByUserSeq(postingRegistRequest.getUserSeq())
                .orElseThrow(() -> new NotFoundException(ResponseCode.REGIST_NOT_FOUNT));

        if (user.getHeartCnt() < 100) {
            throw new NotFoundException(ResponseCode.REGIST_LACK_HEART);
        }

        // 공고 등록
        Posting posting = Posting.builder()
                .userSeq(postingRegistRequest.getUserSeq())
                .content(postingRegistRequest.getContent())
                .postingEndDt(postingRegistRequest.getPostingEndDt())
                .level(postingRegistRequest.getLevel())
                .postingSkillList(new ArrayList<>())
                .postingMeetingList(new ArrayList<>())
                .postingPositionList(new ArrayList<>())
                .postingQuestionList(new ArrayList<>())
                .build();
        // 기술 스택
        for (String skill : postingRegistRequest.getPostingSkillList()) {
            posting.getPostingSkillList().add(PostingSkill.builder()
                    .skillCode(skill)
                    .build()
            );
        }
        // 사전 미팅
        for (LocalDateTime meeting : postingRegistRequest.getPostingMeetingList()) {
            posting.getPostingMeetingList().add(PostingMeeting.builder()
                    .fromUserSeq(postingRegistRequest.getUserSeq())
                    .meetingDt(meeting)
                    .build()
            );
        }
        // 포지션
        for (Map<String, Object> position : postingRegistRequest.getPostingPositionList()) {
            posting.getPostingPositionList().add(PostingPosition.builder()
                    .positionCode((String) position.get("positionCode"))
                    .positionCnt((Integer) position.get("positionCnt"))
                    .build()
            );
        }
        // 사전 질문
        for (Map<String, Object> question : postingRegistRequest.getPostingQuestionList()) {
            posting.getPostingQuestionList().add(PostingQuestion.builder()
                    .num((Integer) question.get("num"))
                    .content((String) question.get("content"))
                    .build()
            );
        }
        postingRepository.save(posting);

        // 프로젝트 등록
        Project project = Project.builder()
                .postingSeq(posting.getPostingSeq())
                .subject(postingRegistRequest.getSubject())
                .localCode(postingRegistRequest.getLocalCode())
                .fieldCode(postingRegistRequest.getFieldCode())
                .isContact(true)
                .term(10)
                .build();
        projectRepository.save(project);

        // 팀장 포지션 등록
        ProjectUser projectUser = ProjectUser.builder()
                .userSeq(postingRegistRequest.getUserSeq())
                .projectSeq(project.getProjectSeq())
                .heartCnt(100)
                .isLeader(true)
                .positionCode(postingRegistRequest.getLeaderPosition())
                .build();
        projectUserRepository.save(projectUser);

        // 하트 차감 및 하트 로그 작성

        user.setHeartCnt(user.getHeartCnt()-100);
        userRepository.save(user);

        UserHeartLog userHeartLog = UserHeartLog.builder()
                .userSeq(user.getUserSeq())
                .heartCnt(-100)
                .content(project.getSubject()+"에 팀장으로 팀 등록 확정")
                .build();
        userHeartLogRepository.save(userHeartLog);


        // 팀장 프로젝트 유저 테이블 로그 추가
        projectUserHeartLogRepository.save(ProjectUserHeartLog.builder()
                .projectUserSeq(projectUser.getProjectUserSeq())
                .heartCnt(100)
                .content("프로젝트 시작")
                .build());
    }

    @Transactional(readOnly = true)
    public Map<String, Object> findAllPosting(Integer page, Integer size, Map<String, Object> searchKeys, List<String> postingSkillList) throws RuntimeException {
        if (postingSkillList != null && postingSkillList.size() > 0) {
            List<Integer> postingList = postingSkillRepository.findBySkillList(postingSkillList, postingSkillList.size());
            searchKeys.put("postingList", postingList);
        }

        Page<Project> projectList = projectRepository.findAll(ProjectSpecification.bySearchWord(searchKeys), PageRequest.of(page - 1, size, Sort.Direction.DESC, "projectSeq"));

        Map<String, Object> findAllPostingResponse = new HashMap<>();
        findAllPostingResponse.put("count", projectList.getTotalElements());
        findAllPostingResponse.put("postingList", projectList.stream()
                .map(FindAllPostingResponse::fromEntity)
                .collect(Collectors.toList()));

        return findAllPostingResponse;
    }

    @Transactional(readOnly = true)
    public FindPostingResponse findPosting(Integer postingSeq){

        Project project = projectRepository.findByPostingSeq(postingSeq)
                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));

        FindPostingResponse findPostingResponse = FindPostingResponse.fromEntity(project);
        findPostingResponse.setIsMyPosting(false);

        if (!securityService.isAnonymouseUser()) {
            Integer userSeq = securityService.currentUserSeq();
            findPostingResponse.setIsMyPosting(project.getPosting().getUserSeq().equals(userSeq));
        }

        return findPostingResponse;
    }

    @Transactional
    public void modifyPosting(Integer postingSeq, BasicPostingRequest postingModifyRequest) throws RuntimeException {
        // 공고 수정
        Posting posting = postingRepository.findById(postingSeq)
                .orElseThrow(() -> new NotFoundException(ResponseCode.MODIFY_NOT_FOUND));
        posting.setContent(postingModifyRequest.getContent());
        posting.setPostingEndDt(postingModifyRequest.getPostingEndDt());
        posting.setLevel(postingModifyRequest.getLevel());

        // 기술 스택
        List<PostingSkill> postingSkillList = posting.getPostingSkillList();
        postingSkillList.clear();
        for (String skill : postingModifyRequest.getPostingSkillList()) {
            postingSkillList.add(PostingSkill.builder()
                    .postingSeq(postingSeq)
                    .skillCode(skill)
                    .build()
            );
        }
        posting.setPostingSkillList(postingSkillList);

        // 사전 미팅
        List<PostingMeeting> postingMeetingList = posting.getPostingMeetingList();
        postingMeetingList.clear();
        for (LocalDateTime meeting : postingModifyRequest.getPostingMeetingList()) {
            postingMeetingList.add(PostingMeeting.builder()
                    .postingSeq(postingSeq)
                    .fromUserSeq(postingModifyRequest.getUserSeq())
                    .meetingDt(meeting)
                    .build()
            );
        }
        posting.setPostingMeetingList(postingMeetingList);

        // 포지션
        List<PostingPosition> postingPositionList = posting.getPostingPositionList();
        postingPositionList.clear();
        for (Map<String, Object> position : postingModifyRequest.getPostingPositionList()) {
            postingPositionList.add(PostingPosition.builder()
                    .postingSeq(postingSeq)
                    .positionCode((String) position.get("positionCode"))
                    .positionCnt((Integer) position.get("positionCnt"))
                    .build()
            );
        }
        posting.setPostingPositionList(postingPositionList);

        // 사전 질문
        List<PostingQuestion> postingQuestionList = posting.getPostingQuestionList();
        postingQuestionList.clear();
        for (Map<String, Object> question : postingModifyRequest.getPostingQuestionList()) {
            postingQuestionList.add(PostingQuestion.builder()
                    .postingSeq(postingSeq)
                    .num((Integer) question.get("num"))
                    .content((String) question.get("content"))
                    .build()
            );
        }
        posting.setPostingQuestionList(postingQuestionList);
        postingRepository.save(posting);

        // 프로젝트 수정
        Project project = projectRepository.findByPostingSeq(postingSeq)
                .orElseThrow(() -> new NotFoundException(ResponseCode.MODIFY_NOT_FOUND));
        project.setSubject(postingModifyRequest.getSubject());
        project.setLocalCode(postingModifyRequest.getLocalCode());
        project.setFieldCode(postingModifyRequest.getFieldCode());
        project.setContact(postingModifyRequest.isContact());
        project.setTerm(postingModifyRequest.getTerm());
        projectRepository.save(project);
    }

    @Transactional
    public void canclePosting(Integer postingSeq) throws RuntimeException {
        Posting posting = postingRepository.findById(postingSeq)
                .orElseThrow(() -> new NotFoundException(ResponseCode.MODIFY_NOT_FOUND));
        posting.setPostingCode("PPS100");

        for (Apply apply : posting.getApplyList()) {
            apply.setStateCode("PAS100");
            apply.setApplyCode("AS104");
        }

        postingRepository.save(posting);
    }

    @Transactional
    public void applySelect(Integer applySeq) throws RuntimeException {
        Apply apply = applyRepository.findById(applySeq)
                .orElseThrow(() -> new NotFoundException(ResponseCode.MODIFY_NOT_FOUND));
        // 지원자 기준 '선발'상태로 변경
        apply.setStateCode("PAS105");
        // 작성자 기준 '대기중'으로 변경
        apply.setApplyCode("AS100");
        applyRepository.save(apply);
    }

    @Transactional
    public void applySelectConfirm(ApplySelectConfirmRequest applySelectConfirmRequest) {
        Apply apply = applyRepository.findById(applySelectConfirmRequest.getApplySeq())
                .orElseThrow(() -> new NotFoundException(ResponseCode.MODIFY_NOT_FOUND));

                if (applySelectConfirmRequest.isSelect()) {
                    // 지원자 기준 '합격'상태로 변경
                    apply.setStateCode("PAS101");
                    // 작성자 기준 '확정'상태로 변경
                    apply.setApplyCode("AS101");

                    // 하트 차감 및 하트 로그 작성
                    User applyUser = apply.getUser();
                    applyUser.setHeartCnt(applyUser.getHeartCnt()-100);
                    userRepository.save(applyUser);

                    UserHeartLog userHeartLog = UserHeartLog.builder()
                            .userSeq(applyUser.getUserSeq())
                            .heartCnt(-100)
                            .content(apply.getPosting().getProject().getSubject()+"에 팀 등록 확정")
                            .build();
                    userHeartLogRepository.save(userHeartLog);

                } else {
                    // 지원자 기준 '지원취소'상태로 변경
                    apply.setStateCode("PAS104");
                    // 작성자 기준 '거절'상태로 변경
                    apply.setApplyCode("AS102");
                }
            }

    @Transactional(readOnly = true)
    public List<FindAllPostingByUserSeqResponse> findAllApplyPosting(Integer userSeq){
        List<Apply> applyList = applyRepository.findByUserSeq(userSeq);
        System.out.println("applyList.toString() = " + applyList.toString());
        return applyList.stream()
                .map(FindAllPostingByUserSeqResponse::toApplyer)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<FindAllPostingByUserSeqResponse> findAllPostPosting(Integer page, Integer size, Integer userSeq){
        List<Posting> postingList = postingRepository.findByUserSeq(userSeq, PageRequest.of(page - 1, size, Sort.Direction.DESC, "postingSeq"));
        return postingList.stream()
                .map(FindAllPostingByUserSeqResponse::toWriter)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Integer countPostPosting(Integer userSeq) {
        return postingRepository.countByUserSeq(userSeq);
    }
}
