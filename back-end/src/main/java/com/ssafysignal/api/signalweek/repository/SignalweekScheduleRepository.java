package com.ssafysignal.api.signalweek.repository;

import com.ssafysignal.api.signalweek.entity.SignalweekSchedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SignalweekScheduleRepository extends JpaRepository<SignalweekSchedule, Integer> {

    List<SignalweekSchedule> findTop1ByOrderByRegDtAsc();

    List<SignalweekSchedule> findByYearAndQuarter(Integer year, Integer quarter);
}
