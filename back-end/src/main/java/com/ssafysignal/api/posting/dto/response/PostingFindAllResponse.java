package com.ssafysignal.api.posting.dto.response;

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
    private Integer totalCnt;
    private Integer selectCnt;
    private List<PostingSkill> postingSkillList;

    public static PostingFindAllResponse fromEntity(final Project project) {
        return PostingFindAllResponse.builder()
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
