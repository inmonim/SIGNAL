package com.ssafysignal.api.project.repository;

import com.ssafysignal.api.project.entity.ProjectUserHeartLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ProjectUserHeartLogRepository extends JpaRepository<ProjectUserHeartLog, Integer> {

    List<ProjectUserHeartLog> findAllByProjectUserSeq(Integer projectUserSeq);
}
