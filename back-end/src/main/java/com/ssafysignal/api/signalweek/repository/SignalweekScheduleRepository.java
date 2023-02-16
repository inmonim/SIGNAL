package com.ssafysignal.api.signalweek.repository;

import com.ssafysignal.api.signalweek.entity.SignalweekSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface SignalweekScheduleRepository extends JpaRepository<SignalweekSchedule, Integer> {
    List<SignalweekSchedule> findTop1ByOrderByRegDtAsc();
    SignalweekSchedule findByYearAndQuarter(Integer year, Integer quarter);
    @Query(value = "select * from signalweek_schedule where :now >= open_start_dt and :now <= vote_end_dt", nativeQuery = true)
    Optional<SignalweekSchedule> findByDate(LocalDate now);
    @Query(value = "select * from signalweek_schedule where :now > vote_end_dt order by vote_end_dt desc limit 1", nativeQuery = true)
    Optional<SignalweekSchedule> findByPastDate(LocalDate now);
}
