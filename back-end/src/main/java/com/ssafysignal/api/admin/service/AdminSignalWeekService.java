package com.ssafysignal.api.admin.service;

import com.ssafysignal.api.admin.dto.request.BasicAdminSignalWeekRequest;
import com.ssafysignal.api.admin.dto.response.FindAdminSignalWeekResponse;
import com.ssafysignal.api.admin.dto.response.FindAllAdminSignalweekResponse;
import com.ssafysignal.api.global.exception.NotFoundException;
import com.ssafysignal.api.global.response.ResponseCode;
import com.ssafysignal.api.signalweek.config.SignalweekScheduler;
import com.ssafysignal.api.signalweek.entity.Signalweek;
import com.ssafysignal.api.signalweek.entity.SignalweekRank;
import com.ssafysignal.api.signalweek.entity.SignalweekSchedule;
import com.ssafysignal.api.signalweek.repository.SignalweekRankRepository;
import com.ssafysignal.api.signalweek.repository.SignalweekRepository;
import com.ssafysignal.api.signalweek.repository.SignalweekScheduleRepository;
import com.ssafysignal.api.signalweek.repository.SignalweekVoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminSignalWeekService {
    private final SignalweekScheduleRepository signalweekScheduleRepository;
    @Transactional(readOnly = true)
    public FindAllAdminSignalweekResponse findAllSignalWeek(Integer page, Integer size) {
        Page<SignalweekSchedule> signalweekSchedulePage = signalweekScheduleRepository.findAll(PageRequest.of(page - 1, size, Sort.Direction.DESC, "signalweekScheduleSeq"));

        return FindAllAdminSignalweekResponse.builder()
                .signalweekList(signalweekSchedulePage.stream().map(FindAdminSignalWeekResponse::fromEntity).collect(Collectors.toList()))
                .count(signalweekSchedulePage.getTotalElements())
                .build();
    }

    @Transactional
    public void registSignalWeek(BasicAdminSignalWeekRequest basicAdminSignalWeekRequest) throws RuntimeException {
        signalweekScheduleRepository.save(SignalweekSchedule.builder()
                        .openStartDt(basicAdminSignalWeekRequest.getOpenStartDt())
                        .openEndDt(basicAdminSignalWeekRequest.getOpenEndDt())
                        .voteStartDt(basicAdminSignalWeekRequest.getVoteStartDt())
                        .voteEndDt(basicAdminSignalWeekRequest.getVoteEndDt())
                        .quarter(basicAdminSignalWeekRequest.getQuarter())
                        .year(basicAdminSignalWeekRequest.getYear())
                        .build());
    }

    @Transactional
    public void modifySignalWeek(Integer signalweekScheduleSeq, BasicAdminSignalWeekRequest basicAdminSignalWeekRequest) throws RuntimeException {
        SignalweekSchedule signalweekSchedule = signalweekScheduleRepository.findById(signalweekScheduleSeq)
                .orElseThrow(() -> new NotFoundException(ResponseCode.MODIFY_NOT_FOUND));

        signalweekSchedule.setOpenStartDt(basicAdminSignalWeekRequest.getOpenStartDt());
        signalweekSchedule.setOpenEndDt(basicAdminSignalWeekRequest.getOpenEndDt());
        signalweekSchedule.setVoteStartDt(basicAdminSignalWeekRequest.getVoteStartDt());
        signalweekSchedule.setVoteEndDt(basicAdminSignalWeekRequest.getVoteEndDt());
        signalweekSchedule.setQuarter(basicAdminSignalWeekRequest.getQuarter());
        signalweekSchedule.setYear(basicAdminSignalWeekRequest.getYear());

        signalweekScheduleRepository.save(signalweekSchedule);
    }

    @Transactional
    public void deleteSignalWeek(Integer signalweekScheduleSeq) throws RuntimeException {
        SignalweekSchedule signalweekSchedule = signalweekScheduleRepository.findById(signalweekScheduleSeq)
                .orElseThrow(() -> new NotFoundException(ResponseCode.MODIFY_NOT_FOUND));

        signalweekScheduleRepository.delete(signalweekSchedule);
    }
    @Transactional
    public void signalweekScheduler() {
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
}
