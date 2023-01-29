package com.ssafysignal.api.project.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ApiModel(value = "ProjectRegistRequest", description = "프로젝트 생성 정보")
public class ProjectRegistRequest {
    @Schema(description = "공고 Seq")
    private Integer postingSeq;
    @Schema(description = "팀장 Seq")
    private Integer userSeq;
    @Schema(description = "팀장 포지션")
    private String positionCode;
    @Schema(description = "선정된 지원서 목록")
    private List<Integer> applyList;
}
