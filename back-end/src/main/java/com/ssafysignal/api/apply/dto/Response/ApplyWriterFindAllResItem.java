package com.ssafysignal.api.apply.dto.Response;

import com.ssafysignal.api.apply.entity.Apply;
import com.ssafysignal.api.user.entity.User;
import com.ssafysignal.api.posting.entity.PostingMeeting;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ApplyWriterFindAllResItem {

    // [List] applyList( applySeq, userSeq, nickname, statusCode )

    private Integer applySeq;

    private Integer userSeq;

    private String nickname;

    private LocalDateTime meetingTime;

    private String applyCode;

    public static ApplyWriterFindAllResItem fromEntity(final Apply apply,
                                                       final User user,
                                                       final PostingMeeting postingMeeting) {
        return ApplyWriterFindAllResItem.builder()
                .applySeq(apply.getApplySeq())
                .userSeq(apply.getUserSeq())
                .nickname(user.getNickname())
                .applyCode(apply.getApplyCode())
                .meetingTime(postingMeeting.getMeetingDt())
                .build();
    }

}
