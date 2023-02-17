package com.ssafysignal.api.signalweek.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicInsert
@DynamicUpdate
@Builder
@AllArgsConstructor
@Table(name = "signalweek_vote_history")
public class SignalweekVoteHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "signalweek_vote_history_seq")
    private Integer signalweekVoteHistorySeq;
    @Column(name = "signalweek_seq")
    private Integer signalweekSeq;
    @Column(name = "user_seq")
    private Integer userSeq;
}
