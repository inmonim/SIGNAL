package com.ssafysignal.api.project.service;

import com.ssafysignal.api.apply.entity.Apply;
import com.ssafysignal.api.apply.repository.ApplyRepository;
import com.ssafysignal.api.global.exception.NotFoundException;
import com.ssafysignal.api.global.response.ResponseCode;
import com.ssafysignal.api.project.dto.reponse.ProjectApplyDto;
import com.ssafysignal.api.project.dto.reponse.ProjectSettingFindResponse;
import com.ssafysignal.api.project.dto.reponse.ProjectUserFindAllDto;
import com.ssafysignal.api.project.dto.request.ProjectSettingModifyRequest;
import com.ssafysignal.api.project.entity.*;
import com.ssafysignal.api.project.repository.ProjectEvaluationRepository;
import com.ssafysignal.api.project.repository.ProjectPositionRepository;
import com.ssafysignal.api.project.repository.ProjectRepository;
import com.ssafysignal.api.project.repository.ProjectUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectSettingService {

    private final ProjectRepository projectRepository;
    private final ProjectUserRepository projectUserRepository;
    private final ProjectEvaluationRepository projectEvaluationRepository;
    private final ApplyRepository applyRepository;
    private final ProjectPositionRepository projectPositionRepository;

    @Transactional(readOnly = true)
    public ProjectSettingFindResponse findProjectSetting(Integer projectSeq) {
        Project project = projectRepository.findById(projectSeq)
                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));

        return ProjectSettingFindResponse.fromEntity(project);
    }

    @Transactional(readOnly = true)
    public List<ProjectUserFindAllDto> findProjectUser(Integer projectSeq) {
        List<ProjectUser> projectUserList = projectUserRepository.findByProjectSeq(projectSeq);

        return projectUserList.stream()
                .map(ProjectUserFindAllDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<Integer> findProjectUserEvaluation(Integer projectUserSeq, Integer termCnt) {
        projectUserRepository.findById(projectUserSeq)
                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));

        List<ProjectEvaluation> projectEvaluationList = projectEvaluationRepository.findAll(ProjectSpecification.byFromUserSeq(projectUserSeq, termCnt));
        return projectEvaluationList.stream()
                .map(ProjectEvaluation::getToUserSeq)
                .distinct()
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ProjectApplyDto> findAllApplyer(Integer postingSeq) {
        List<Apply> applyList = applyRepository.findByPostingSeq(postingSeq);

        return applyList.stream()
                .map(ProjectApplyDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public void modifyProjectSetting(Integer projectSeq, ProjectSettingModifyRequest projectSettingModifyRequest) {

    }

    @Transactional
    public void deleteProjectUser(Integer projectUserSeq) {
        ProjectUser projectUser = projectUserRepository.findById(projectUserSeq)
                .orElseThrow(() -> new NotFoundException(ResponseCode.DELETE_NOT_FOUND));
        projectUserRepository.delete(projectUser);

        ProjectPosition projectPosition = projectPositionRepository.findByProjectSeqAndPositionCode(projectUser.getProjectSeq(), projectUser.getPositionCode())
                .orElseThrow(() -> new NotFoundException(ResponseCode.DELETE_NOT_FOUND));
        projectPosition.setPositionCnt(projectPosition.getPositionCnt() - 1);
        projectPositionRepository.save(projectPosition);
    }

    @Transactional
    public void registProjectUserEvaluation(ProjectEvaluation projectEvaluation) {
        // 이미 등록됬는지 확인
    }
}
