package com.ssafysignal.api.signalweek.entity;


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
@Table(name = "signalweek_vote")
public class SignalweekVote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "signalweek_vote_seq")
    private Integer signalweekVoteSeq;
    @Column(name = "signalweek_seq")
    private Integer signalweekSeq;
    @Column(name = "from_user_seq")
    private Integer fromUserSeq;
    @Column(name = "reg_dt")
    private LocalDateTime regDt;
    @Column(name = "signalweek_schedule_seq")
    private Integer signalweekScheduleSeq;
}
