package com.ssafysignal.api.signalweek.config;

import com.ssafysignal.api.signalweek.entity.Signalweek;
import com.ssafysignal.api.signalweek.entity.SignalweekRank;
import com.ssafysignal.api.signalweek.entity.SignalweekSchedule;
import com.ssafysignal.api.signalweek.repository.SignalweekRankRepository;
import com.ssafysignal.api.signalweek.repository.SignalweekRepository;
import com.ssafysignal.api.signalweek.repository.SignalweekScheduleRepository;
import com.ssafysignal.api.signalweek.repository.SignalweekVoteRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Slf4j
@Component
@Service
@EnableScheduling
@RequiredArgsConstructor
public class SignalweekScheduler {
    private final SignalweekScheduleRepository signalweekScheduleRepository;
    private final SignalweekRankRepository signalweekRankRepository;
    private final SignalweekRepository signalweekRepository;
    private final SignalweekVoteRepository signalweekVoteRepository;

    // 매일 23시 59분 마다 실행되는 스케줄러
    @Scheduled(cron = "0 59 23 * * *", zone = "Asia/Seoul")
    public void makeRanking() {

        try {
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

            List<Ranking> ranking = new ArrayList<>();
            for(Signalweek signalweek : signalweeks){
                int signalweekSeq = signalweek.getSignalweekSeq();
                int view = signalweek.getView();
                int vote = signalweekVoteRepository.countBySignalweekSeq(signalweekSeq);
                int score = view + vote * 5;
                ranking.add(new Ranking(signalweekSeq, score));
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

            log.info("ending signalweek rank - Call");
        } catch (RuntimeException e) {
            log.info("ending signalweek rank Error"+ e);
        }
    }


    static class Ranking implements Comparable<Ranking> {
        int signalweekSeq;
        int score;

        Ranking(int signalweekSeq, int score){
            this.signalweekSeq = signalweekSeq;
            this.score = score;
        }


        @Override
        public int compareTo(Ranking o) {
            return o.score-this.score;
        }
    }
}
