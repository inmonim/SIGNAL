package com.ssafysignal.api.project.repository;

import com.ssafysignal.api.project.entity.Project;
import com.ssafysignal.api.project.entity.ProjectEvaluation;
import com.ssafysignal.api.project.entity.ProjectPosition;
import com.ssafysignal.api.project.entity.ProjectSpecification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectEvaluationRepository extends JpaRepository<ProjectEvaluation, Integer>, JpaSpecificationExecutor<ProjectEvaluation> {
}
