package com.ssafysignal.api.signalweek.repository;

import com.ssafysignal.api.signalweek.entity.Signalweek;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SignalweekRepository extends JpaRepository<Signalweek, Integer> {
}
