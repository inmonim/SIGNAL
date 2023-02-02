package com.ssafysignal.api.apply.dto.Response;

import com.ssafysignal.api.apply.entity.ApplyAnswer;
import com.ssafysignal.api.apply.entity.ApplyCareer;
import com.ssafysignal.api.apply.entity.ApplyExp;
import com.ssafysignal.api.common.entity.CommonCode;
import com.ssafysignal.api.posting.entity.PostingMeeting;
import io.swagger.annotations.ApiModel;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Data
@Builder
@ApiModel(value = "ApplyFindResponse", description = "공고 상세 정보")
public class ApplyFindResponse {
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
}
