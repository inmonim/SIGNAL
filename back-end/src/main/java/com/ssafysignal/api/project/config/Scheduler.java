package com.ssafysignal.api.project.config;

import com.ssafysignal.api.project.entity.Project;
import com.ssafysignal.api.project.entity.ProjectUser;
import com.ssafysignal.api.project.entity.ProjectUserHeartLog;
import com.ssafysignal.api.project.repository.ProjectEvaluationRepository;
import com.ssafysignal.api.project.repository.ProjectRepository;
import com.ssafysignal.api.project.repository.ProjectUserHeartLogRepository;
import com.ssafysignal.api.project.repository.ProjectUserRepository;
import com.ssafysignal.api.user.entity.User;
import com.ssafysignal.api.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Slf4j
@Component
@Service
@EnableScheduling
@RequiredArgsConstructor
public class Scheduler {
    private final ProjectRepository projectRepository;
    private final ProjectUserHeartLogRepository projectUserHeartLogRepository;
    private final ProjectUserRepository projectUserRepository;
    private final ProjectEvaluationRepository projectEvaluationRepository;

    @Scheduled(cron = "0 10 0 * * *", zone = "Asia/Seoul")
    public void endingEvaluation() {

        try {
            // 진행중인 프로젝트 리스트 가져오기
            List<Project> projectList = projectRepository.findByProjectCode("PS100");

            // 지금 날짜 확인
            LocalDate now = LocalDate.now();

            for (Project project : projectList) {

                // 진행중인 리스트 중에, 평가 마감일이 지금 날짜보다 이전인 경우, 함수의 대상이 됨
                if (now.isAfter(project.getEvaluationDt())) {

                    // 프로젝트의 텀(진행 주차) 가져오기
                    Integer projectWeekCnt = project.getWeekCnt();

                    // 프로젝트 유저 목록 가져오기
                    List<ProjectUser> projectUserList = projectUserRepository.findByProjectSeq(project.getProjectSeq());

                    // 유저 목록 순회
                    for (ProjectUser projectUser : projectUserList) {
                        Integer projectUserSeq = projectUser.getProjectUserSeq();

                        // 텀과 to_user를 기준으로 평균값 뽑아내기
                        if (projectEvaluationRepository.avgScore(projectWeekCnt, projectUserSeq) < 3) {
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
            log.info("endingEvaluation - Call");
        } catch (RuntimeException e) {
            log.info("endingEvaluation Error"+ e);
        }
    }
}
