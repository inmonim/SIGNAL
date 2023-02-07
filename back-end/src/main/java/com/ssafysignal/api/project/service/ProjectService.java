package com.ssafysignal.api.project.service;

import com.ssafysignal.api.apply.entity.Apply;
import com.ssafysignal.api.apply.repository.ApplyRepository;
import com.ssafysignal.api.global.exception.NotFoundException;
import com.ssafysignal.api.global.response.ResponseCode;
import com.ssafysignal.api.project.dto.reponse.ProjectFindAllResponse;
import com.ssafysignal.api.project.dto.reponse.ProjectFindAllDto;
import com.ssafysignal.api.project.dto.reponse.ProjectFindResponse;
import com.ssafysignal.api.project.entity.Project;
import com.ssafysignal.api.project.entity.ProjectPosition;
import com.ssafysignal.api.project.entity.ProjectSpecification;
import com.ssafysignal.api.project.entity.ProjectUser;
import com.ssafysignal.api.project.repository.ProjectRepository;
import com.ssafysignal.api.project.repository.ProjectUserRepository;
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

    @Transactional
    public void registProject(Integer postingSeq) throws RuntimeException {
        Project project = projectRepository.findByPostingSeq(postingSeq)
                .orElseThrow(() -> new NotFoundException(ResponseCode.REGIST_NOT_FOUNT));

        Set<Integer> userSeqList = project.getProjectUserList().stream().map(ProjectUser::getUserSeq).collect(Collectors.toSet());
        List<Apply> pickList = applyRepository.findUserSeqByPostingSeqAndApplyCode(postingSeq, "AS101");
        userSeqList.addAll(pickList.stream().map(Apply::getUserSeq).collect(Collectors.toList()));

        project.getProjectUserList().clear();
        // 선정된 팀원 (인원 추가되는 기능까지 포함한 구현)
        for (Integer userSeq : userSeqList){
            if (userSeq == project.getPosting().getUserSeq()) {
                ProjectUser leader = projectUserRepository.
                continue;
            }
            Apply apply = applyRepository.findByUserSeqAndPostingSeqAndApplyCode(userSeq, postingSeq, "AS101")
                    .orElseThrow(() -> new NotFoundException(ResponseCode.REGIST_NOT_FOUNT));

            project.getProjectUserList().add(ProjectUser.builder()
                    .userSeq(apply.getUserSeq())
                    .projectSeq(project.getProjectSeq())
                    .positionCode(apply.getPositionCode())
                    .build());
        }

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
        projectRepository.save(project);
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
        projectRepository.save(project);
    }
}
