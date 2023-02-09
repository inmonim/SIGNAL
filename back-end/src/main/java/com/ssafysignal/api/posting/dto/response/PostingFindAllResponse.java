package com.ssafysignal.api.posting.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.ssafysignal.api.apply.entity.Apply;
import com.ssafysignal.api.common.entity.CommonCode;
import com.ssafysignal.api.posting.entity.PostingPosition;
import com.ssafysignal.api.posting.entity.PostingSkill;
import com.ssafysignal.api.project.entity.Project;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
public class PostingFindAllResponse {
    private Integer postingSeq;
    private String subject;
    private String localCode;
    private String fieldCode;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer totalCnt;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer selectCnt;
    private List<PostingSkill> postingSkillList;

    public static PostingFindAllResponse fromEntity(final Project project) {
        Integer totalCnt = 0;
        Integer selectCnt = 0;
        for (PostingPosition postingPosition : project.getPosting().getPostingPositionList()){
            totalCnt += postingPosition.getPositionCnt();
        }
        for (Apply apply : project.getPosting().getApplyList()){
            if ("AS101".equals(apply.getApplyCode())) selectCnt++;
        }

        return PostingFindAllResponse.builder()
                .postingSeq(project.getPosting().getPostingSeq())
                .subject(project.getSubject())
                .localCode(project.getLocalCode())
                .fieldCode(project.getFieldCode())
                .postingSkillList(project.getPosting().getPostingSkillList())
                .totalCnt(totalCnt)
                .selectCnt(selectCnt)
                .build();
    }
}
