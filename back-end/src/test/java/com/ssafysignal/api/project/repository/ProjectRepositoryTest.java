package com.ssafysignal.api.project.repository;

import com.ssafysignal.api.posting.entity.Posting;
import com.ssafysignal.api.posting.repository.PostingRepository;
import com.ssafysignal.api.project.entity.Project;
import com.ssafysignal.api.project.entity.ProjectSpecification;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ProjectRepositoryTest {
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private PostingRepository postingRepository;

    @Test
    void findAll() {
        List<Project> projectList = projectRepository.findAll();
        assertEquals(projectList.get(0).getSubject(), "프로젝트 테스트");
    }

    @Test
    @Transactional
    void findSearch() {

        Map<String, Object> searchWord = new HashMap<>();
        Integer page = 1;
        Integer size = 1;
        String subject = "프로젝트 테스트";
        String localCode = "11";
        String fieldCode = "FI100";
        List<String> postingSkillList = new ArrayList<>();
        postingSkillList.add("WE100");
        postingSkillList.add("WE200");

//        searchWord.put("subject", subject);
//        searchWord.put("localCode", localCode);
//        searchWord.put("fieldCode", fieldCode);
        searchWord.put("postingSkillList", postingSkillList);
        Page<Project> projectList = projectRepository.findAll(ProjectSpecification.bySearchWord(searchWord), PageRequest.of(page - 1, size, Sort.Direction.ASC, "projectSeq"));


        for (Project p : projectList) {
            System.out.println(p);
        }

        assertTrue(projectList.getSize() == 1);
    }

    @Test
    @Transactional
    void find() {
        Project project = projectRepository.findByPostingSeq(1).get();
        assertEquals(project.getSubject(), "프로젝트 테스트");
    }

    @Test
    void regist() {
        Posting posting = Posting.builder()
                .userSeq(1)
                .content("프로젝트 생성 테스트")
                .postingEndDt(LocalDateTime.now())
                .level(5)
                .build();
        postingRepository.save(posting);

        Project project = Project.builder()
                .subject("JPA 프로젝트 생성 테스트")
                .localCode("11")
                .fieldCode("FI100")
                .isContact(true)
                .term(10)
                .build();
        projectRepository.save(project);

        posting = postingRepository.findById(posting.getPostingSeq()).get();
        project = projectRepository.findById(project.getProjectSeq()).get();

        assertEquals(posting.getContent(), "프로젝트 생성 테스트");
        assertEquals(project.getSubject(), "JPA 프로젝트 생성 테스트");

        projectRepository.deleteById(project.getProjectSeq());
        postingRepository.deleteById(posting.getPostingSeq());
    }
}