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
public class FindAllNoticeResponse {

    @Schema(description = "공지사항 목록", required = true)
    private List<FindAllNoticeResponseItem> noticeList;

    private FindAllNoticeResponse(final List<FindAllNoticeResponseItem> noticeList) {
        this.noticeList = noticeList;
    }

    public static FindAllNoticeResponse fromEntity(final Page<Notice> findNoticeList) {
        List<FindAllNoticeResponseItem> noticeList = findNoticeList.stream()
                .map(FindAllNoticeResponseItem::fromEntity)
                .collect(Collectors.toList());
        return new FindAllNoticeResponse(noticeList);
    }
}
