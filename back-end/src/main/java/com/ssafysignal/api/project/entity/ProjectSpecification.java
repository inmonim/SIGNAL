package com.ssafysignal.api.project.entity;

import com.ssafysignal.api.posting.entity.Posting;
import com.ssafysignal.api.posting.entity.PostingSkill;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class ProjectSpecification {
    public static Specification<Project> searchWord(Map<String, Object> searchKey){
        return ((root, query, criteriaBuilder) -> {
            Predicate projectList = criteriaBuilder.conjunction();

            if (searchKey.get("subject") != null) projectList = criteriaBuilder.and(projectList, criteriaBuilder.like(root.get("subject"), "%" + searchKey.get("subject") + "%"));
            if (searchKey.get("localCode") != null) projectList = criteriaBuilder.and(projectList, criteriaBuilder.like(root.get("localCode"), "%" + searchKey.get("localCode") + "%"));
            if (searchKey.get("fieldCode") != null) projectList = criteriaBuilder.and(projectList, criteriaBuilder.like(root.get("fieldCode"), "%" + searchKey.get("fieldCode") + "%"));
            if (searchKey.get("postingSkillList") != null) {
                List<String> skills = (ArrayList<String>) searchKey.get("postingSkillList");

                Join<Project, Posting> postingJoin = root.join("posting");
                Join<Posting, PostingSkill> postingSkillJoin = postingJoin.join("postingSkillList");
                projectList = criteriaBuilder.and(projectList, postingSkillJoin.get("skillCode").in(skills));
            }
            return projectList;
        });
    }
}
