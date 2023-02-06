package com.ssafysignal.api.signalweek.entity;


import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicInsert
@DynamicUpdate
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

    @Builder
    public SignalweekVote(Integer signalweekVoteSeq, Integer signalweekSeq, Integer fromUserSeq, LocalDateTime regDt) {
        this.signalweekVoteSeq = signalweekVoteSeq;
        this.signalweekSeq = signalweekSeq;
        this.fromUserSeq = fromUserSeq;
        this.regDt = regDt;
    }
}
