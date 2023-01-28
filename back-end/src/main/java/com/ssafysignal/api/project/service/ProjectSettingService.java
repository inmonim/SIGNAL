package com.ssafysignal.api.project.service;

import com.ssafysignal.api.project.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProjectSettingService {

    private final ProjectRepository projectRepository;



}
