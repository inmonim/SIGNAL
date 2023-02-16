package com.ssafysignal.api.signalweek.repository;

import com.ssafysignal.api.project.entity.Project;
import com.ssafysignal.api.signalweek.entity.Signalweek;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SignalweekRepository extends JpaRepository<Signalweek, Integer> {
    Optional<Signalweek> findBySignalweekSeq(Integer signalweekSeq);
    Optional<Signalweek> findByProject(Project project);
    Page<Signalweek> findByTitleContainingAndSignalweekScheduleSeq(String keyword, Integer signalweekScheduleSeq, PageRequest signalweekSeq);
    
    List<Signalweek> findAllBySignalweekScheduleSeq(Integer signalweekScheduleSeq);
}
