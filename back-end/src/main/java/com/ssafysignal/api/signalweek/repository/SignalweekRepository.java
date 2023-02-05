package com.ssafysignal.api.signalweek.repository;

import com.ssafysignal.api.signalweek.entity.Signalweek;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SignalweekRepository extends JpaRepository<Signalweek, Integer> {

    Optional<Signalweek> findBySignalweekSeq(Integer signalweekSeq);
}
