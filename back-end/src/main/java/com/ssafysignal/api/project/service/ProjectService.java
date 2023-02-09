package com.ssafysignal.api.project.service;

import com.ssafysignal.api.apply.entity.Apply;
import com.ssafysignal.api.apply.repository.ApplyRepository;
import com.ssafysignal.api.global.exception.NotFoundException;
import com.ssafysignal.api.global.response.ResponseCode;
import com.ssafysignal.api.posting.entity.PostingMeeting;
import com.ssafysignal.api.profile.repository.UserHeartLogRepository;
import com.ssafysignal.api.project.dto.reponse.ProjectFindAllResponse;
import com.ssafysignal.api.project.dto.reponse.ProjectFindAllDto;
import com.ssafysignal.api.project.dto.reponse.ProjectFindResponse;
import com.ssafysignal.api.project.entity.*;
import com.ssafysignal.api.project.repository.ProjectRepository;
import com.ssafysignal.api.project.repository.ProjectUserHeartLogRepository;
import com.ssafysignal.api.project.repository.ProjectUserRepository;
import com.ssafysignal.api.user.entity.User;
import com.ssafysignal.api.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectUserRepository projectUserRepository;
    private final ApplyRepository applyRepository;
    private final UserHeartLogRepository userHeartLogRepository;
    private final ProjectUserHeartLogRepository projectUserHeartLogRepository;
    private final UserRepository userRepository;


    @Transactional
    public void registProject(Integer postingSeq) throws RuntimeException {
        Project project = projectRepository.findByPostingSeq(postingSeq)
                .orElseThrow(() -> new NotFoundException(ResponseCode.REGIST_NOT_FOUNT));

        // 대장 넣음
        ProjectUser leader = projectUserRepository.findByProjectSeqAndUserSeq(project.getProjectSeq(), project.getPosting().getUserSeq())
                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));

        // 유저 리스트 초기화
        project.getProjectUserList().clear();
        project.getProjectUserList().add(leader);

        // 해당 공고 미팅 일정 초기화
        for (PostingMeeting postingMeeting : project.getPosting().getPostingMeetingList()) {
            postingMeeting.setPostingMeetingCode("PM101");
        }

        // 나머지 지원자들 탈락 처리
        List<Apply> failList = applyRepository.findByPostingSeqAndApplyCodeNot(postingSeq, "AS101");
        for (Apply apply : failList) {
            apply.setStateCode("PAS102");
            apply.setApplyCode("AS104");
            applyRepository.save(apply);
        }

        
        // 합격자들 합격 처리해서 프로젝트 유저로 이동 (AS101 = 합격)
        List<Apply> pickList = applyRepository.findByPostingSeqAndApplyCode(postingSeq, "AS101");
        project.getProjectUserList().addAll(pickList.stream().map(ProjectUser::fromEntity).collect(Collectors.toList()));

        // 프로젝트 포지션 별 인원 수 계산
        Map<String, Integer> positionCount = new HashMap<>();
        for (ProjectUser user : project.getProjectUserList()) {
            String code = user.getPositionCode();
            if (positionCount.get(code) == null){
                positionCount.put(code, 1);
            } else {
                positionCount.put(code, positionCount.get(code) + 1);
            }
        }

        project.getProjectPositionList().clear();
        for (String key : positionCount.keySet()) {
            project.getProjectPositionList().add(ProjectPosition.builder()
                    .projectSeq(project.getProjectSeq())
                    .positionCode(key)
                    .positionCnt(positionCount.get(key))
                    .build());
        }
        // 프로젝트 "진행중" PS100
        project.setProjectCode("PS100");
        // 공고 "모집 마감" PPS101
        project.getPosting().setPostingCode("PPS101");
        projectRepository.save(project);

        List<ProjectUser> projectUserList = projectRepository.findByPostingSeq(postingSeq).get().getProjectUserList();

        for (ProjectUser projectUser:projectUserList) {
            ProjectUserHeartLog projectUserHeartLog = ProjectUserHeartLog.builder()
                    .projectUserSeq(projectUser.getProjectUserSeq())
                    .heartCnt(100)
                    .content("프로젝트 시작")
                    .build();

            projectUserHeartLogRepository.save(projectUserHeartLog);
        }


    }

    @Transactional(readOnly = true)
    public ProjectFindAllResponse findAllProject(Integer userSeq) {
        List<Project> endProjectList = projectRepository.findAll(ProjectSpecification.byUserSeq(userSeq, "PS101"));
        List<Project> ingProjectList = projectRepository.findAll(ProjectSpecification.byUserSeq(userSeq, "PS100"));

        return ProjectFindAllResponse.builder()
                .endProjectList(endProjectList.stream()
                        .map(ProjectFindAllDto::fromEntity)
                        .collect(Collectors.toList()))
                .ingProjectList(ingProjectList.stream()
                        .map(ProjectFindAllDto::fromEntity)
                        .collect(Collectors.toList()))
                .build();
    }

    @Transactional(readOnly = true)
    public ProjectFindResponse findProject(Integer userSeq, Integer projectSeq) throws RuntimeException {
        Project project = projectRepository.findById(projectSeq)
                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));

        List<ProjectUser> projectUserList = projectUserRepository.findByProjectSeq(projectSeq);
        if (projectUserList.size() == 0) throw new NotFoundException(ResponseCode.NOT_FOUND);

        ProjectUser projectUser = projectUserRepository.findByUserSeqAndProjectSeq(userSeq, projectSeq)
                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));

        ProjectFindResponse projectFindResponse = ProjectFindResponse.fromEntity(project);
        projectFindResponse.setProjectUserList(projectUserList.stream()
                .map(user -> new HashMap<String, Object>() {{
                    put("userSeq", user.getUserSeq());
                    put("nickname", user.getUser().getNickname());
                    put("userImageUrl", user.getUser().getImageFile());
                }})
                .collect(Collectors.toList()));

        projectFindResponse.setHeartCnt(projectUser.getHeartCnt());
        projectFindResponse.setWarningCnt(projectUser.getWarningCnt());

        return projectFindResponse;
    }

    @Transactional
    public void finishProject(Integer projectSeq) throws RuntimeException {
        Project project = projectRepository.findById(projectSeq)
                .orElseThrow(() -> new NotFoundException(ResponseCode.MODIFY_NOT_FOUND));
        project.setProjectCode("PS101");

        List<ProjectUser> projectUserList = projectUserRepository.findByProjectSeq(projectSeq);

        for (ProjectUser projectUser:projectUserList) {

            // global user 가져오기
            User user = projectUser.getUser();

            // global user에 보증금을 더해준다
            user.setHeartCnt(user.getHeartCnt() + projectUser.getHeartCnt());

            // project user의 하트 로그에 보증금 반환 내역 작성 및 저장
            projectUserHeartLogRepository.save(ProjectUserHeartLog.builder()
                    .heartCnt(-projectUser.getHeartCnt())
                    .content(project.getSubject()+" 종료로 인한 보증금 반환")
                    .build());

            // project user의 하트 0으로 만들기
            projectUser.setHeartCnt(0);

            // projectUser, globalUser 저장
            userRepository.save(user);
            projectUserRepository.save(projectUser);
        }

        projectRepository.save(project);
    }
}
