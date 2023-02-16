package com.ssafysignal.api.signalweek.repository;

import com.ssafysignal.api.signalweek.entity.SignalweekVoteHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SignalweekVoteHistoryRepository extends JpaRepository<SignalweekVoteHistory, Integer> {
    Optional<SignalweekVoteHistory> findBySignalweekSeqAndUserSeq(Integer signalweekSeq, Integer userSeq);
}
