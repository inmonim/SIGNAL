package com.ssafysignal.api.admin.service;

import com.ssafysignal.api.admin.dto.response.FindAdminProjectResponse;
import com.ssafysignal.api.admin.dto.response.FindAllAdminProjectResponse;
import com.ssafysignal.api.project.entity.Project;
import com.ssafysignal.api.project.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminProjectService {
    private final ProjectRepository projectRepository;

    @Transactional(readOnly = true)
    public FindAllAdminProjectResponse findAllProject(Integer page, Integer size) {
        Page<Project> projectPage = projectRepository.findAll(PageRequest.of(page - 1, size, Sort.Direction.ASC, "projectSeq"));

        return FindAllAdminProjectResponse.builder()
                .projectList(projectPage.stream().map(FindAdminProjectResponse::fromEntity).collect(Collectors.toList()))
                .count(projectPage.getTotalElements())
                .build();
    }
}
