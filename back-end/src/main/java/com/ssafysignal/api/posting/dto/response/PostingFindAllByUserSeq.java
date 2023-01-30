package com.ssafysignal.api.posting.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.ssafysignal.api.apply.entity.Apply;
import com.ssafysignal.api.common.entity.CommonCode;
import com.ssafysignal.api.posting.entity.Posting;
import com.ssafysignal.api.posting.entity.PostingMeeting;
import io.swagger.annotations.ApiModel;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@ApiModel(value = "PostingFindAllByUserSeq", description = "작성한 공고, 지원한 공고 목록 정보")
public class PostingFindAllByUserSeq {
    @Schema(description = "공고 Seq")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer postingSeq;
    @Schema(description = "지원서 Seq")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer applySeq;
    @Schema(description = "공고 상태 코드")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private CommonCode postingCode;
    @Schema(description = "사전 미팅 정보")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private PostingMeeting postingMeeting;
    @Schema(description = "프로젝트 주제")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String subject;

    public static PostingFindAllByUserSeq toApplyer(final Apply apply) {
        return PostingFindAllByUserSeq.builder()
                .subject(apply.getPosting().getProject().getSubject())
                .postingSeq(apply.getPosting().getPostingSeq())
                .applySeq(apply.getApplySeq())
                .postingCode(apply.getPosting().getCode())
                .postingMeeting(apply.getPostingMeeting())
                .build();
    }

    public static PostingFindAllByUserSeq toWriter(final Posting posting) {
        return PostingFindAllByUserSeq.builder()
                .subject(posting.getProject().getSubject())
                .postingSeq(posting.getPostingSeq())
                .postingCode(posting.getCode())
                .build();
    }
}
