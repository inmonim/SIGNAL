package com.ssafysignal.api.board.dto.response;

import com.ssafysignal.api.board.entity.Notice;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class NoticeFindAllResponseItem {
    private Integer noticeSeq;

    private Integer userSeq;

    private String title;

    private String content;

    private Integer view;

    private LocalDateTime regDt;

    public static NoticeFindAllResponseItem fromEntity(final Notice notice) {
        return NoticeFindAllResponseItem.builder()
                .noticeSeq(notice.getNoticeSeq())
                .userSeq(notice.getUserSeq())
                .title(notice.getTitle())
                .content(notice.getContent())
                .view(notice.getView())
                .regDt(notice.getRegDt())
                .build();
    }
}
