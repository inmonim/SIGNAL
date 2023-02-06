package com.ssafysignal.api.common.repository;

import com.ssafysignal.api.common.entity.ProjectFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectFileRepository extends JpaRepository<ProjectFile, Integer> {
    
}
