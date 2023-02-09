package com.ssafysignal.api.project.service;


import com.ssafysignal.api.global.exception.NotFoundException;
import com.ssafysignal.api.global.response.ResponseCode;
import com.ssafysignal.api.project.entity.ProjectNotionDocs;
import com.ssafysignal.api.project.repository.ProjectNotionDocsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectNotionDocsService {
    private final ProjectNotionDocsRepository projectNotionDocsRepository;

    @Transactional
    public void registNotionDocs(int projectSeq, String url, Integer num){
        if (projectNotionDocsRepository.findByProjectSeqAndNum(projectSeq, num) != null) {
            projectNotionDocsRepository.deleteByProjectSeqAndNum(projectSeq, num);
        }
        ProjectNotionDocs projectNotionDocs = ProjectNotionDocs.builder()
                .projectSeq(projectSeq)
                .url(url)
                .num(num)
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
    public ProjectNotionDocs findNotiondocs(int projectSeq, int num){
        ProjectNotionDocs projectNotionDocsList = projectNotionDocsRepository.findByProjectSeqAndNum(projectSeq, num);
        return projectNotionDocsList;
    }
}
