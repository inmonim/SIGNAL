package com.ssafysignal.api.project.repository;

import com.ssafysignal.api.project.entity.ProjectUserHeartLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ProjectUserHeartLogRepository extends JpaRepository<ProjectUserHeartLog, Integer> {
}
