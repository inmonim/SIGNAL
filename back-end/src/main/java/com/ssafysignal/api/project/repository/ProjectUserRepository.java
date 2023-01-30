package com.ssafysignal.api.project.repository;

import com.ssafysignal.api.project.entity.Project;
import com.ssafysignal.api.project.entity.ProjectUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectUserRepository extends JpaRepository<ProjectUser, Integer> {
    List<ProjectUser> findByProjectSeq(Integer projectSeq);
    Optional<ProjectUser> findByUserSeqAndProjectSeq(Integer userSeq, Integer projectSeq);
    Optional<ProjectUser> findByProjectSeqAndUserSeq(Integer projectSeq, Integer userSeq);
}
