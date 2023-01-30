package com.ssafysignal.api.board.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafysignal.api.board.entity.Notice;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class NoticeFindResponse{

        @Schema(description = "공지사항 Seq", example = "1", required = true)
        private Integer noticeSeq;

        @Schema(description = "유저 Seq", example = "1", required = true)
        private Integer userSeq;

        @Schema(description = "공지사항 제목", example = "시그널 위크 사용방법", required = true)
        private String title;

        @Schema(description = "공지사항 본문", example = "시그널 위크 사용방법은 다음과 같습니다", required = true)
        private String content;

        @Schema(description = "공지사항 조회수", example = "1")
        private Integer view;

        @Schema(description = "공지사항 등록 일자", example = "2023-01-30 10:30:11.222")
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSS", shape = JsonFormat.Shape.STRING)
        private LocalDateTime regDt;

        public static NoticeFindResponse fromEntity(final Notice notice) {
            return NoticeFindResponse.builder()
                    .noticeSeq(notice.getNoticeSeq())
                    .userSeq(notice.getUserSeq())
                    .title(notice.getTitle())
                    .content(notice.getContent())
                    .view(notice.getView())
                    .regDt(notice.getRegDt())
                    .build();
        }
}
