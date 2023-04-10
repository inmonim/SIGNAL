package com.ssafysignal.api.project.repository;

import com.ssafysignal.api.project.entity.ProjectEvaluation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectEvaluationRepository extends JpaRepository<ProjectEvaluation, Integer>, JpaSpecificationExecutor<ProjectEvaluation> {
    @Query(value = "SELECT AVG(score) \n" +
            "FROM project_evaluation \n" +
            "WHERE week_cnt = (:weekCnt) \n" +
            "AND to_user_seq = (:toUserSeq);", nativeQuery = true)
    Integer avgScore(@Param("weekCnt") Integer weekCnt, @Param("toUserSeq") Integer toUserSeq);
    List<ProjectEvaluation> findByFromUserSeqAndToUserSeqAndWeekCnt(Integer fromUserSeq, Integer toUserSeq, Integer weekCnt);
}
