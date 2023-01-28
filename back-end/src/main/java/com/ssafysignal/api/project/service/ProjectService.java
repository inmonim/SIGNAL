package com.ssafysignal.api.project.service;

import com.ssafysignal.api.apply.entity.Apply;
import com.ssafysignal.api.apply.repository.ApplyRepository;
import com.ssafysignal.api.global.exception.NotFoundException;
import com.ssafysignal.api.global.response.ResponseCode;
import com.ssafysignal.api.project.dto.reponse.ProjectFindAllResponse;
import com.ssafysignal.api.project.dto.reponse.ProjectFindAllResponseItem;
import com.ssafysignal.api.project.dto.reponse.ProjectFindResponse;
import com.ssafysignal.api.project.dto.request.ProjectRegistRequest;
import com.ssafysignal.api.project.entity.Project;
import com.ssafysignal.api.project.entity.ProjectSpecification;
import com.ssafysignal.api.project.entity.ProjectUser;
import com.ssafysignal.api.project.repository.ProjectRepository;
import com.ssafysignal.api.project.repository.ProjectUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectUserRepository projectUserRepository;
    private final ApplyRepository applyRepository;

    @Transactional
    public void registProject(ProjectRegistRequest projectRegistRequest) throws RuntimeException {

        Project project = projectRepository.findByPostingSeq(projectRegistRequest.getPostingSeq())
                .orElseThrow(() -> new NotFoundException(ResponseCode.REGIST_NOT_FOUNT));

        for (Integer applySeq : projectRegistRequest.getApplyList()){
            Apply apply = applyRepository.findById(applySeq)
                            .orElseThrow(() -> new NotFoundException(ResponseCode.REGIST_NOT_FOUNT));

            projectUserRepository.save(ProjectUser.builder()
                                    .userSeq(apply.getUserSeq())
                                    .projectSeq(project.getProjectSeq())
                                    .positionCode(apply.getPositionCode())
                                    .build());
        }
    }

    @Transactional(readOnly = true)
    public ProjectFindAllResponse findAllProject(Integer userSeq) {
        List<Project> endProjectList = projectRepository.findAll(ProjectSpecification.byUserSeq(userSeq, "PS101"));
        List<Project> ingProjectList = projectRepository.findAll(ProjectSpecification.byUserSeq(userSeq, "PS100"));

        return ProjectFindAllResponse.builder()
                .endProjectList(endProjectList.stream()
                        .map(ProjectFindAllResponseItem::fromEntity)
                        .collect(Collectors.toList()))
                .ingProjectList(ingProjectList.stream()
                        .map(ProjectFindAllResponseItem::fromEntity)
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
                .map(user -> user.getUser().getNickname())
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
