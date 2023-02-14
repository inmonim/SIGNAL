package com.ssafysignal.api.apply.dto.response;

import com.ssafysignal.api.apply.entity.ApplyAnswer;
import com.ssafysignal.api.apply.entity.ApplyCareer;
import com.ssafysignal.api.apply.entity.ApplyExp;
import com.ssafysignal.api.common.entity.CommonCode;
import com.ssafysignal.api.posting.entity.PostingMeeting;
import io.swagger.annotations.ApiModel;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "ApplyFindResponse", description = "공고 상세 정보")
public class FindApplyResponse {
    @Schema(description = "지원자 Seq")
    private Integer userSeq;
    @Schema(description = "공고 Seq")
    private Integer postingSeq;
    @Schema(description = "하고 싶은 말")
    private String content;
    @Schema(description = "포지션")
    private CommonCode position;
    @Schema(description = "공고 질문 답변 목록")
    private List<ApplyAnswer> answerList;
    @Schema(description = "경력 목록")
    private List<ApplyCareer> careerList;
    @Schema(description = "경험 목록")
    private List<ApplyExp> expList;
    @Schema(description = "기술스택 목록")
    private List<CommonCode> skillList;
    @Schema(description = "사전미팅시간")
    private PostingMeeting postingMeeting;
    @Schema(description = "나의 지원서 여부")
    private Boolean isMyApply;
}
