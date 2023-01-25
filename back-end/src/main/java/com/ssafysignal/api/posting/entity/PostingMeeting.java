package com.ssafysignal.api.posting.entity;

import com.ssafysignal.api.global.db.entity.CommonCode;
import com.ssafysignal.api.user.entity.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "posting_meeting")
public class PostingMeeting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "posting_meeting_seq")
    private Integer postingMeetingSeq;

    @ManyToOne
    @JoinColumn(name = "posting_seq")
    private Posting posting;

    @ManyToOne
    @JoinColumn(name = "from_user_seq")
    private User fromUser;

    @ManyToOne
    @JoinColumn(name = "to_user_seq")
    private User toUser;

    @Column(name = "meeting_dt")
    private LocalDateTime meetingDt;

    @Builder
    public PostingMeeting(final Integer postingMeetingSeq, final Posting posting, final User fromUser, final User toUser, final LocalDateTime meetingDt){
        this.postingMeetingSeq = postingMeetingSeq;
        this.posting = posting;
        this.fromUser = fromUser;
        this.toUser = toUser;
        this.meetingDt = meetingDt;
    }
}
