package com.ssafysignal.api.posting.service;

import com.ssafysignal.api.global.response.BasicResponse;
import com.ssafysignal.api.posting.dto.request.PostingBasicRequest;
import com.ssafysignal.api.posting.dto.response.PostingFindAllResponse;
import com.ssafysignal.api.posting.dto.response.PostingFindResponse;
import com.ssafysignal.api.posting.entity.*;
import com.ssafysignal.api.posting.repository.*;
import com.ssafysignal.api.project.entity.Project;
import com.ssafysignal.api.project.entity.ProjectSpecification;
import com.ssafysignal.api.project.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class PostingService {

    @Autowired
    private final ProjectRepository projectRepository;
    @Autowired
    private final PostingRepository postingRepository;
    @Autowired
    private final PostingSkillRepository postingSkillRepository;
    @Autowired
    private final PostingMeetingRepository postingMeetingRepository;
    @Autowired
    private final PostingPositionRepository postingPositionRepository;
    @Autowired
    private final PostingQuestionRepository postingQuestionRepository;

    @Transactional
    public BasicResponse registPosting(PostingBasicRequest postingRegistRequest) {

        // 공고 등록
        Posting posting = Posting.builder()
                .user(postingRegistRequest.getUserSeq())
                .content(postingRegistRequest.getContent())
                .postingEndDt(postingRegistRequest.getPostingEndDt())
                .level(postingRegistRequest.getLevel())
                .build();

        postingRepository.save(posting);

        // 기술 스택
        for (String skill : postingRegistRequest.getPostingSkillList()) {
            postingSkillRepository.save(PostingSkill.builder()
                    .postingSeq(posting.getPostingSeq())
                    .skillCode(skill)
                    .build()
            );
        }
        // 사전 미팅
        for (LocalDateTime meeting : postingRegistRequest.getPostingMeetingList()) {
            postingMeetingRepository.save(PostingMeeting.builder()
                    .postingSeq(posting.getPostingSeq())
                    .fromUserSeq(postingRegistRequest.getUserSeq())
                    .meetingDt(meeting)
                    .build()
            );
        }
        // 포지션
        for (Map<String, Object> position : postingRegistRequest.getPostingPositionList()) {
            postingPositionRepository.save(PostingPosition.builder()
                    .postingSeq(posting.getPostingSeq())
                    .positionCode((String) position.get("positionCode"))
                    .positionCnt((Integer) position.get("positionCnt"))
                    .build()
            );
        }
        // 사전 질문
        for (Map<String, Object> question : postingRegistRequest.getPostingQuestionList()) {
            postingQuestionRepository.save(PostingQuestion.builder()
                    .postingSeq(posting.getPostingSeq())
                    .num((Integer) question.get("num"))
                    .content((String) question.get("content"))
                    .build()
            );
        }
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

        return BasicResponse.Body("success", "공고 등록 성공", null);
    }

    @Transactional(readOnly = true)
    public BasicResponse findAllPosting(Integer page, Integer size, Map<String, Object> searchKeys){
        Page<Project> findProjectList = projectRepository.findAll(ProjectSpecification.searchWord(searchKeys), PageRequest.of(page - 1, size, Sort.Direction.ASC, "projectSeq"));
        return BasicResponse.Body("success", "공고 상세 조회 성공", PostingFindAllResponse.fromEntity(findProjectList));
    }

    @Transactional(readOnly = true)
    public BasicResponse findPosting(Integer postingSeq){
        if (postingRepository.findById(postingSeq).isPresent()){
            Project project = projectRepository.findByPostingSeq(postingSeq).get();
            return BasicResponse.Body("success", "공고 상세 조회 성공", PostingFindResponse.fromEntity(project));
        }

        return BasicResponse.Body("fail", "공고 상세 조회 실패", null);
    }

    @Transactional
    public BasicResponse modifyPosting(Integer postingSeq, PostingBasicRequest postingModifyRequest){
        if (postingRepository.findById(postingSeq).isPresent()) {
            // 공고 수정
            Posting posting = postingRepository.findById(postingSeq).get();
            posting.setContent(postingModifyRequest.getContent());
            posting.setPostingEndDt(postingModifyRequest.getPostingEndDt());
            posting.setLevel(postingModifyRequest.getLevel());

            // 기술 스택
//            List<PostingSkill> postingSkillList = new ArrayList<>();
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
//            List<PostingMeeting> postingMeetingList = new ArrayList<>();
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
//            List<PostingPosition> postingPositionList = new ArrayList<>();
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
//            List<PostingQuestion> postingQuestionList = new ArrayList<>();
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
            Project project = projectRepository.findByPostingSeq(postingSeq).get();
            project.setSubject(postingModifyRequest.getSubject());
            project.setLocalCode(postingModifyRequest.getLocalCode());
            project.setFieldCode(postingModifyRequest.getFieldCode());
            project.setContact(postingModifyRequest.getIsContact());
            project.setTerm(postingModifyRequest.getTerm());
            projectRepository.save(project);

            return BasicResponse.Body("success", "공고 수정 성공", null);
        }
        return BasicResponse.Body("fail", "공고 수정 실패", null);
    }

    @Transactional
    public BasicResponse canclePosting(Integer postingSeq) {
        if (postingRepository.findById(postingSeq).isPresent()){
            Posting posting = postingRepository.findById(postingSeq).get();
            posting.setPostingCode("PPS100");
            postingRepository.save(posting);
            return BasicResponse.Body("success", "공고 취소 성공", null);
        }
        return BasicResponse.Body("fail", "공고 취소 실패", null);
    }
}
