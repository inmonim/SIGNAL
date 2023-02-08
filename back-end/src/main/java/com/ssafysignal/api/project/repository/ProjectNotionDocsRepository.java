package com.ssafysignal.api.project.repository;


import com.ssafysignal.api.project.entity.ProjectNotionDocs;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectNotionDocsRepository extends JpaRepository<ProjectNotionDocs, Integer> {
    List<ProjectNotionDocs> findByProjectSeq(int projectSeq);
}
