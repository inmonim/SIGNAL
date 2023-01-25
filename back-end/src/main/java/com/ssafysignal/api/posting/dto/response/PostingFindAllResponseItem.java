package com.ssafysignal.api.posting.dto.response;

import com.ssafysignal.api.posting.entity.PostingSkill;
import com.ssafysignal.api.project.entity.Project;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class PostingFindAllResponseItem {
    private Integer postingSeq;
    private String subject;
    private String localCode;
    private String fieldCode;
    private Integer totalCnt;
    private Integer selectCnt;
    private List<PostingSkill> postingSkillList;

    public static PostingFindAllResponseItem fromEntity(final Project project) {
        return PostingFindAllResponseItem.builder()
                .postingSeq(project.getPosting().getPostingSeq())
                .subject(project.getSubject())
                .localCode(project.getLocalCode())
                .fieldCode(project.getFieldCode())
                // totalCnt
                // selectCnt
                .postingSkillList(project.getPosting().getPostingSkillList())
                .build();
    }
}
