package com.ssafysignal.api.project.entity;

import com.querydsl.core.types.Expression;
import com.ssafysignal.api.posting.entity.Posting;
import com.ssafysignal.api.posting.entity.PostingSkill;

import org.hibernate.query.criteria.internal.CriteriaBuilderImpl;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaBuilder.In;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class ProjectSpecification {
    public static Specification<Project> bySearchWord(Map<String, Object> searchKey){
        return ((root, query, criteriaBuilder) -> {
            query.distinct(true);

            Predicate projectList = criteriaBuilder.conjunction();
            Join<Project, Posting> postingJoin = root.join("posting");
            projectList = criteriaBuilder.and(projectList, criteriaBuilder.equal(postingJoin.get("postingCode"), "PPS102"));
            if (searchKey.containsKey("subject")) projectList = criteriaBuilder.and(projectList, criteriaBuilder.like(root.get("subject"), "%" + searchKey.get("subject") + "%"));
            if (searchKey.containsKey("localCode")) projectList = criteriaBuilder.and(projectList, criteriaBuilder.equal(root.get("localCode"),(String)searchKey.get("localCode")));
            if (searchKey.containsKey("fieldCode")) projectList = criteriaBuilder.and(projectList, criteriaBuilder.equal(root.get("fieldCode"), (String)searchKey.get("fieldCode")));

            if (searchKey.containsKey("postingList")) {
                List<Integer> postingList = (ArrayList<Integer>) searchKey.get("postingList");
                projectList = criteriaBuilder.and(projectList, root.get("postingSeq").in(postingList));
            }
            return projectList;
        });
    }


    public static Specification<Project> byUserSeq(Integer userSeq, String projectCode){
        return ((root, query, criteriaBuilder) -> {
            Predicate projectList = criteriaBuilder.conjunction();

            // 프로젝트 코드가 일치하고
            projectList = criteriaBuilder.and(projectList, criteriaBuilder.equal(root.get("projectCode"), projectCode));

            Join<Project, ProjectUser> projectUserJoin = root.join("projectUserList");
            projectList = criteriaBuilder.and(projectList, criteriaBuilder.equal(projectUserJoin.get("userSeq"), userSeq));

            return projectList;
        });
    }

    public static Specification<ProjectEvaluation> byFromUserSeq(Integer projectUserSeq, Integer termCnt){
        return ((root, query, criteriaBuilder) -> {
            Predicate projectUserList = criteriaBuilder.conjunction();
            projectUserList = criteriaBuilder.and(projectUserList, criteriaBuilder.equal(root.get("termCnt"), termCnt));
            projectUserList = criteriaBuilder.and(projectUserList, criteriaBuilder.equal(root.get("fromUserSeq"), projectUserSeq));
            return projectUserList;
        });
    }

    public static Specification<ProjectEvaluation> byFromUserSeqAndToUserSeq(Integer projectUserSeq, Integer toProjectUserSeq, Integer termCnt){
        return ((root, query, criteriaBuilder) -> {
            Predicate projectUserList = criteriaBuilder.conjunction();
            projectUserList = criteriaBuilder.and(projectUserList, criteriaBuilder.equal(root.get("termCnt"), termCnt));
            projectUserList = criteriaBuilder.and(projectUserList, criteriaBuilder.equal(root.get("fromUserSeq"), projectUserSeq));
            projectUserList = criteriaBuilder.and(projectUserList, criteriaBuilder.equal(root.get("toUserSeq"), toProjectUserSeq));

            return projectUserList;
        });
    }
}
