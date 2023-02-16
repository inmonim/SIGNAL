package com.ssafysignal.api.posting.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.ssafysignal.api.common.entity.CommonCode;
import com.ssafysignal.api.user.entity.User;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicInsert
@DynamicUpdate
@Builder
@AllArgsConstructor
@Table(name = "posting_meeting")
public class PostingMeeting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "posting_meeting_seq")
    private Integer postingMeetingSeq;
    @Column(name = "posting_seq")
    private Integer postingSeq;
    @Column(name = "apply_seq")
    private Integer applySeq;
    @Column(name = "from_user_seq")
    private Integer fromUserSeq;
    @Column(name = "to_user_seq")
    private Integer toUserSeq;
    @Column(name = "meeting_dt")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSS", shape = JsonFormat.Shape.STRING)
    private LocalDateTime meetingDt;
    @Column(name = "posting_meeting_code")
    private String postingMeetingCode;
    @OneToOne
    @JoinColumn(name = "posting_meeting_code", insertable = false, updatable = false)
    private CommonCode code;
}
