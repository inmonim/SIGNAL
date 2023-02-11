package com.ssafysignal.api.project.repository;

import com.ssafysignal.api.project.entity.ProjectUserHeartLog;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface ProjectUserHeartLogRepository extends JpaRepository<ProjectUserHeartLog, Integer> {

    Optional<ProjectUserHeartLog> findByProjectUserSeq(Integer UserSeq);

    List<ProjectUserHeartLog> findAllByProjectUserSeq(Integer projectUserSeq, Sort sort);
}
