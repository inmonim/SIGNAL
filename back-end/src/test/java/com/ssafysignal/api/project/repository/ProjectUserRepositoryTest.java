package com.ssafysignal.api.project.repository;

import com.ssafysignal.api.project.entity.ProjectUser;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ProjectUserRepositoryTest {

    @Autowired
    private ProjectUserRepository projectUserRepository;

    @Test
    void find() {
        ProjectUser projectUser = projectUserRepository.findByProjectSeqAndUserSeq(749, 3).get();
        System.out.println("projectUser.getProjectUserSeq() = " + projectUser.getProjectUserSeq());
    }

}