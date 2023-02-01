package com.ssafysignal.api.board.dto.response;

import com.ssafysignal.api.board.entity.Notice;
import io.swagger.annotations.ApiModel;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

@Data
@ApiModel(value = "NoticeFindAllResponse")
public class NoticeFindAllResponse {

    @Schema(description = "공지사항 목록", required = true)
    private List<NoticeFindAllResponseItem> noticeList;

    private NoticeFindAllResponse(final List<NoticeFindAllResponseItem> noticeList) {
        this.noticeList = noticeList;
    }

    public static NoticeFindAllResponse fromEntity(final Page<Notice> findNoticeList) {
        List<NoticeFindAllResponseItem> noticeList = findNoticeList.stream()
                .map(NoticeFindAllResponseItem::fromEntity)
                .collect(Collectors.toList());
        return new NoticeFindAllResponse(noticeList);
    }
}
