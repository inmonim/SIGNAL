package com.ssafysignal.api.signalweek.repository;

import com.ssafysignal.api.signalweek.entity.SignalweekRank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SignalweekRankRepository extends JpaRepository<SignalweekRank, Integer> {
    List<SignalweekRank> findAllBySignalweekScheduleSeq(Integer signalweekScheduleSeq);
}
