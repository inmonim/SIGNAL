package com.ssafysignal.api.admin.service;

import com.ssafysignal.api.admin.dto.response.FindAdminProjectResponse;
import com.ssafysignal.api.admin.dto.response.FindAllAdminProjectResponse;
import com.ssafysignal.api.project.entity.Project;
import com.ssafysignal.api.project.entity.ProjectUser;
import com.ssafysignal.api.project.entity.ProjectUserHeartLog;
import com.ssafysignal.api.project.repository.ProjectEvaluationRepository;
import com.ssafysignal.api.project.repository.ProjectRepository;
import com.ssafysignal.api.project.repository.ProjectUserHeartLogRepository;
import com.ssafysignal.api.project.repository.ProjectUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectUserRepository projectUserRepository;
    private final ProjectEvaluationRepository projectEvaluationRepository;
    private final ProjectUserHeartLogRepository projectUserHeartLogRepository;

    @Transactional(readOnly = true)
    public FindAllAdminProjectResponse findAllProject(Integer page, Integer size) {
        Page<Project> projectPage = projectRepository.findAll(PageRequest.of(page - 1, size, Sort.Direction.ASC, "projectSeq"));

        return FindAllAdminProjectResponse.builder()
                .projectList(projectPage.stream().map(FindAdminProjectResponse::fromEntity).collect(Collectors.toList()))
                .count(projectPage.getTotalElements())
                .build();
    }

    @Transactional
    public void evaluationScheduler(){
        // 진행중인 프로젝트 리스트 가져오기
        List<Project> projectList = projectRepository.findByProjectCode("PS100");
        // 지금 날짜 확인
        // 내일날짜로 변경해서 돌림
        LocalDate now = LocalDate.now().plusDays(1);

        for (Project project : projectList) {
            // 진행중인 리스트 중에, 평가 마감일이 지금 날짜보다 이전인 경우, 함수의 대상이 됨
            if (now.isAfter(project.getEvaluationDt())) {
                // 프로젝트의 텀(진행 주차) 가져오기
                Integer projectWeekCnt = project.getWeekCnt();
                // 프로젝트 유저 목록 가져오기
                List<ProjectUser> projectUserList = projectUserRepository.findByProjectSeq(project.getProjectSeq());

                // 평가안한 항목 있는지 확인

                // 유저 목록 순회
                for (ProjectUser projectUser : projectUserList) {
                    Integer projectUserSeq = projectUser.getProjectUserSeq();
                    // 텀과 to_user를 기준으로 평균값 뽑아내기
                    Integer score = projectEvaluationRepository.avgScore(projectWeekCnt, projectUserSeq);

                    if (score == null) continue;

                    if (score < 30) {
                        System.out.println(projectUser.getUser().getNickname() + " = " + score);
                        // 경고 1회 추가
                        projectUser.setWarningCnt(projectUser.getWarningCnt() + 1);
                        if (projectUser.getHeartCnt() > 0) {
                            projectUser.setHeartCnt(projectUser.getHeartCnt() - 10);
                            projectUserRepository.save(projectUser);
                            projectUserHeartLogRepository.save(ProjectUserHeartLog.builder()
                                    .projectUserSeq(projectUserSeq)
                                    .heartCnt(-10)
                                    .content("경고로 인한 보증금 삭감")
                                    .build());
                        }
                    }
                }
                project.setEvaluationDt(project.getEvaluationDt().plusWeeks(1));
                project.setWeekCnt(projectWeekCnt + 1);
                projectRepository.save(project);
            }
        }
    }
}
