package com.ssafysignal.api.project.repository;

import com.ssafysignal.api.project.entity.ProjectPosition;
import com.ssafysignal.api.project.entity.ProjectUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectPositionRepository extends JpaRepository<ProjectPosition, Integer> {
    Optional<ProjectPosition> findByProjectSeqAndPositionCode(Integer projectSeq, String positionCode);
}
