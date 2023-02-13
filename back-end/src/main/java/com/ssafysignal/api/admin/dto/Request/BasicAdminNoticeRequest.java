package com.ssafysignal.api.admin.dto.Request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BasicAdminNoticeRequest {
    @Schema(description = "관리자 Seq")
    private Integer userSeq;
    @Schema(description = "공지사항 제목")
    private String title;
    @Schema(description = "공지사항 본문")
    private String content;
}
