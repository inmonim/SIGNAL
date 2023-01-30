package com.ssafysignal.api.project.service;

import com.ssafysignal.api.apply.entity.Apply;
import com.ssafysignal.api.apply.repository.ApplyRepository;
import com.ssafysignal.api.common.entity.ImageFile;
import com.ssafysignal.api.common.repository.ImageFileRepository;
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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectSettingService {

    private final ProjectRepository projectRepository;
    private final ProjectUserRepository projectUserRepository;
    private final ProjectEvaluationRepository projectEvaluationRepository;
    private final ApplyRepository applyRepository;
    private final ProjectPositionRepository projectPositionRepository;
    private final ImageFileRepository imageFileRepository;

    @Value("${app.fileUpload.uploadPath}")
    private String uploadPath;
    @Value("${app.fileUpload.uploadDir.projectImage}")
    private String uploadDir;

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
    public void modifyProjectSetting(Integer projectSeq, MultipartFile uploadImage, ProjectSettingModifyRequest projectSettingModifyRequest) throws RuntimeException, IOException {
        /*
            이미지 처리
         */

        // 디렉토리 없으면 생성
        String uploadFullPath = uploadPath + File.separator + uploadDir;

        File uploadPosition = new File(uploadFullPath);
        if (!uploadPosition.exists()) uploadPosition.mkdir();

        // 현재 프로필이 있는지 확인
//        Project project = projectRepository.findById(projectSeq)
//                .orElseThrow(() -> new NotFoundException(ResponseCode.))

        // 이름, 확장자, url 생성
        String fileName = uploadImage.getOriginalFilename();
        String name = UUID.randomUUID().toString();
        String type = Optional.ofNullable(fileName)
                .filter(f -> f.contains("."))
                .map(f -> f.substring(fileName.lastIndexOf(".") + 1))
                .orElseThrow(() -> new NotFoundException(ResponseCode.MODIFY_NOT_FOUND));
        String url = String.format("%s%s%s.%s",uploadFullPath, File.separator, name, type);

        // 이미지 Entity 생성
        ImageFile imageFile = ImageFile.builder()
                .name(uploadImage.getOriginalFilename())
                .size(uploadImage.getSize())
                .type(type)
                .url(url)
                .build();

        // 이미지 저장
        File saveFile = new File(url);
        uploadImage.transferTo(saveFile);   

        // DB 저장
        imageFileRepository.save(imageFile);
        
        
        /*
            프로젝트 설정 데이터 처리
         */



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
