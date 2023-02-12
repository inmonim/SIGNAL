package com.ssafysignal.api.admin.service;

import com.ssafysignal.api.admin.dto.Response.FindAdminProjectResponse;
import com.ssafysignal.api.admin.dto.Response.FindAllAdminProjectResponse;
import com.ssafysignal.api.project.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminProjectService {

    private final ProjectRepository projectRepository;

    @Transactional(readOnly = true)
    public FindAllAdminProjectResponse findAllProject() {
        return FindAllAdminProjectResponse.builder().projectList(FindAdminProjectResponse.toList(projectRepository.findAll())).build();
    }
}
