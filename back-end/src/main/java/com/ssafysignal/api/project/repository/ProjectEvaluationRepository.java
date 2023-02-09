package com.ssafysignal.api.project.repository;

import com.ssafysignal.api.project.entity.Project;
import com.ssafysignal.api.project.entity.ProjectEvaluation;
import com.ssafysignal.api.project.entity.ProjectPosition;
import com.ssafysignal.api.project.entity.ProjectSpecification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectEvaluationRepository extends JpaRepository<ProjectEvaluation, Integer>, JpaSpecificationExecutor<ProjectEvaluation> {

    List<ProjectEvaluation> findByProjectSeqAndTermCnt(Integer projectSeq, Integer TermCnt);

    @Query(value = "SELECT AVG(score) \n" +
            "FROM project_evaluation \n" +
            "WHERE term_cnt = (:weekCnt) \n" +
            "AND to_user_seq = (:toUserSeq);", nativeQuery = true)
    Integer avgScore(@Param("weekCnt") Integer weekCnt, @Param("toUserSeq") Integer toUserSeq);
}
