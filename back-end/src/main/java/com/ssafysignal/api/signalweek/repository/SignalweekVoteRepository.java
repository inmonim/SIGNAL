package com.ssafysignal.api.signalweek.repository;

import com.ssafysignal.api.signalweek.entity.SignalweekVote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface SignalweekVoteRepository extends JpaRepository<SignalweekVote, Integer> {
    Optional<SignalweekVote> findBySignalweekSeqAndFromUserSeq(Integer signalweekSeq, Integer fromUserSeq);

    Long countBySignalweekSeq(Integer signalweekSeq);
}
