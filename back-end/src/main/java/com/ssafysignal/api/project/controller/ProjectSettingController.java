package com.ssafysignal.api.project.controller;

import com.ssafysignal.api.project.service.ProjectSettingService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@Tag(name = "프로젝트", description = "프로젝트 API")
@RestController
@RequestMapping("/project/setting")
public class ProjectSettingController {

    private final ProjectSettingService projectSettingService;


}
