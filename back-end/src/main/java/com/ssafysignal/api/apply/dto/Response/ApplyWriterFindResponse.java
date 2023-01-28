package com.ssafysignal.api.apply.dto.Response;

import com.ssafysignal.api.apply.entity.Apply;
import com.ssafysignal.api.common.entity.CommonCode;
import com.ssafysignal.api.project.entity.Project;
import io.swagger.annotations.ApiModel;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@ApiModel(value = "ApplyWriterFindResponse", description = "공고 작성자 기준 지원서 목록 항목")
public class ApplyWriterFindResponse {
    @Schema(description = "지원서 Seq", example = "1")
    private Integer applySeq;
    @Schema(description = "지원자 Seq", example = "1")
    private Integer userSeq;
    @Schema(description = "지원자 nickname")
    private String nickname;
    @Schema(description = "지원서의 진행 상황")
    private CommonCode statusCode;
}
