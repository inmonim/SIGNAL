package com.ssafysignal.api.signalweek.config;

import com.ssafysignal.api.project.entity.Project;
import com.ssafysignal.api.project.entity.ProjectUser;
import com.ssafysignal.api.project.entity.ProjectUserHeartLog;
import com.ssafysignal.api.project.repository.*;
import com.ssafysignal.api.signalweek.entity.Signalweek;
import com.ssafysignal.api.signalweek.entity.SignalweekRank;
import com.ssafysignal.api.signalweek.entity.SignalweekSchedule;
import com.ssafysignal.api.signalweek.repository.SignalweekRankRepository;
import com.ssafysignal.api.signalweek.repository.SignalweekRepository;
import com.ssafysignal.api.signalweek.repository.SignalweekScheduleRepository;
import com.ssafysignal.api.signalweek.repository.SignalweekVoteRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@SpringBootTest
class SignalweekSchedulerTest {
    @Autowired
    private SignalweekScheduleRepository signalweekScheduleRepository;
    @Autowired
    private SignalweekRankRepository signalweekRankRepository;
    @Autowired
    private SignalweekRepository signalweekRepository;
    @Autowired
    private SignalweekVoteRepository signalweekVoteRepository;

    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private ProjectUserHeartLogRepository projectUserHeartLogRepository;
    @Autowired
    private ProjectUserRepository projectUserRepository;
    @Autowired
    private ProjectEvaluationRepository projectEvaluationRepository;
    @Autowired
    private ProjectEvaluationQuestionRepository projectEvaluationQuestionRepository;

    // 시연용 시그널 합산
    @Test
    void signalweekTest() {
        LocalDate now = LocalDate.now();
        int curYear = now.getYear();
        int curMonth = now.getMonthValue();
        int curDay = now.getDayOfMonth();
        int curQuarter = (int)((curMonth-1)/3)+1;

        //현재 분기 스케쥴가져오기
        SignalweekSchedule signalweekSchedule = signalweekScheduleRepository.findByYearAndQuarter(curYear, curQuarter);
        if(signalweekSchedule == null) //아직 이번분기 시그널 위크 없음
            return;

        LocalDate endDt = signalweekSchedule.getVoteEndDt();
        if(endDt.getMonthValue() != curMonth || endDt.getDayOfMonth() != curDay) //오늘 합산 날짜아님
            return;

        Integer signalweekRankCnt = signalweekRankRepository.countBySignalweekScheduleSeq(signalweekSchedule.getSignalweekScheduleSeq());
        if(signalweekRankCnt > 0) //이미 랭킹 합산 돼있음
            return;

        Integer signalweekScheduleSeq = signalweekSchedule.getSignalweekScheduleSeq();
        List<Signalweek> signalweeks = signalweekRepository.findAllBySignalweekScheduleSeq(signalweekScheduleSeq);

        List<SignalweekScheduler.Ranking> ranking = new ArrayList<>();
        for(Signalweek signalweek : signalweeks){
            int signalweekSeq = signalweek.getSignalweekSeq();
            int view = signalweek.getView();
            int vote = signalweekVoteRepository.countBySignalweekSeq(signalweekSeq);
            int score = view + vote * 5;
            ranking.add(new SignalweekScheduler.Ranking(signalweekSeq, score));
        }
        Collections.sort(ranking);

        for(int i=0; i<Math.min(3,ranking.size()); i++){
            Integer signalweekSeq = ranking.get(i).signalweekSeq;
            SignalweekRank signalweekRank = SignalweekRank.builder()
                    .signalweekSeq(signalweekSeq)
                    .signalweekScheduleSeq(signalweekScheduleSeq)
                    .ranking(i+1)
                    .build();
            signalweekRankRepository.save(signalweekRank);
        }

        signalweekSchedule.setVoteEndDt(LocalDate.now().minusDays(1));
        signalweekScheduleRepository.save(signalweekSchedule);
    }

    @Test
//    @Transactional
    void evaluationTest() {
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