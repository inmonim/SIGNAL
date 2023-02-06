package com.ssafysignal.api.signalweek.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicInsert
@DynamicUpdate
@Table(name = "signalweek_rank")
public class SignalweekRank {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "signalweek_rank_seq")
    private Integer signalweekRankSeq;

    @Column(name = "signalweek_seq")
    private Integer signalweekSeq;

    @Column(name = "signalweek_schedule_seq")
    private Integer signalweekScheduleSeq;

    @Column(name = "rank")
    private Integer rank;

//    @Builder
//    public SignalweekRank(signal)
}
