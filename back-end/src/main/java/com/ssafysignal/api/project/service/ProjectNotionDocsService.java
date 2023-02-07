package com.ssafysignal.api.project.service;


import com.ssafysignal.api.global.exception.NotFoundException;
import com.ssafysignal.api.global.response.ResponseCode;
import com.ssafysignal.api.project.entity.ProjectNotionDocs;
import com.ssafysignal.api.project.repository.ProjectNotionDocsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectNotionDocsService {
    private final ProjectNotionDocsRepository projectNotionDocsRepository;

    @Transactional
    public void registNotionDocs(int projectSeq, String url, String subject){
        ProjectNotionDocs projectNotionDocs = ProjectNotionDocs.builder()
                .projectSeq(projectSeq)
                .url(url)
                .subject(subject)
                .build();
        projectNotionDocsRepository.save(projectNotionDocs);
    }

    @Transactional
    public void modifyNotionDocs(int notionDocsSeq, String url){
        ProjectNotionDocs projectNotionDocs = projectNotionDocsRepository.findById(notionDocsSeq)
                .orElseThrow(() -> new NotFoundException(ResponseCode.MODIFY_NOT_FOUND));
        projectNotionDocs.setUrl(url);
        projectNotionDocsRepository.save(projectNotionDocs);
    }

    @Transactional
    public void deleteNotionDocs(int notionDocsSeq){
        ProjectNotionDocs projectNotionDocs = projectNotionDocsRepository.findById(notionDocsSeq)
                .orElseThrow(() -> new NotFoundException(ResponseCode.DELETE_NOT_FOUND));
        projectNotionDocsRepository.deleteById(notionDocsSeq);
    }

    @Transactional(readOnly = true)
    public List<ProjectNotionDocs> FindAllNotiondocs(int projectSeq){
        List<ProjectNotionDocs> projectNotionDocsList = projectNotionDocsRepository.findByProjectSeq(projectSeq);
        return projectNotionDocsList;
    }
}
