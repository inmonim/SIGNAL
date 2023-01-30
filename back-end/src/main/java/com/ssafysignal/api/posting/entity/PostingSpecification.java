package com.ssafysignal.api.posting.entity;

import com.ssafysignal.api.apply.entity.Apply;
import com.ssafysignal.api.project.entity.Project;
import com.ssafysignal.api.project.entity.ProjectUser;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class PostingSpecification {
    public static Specification<Posting> byUserSeq(Integer userSeq){
        return ((root, query, criteriaBuilder) -> {
            Predicate postingList = criteriaBuilder.conjunction();

            Join<Posting, Apply> projectApplyJoin = root.join("applyList");
            postingList = criteriaBuilder.and(postingList, criteriaBuilder.equal(projectApplyJoin.get("userSeq"), userSeq));

            return postingList;
        });
    }
}
