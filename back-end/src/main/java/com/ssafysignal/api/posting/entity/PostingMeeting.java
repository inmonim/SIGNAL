package com.ssafysignal.api.posting.entity;

import com.ssafysignal.api.user.entity.User;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicInsert
@DynamicUpdate
@Table(name = "posting_meeting")
public class PostingMeeting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "posting_meeting_seq")
    private Integer postingMeetingSeq;

    @Column(name = "posting_seq")
    private Integer postingSeq;

    @Column(name = "from_user_seq")
    private Integer fromUserSeq;

    @Column(name = "to_user_seq")
    private Integer toUserSeq;

    @Column(name = "meeting_dt")
    private LocalDateTime meetingDt;

    @Column(name = "posting_meeting_code")
    private String postingMeetingCode;

    public void setToUser(Integer toUserSeq) {
        this.toUserSeq = toUserSeq;
    }

    @Builder
    public PostingMeeting(final Integer postingMeetingSeq, final Integer postingSeq,
                          final Integer fromUserSeq, final Integer toUserSeq,
                          final LocalDateTime meetingDt, final String postingMeetingCode) {
        this.postingMeetingSeq = postingMeetingSeq;
        this.postingSeq = postingSeq;
        this.fromUserSeq = fromUserSeq;
        this.toUserSeq = toUserSeq;
        this.meetingDt = meetingDt;
        this.postingMeetingCode = postingMeetingCode;
    }
}
