package com.ssafysignal.api.apply.dto.Request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafysignal.api.posting.entity.Posting;
import io.swagger.annotations.ApiModel;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@ApiModel(value = "ApplyBasicRequest", description = "지원서 등록, 수정을 위한 정보")
public class ApplyBasicRequest {
    @Schema(description = "지원서 작성자 Seq", example = "1", required = true)
    private Integer userSeq;

    @Schema(description = "지원서 내용", example = "저는 프로젝트 팀 구하는 게 힘들었던 경험이 있어 이 프로젝트에 지원합니다.", required = true)
    private String content;

//    @Schema(description = "팀장의 지원자에 대한 메모", example = "이 지원자는 열정이 있음")
//    private String memo;

    @Schema(description = "팀장의 팀원 선택 여부", example = "false", required = true, defaultValue = "false")
    private boolean isSelect;

    @Schema(description = "지원서 등록 일시", example = "2023-01-01 11:00:00.000", required = true)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSS", shape = JsonFormat.Shape.STRING)
    private LocalDateTime regDt;

    @Schema(description = "position 코드", example = "PO100", required = true)
    private String positionCode;

    @Schema(description = "현재 지원 상태에 대한 코드", example = "AS101", required = true)
    private String applyCode;

    @Schema(description = "지원을 등록한 공고의 seq", example = "1", required = true)
    private Integer postingSeq;

    @Schema(description = "지원자의 경력 리스트")
    private List<String> applyCareerList;

    @Schema(description = "지원자의 이전 프로젝트 리스트")
    private List<String> applyExpList;

    @Schema(description = "지원자의 기술 스택 리스트")
    private List<String> applySkillList;
}
