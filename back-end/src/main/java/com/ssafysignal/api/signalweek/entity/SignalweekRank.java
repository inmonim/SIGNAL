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

    @Column(name = "signalweek_schedule_seq")
    private Integer signalweekScheduleSeq;

    @Column(name = "ranking")
    private Integer ranking;


    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "signalweek_seq")
    private Signalweek signalweek;

    @Builder
    public SignalweekRank(Integer signalweekRankSeq, Integer signalweekScheduleSeq, Integer ranking, Signalweek signalweek){
        this.signalweekRankSeq = signalweekRankSeq;
        this.signalweekScheduleSeq = signalweekScheduleSeq;
        this.ranking = ranking;
        this.signalweek = signalweek;
    }
}
