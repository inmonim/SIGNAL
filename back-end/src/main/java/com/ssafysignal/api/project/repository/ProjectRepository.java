package com.ssafysignal.api.project.repository;

import com.ssafysignal.api.project.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Integer>, JpaSpecificationExecutor<Project> {
    Optional<Project> findByPostingSeq(Integer postingSeq);

    List<Project> findByProjectCode(String projectCode);
}
