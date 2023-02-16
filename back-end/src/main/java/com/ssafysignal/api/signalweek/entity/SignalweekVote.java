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

    @Column(name = "signalweek_seq")
    private Integer signalweekSeq;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "signalweek_seq", insertable = false, updatable = false)
    private Signalweek signalweek;
}
