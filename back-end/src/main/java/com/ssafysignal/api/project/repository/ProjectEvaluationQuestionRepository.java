package com.ssafysignal.api.project.repository;

import com.ssafysignal.api.project.entity.ProjectEvaluation;
import com.ssafysignal.api.project.entity.ProjectEvaluationQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectEvaluationQuestionRepository extends JpaRepository<ProjectEvaluationQuestion, Integer> {
}
