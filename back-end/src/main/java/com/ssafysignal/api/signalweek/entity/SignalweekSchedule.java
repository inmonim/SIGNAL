package com.ssafysignal.api.signalweek.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicInsert
@DynamicUpdate
@Table(name = "signalweek_schedule")
public class SignalweekSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "signalweek_schedule_seq")
    private Integer signalweekScheduleSeq;

    @Column(name = "open_start_dt")
    private LocalDate openStartDt;

    @Column(name = "open_end_dt")
    private LocalDate openEndDt;

    @Column(name = "vote_start_dt")
    private LocalDate voteStartDt;

    @Column(name = "vote_end_dt")
    private LocalDate voteEndDt;

    @Column(name = "quarter")
    private Integer quarter;

    @Column(name = "year")
    private Integer year;

    @Column(name = "reg_dt")
    private LocalDate regDt;

    // 1:N

    @OneToMany
    @JoinColumn(name = "signalweek_schedule_seq")
    private List<Signalweek> signalweekList;

    @Builder
    public SignalweekSchedule(Integer signalweekScheduleSeq, LocalDate openStartDt, LocalDate openEndDt,
                              LocalDate voteStartDt, LocalDate voteEndDt, Integer quarter, Integer year, LocalDate regDt) {
        this.signalweekScheduleSeq = signalweekScheduleSeq;
        this.openStartDt = openStartDt;
        this.openEndDt = openEndDt;
        this.voteStartDt = voteStartDt;
        this.voteEndDt = voteEndDt;
        this.quarter = quarter;
        this.year = year;
        this.regDt = regDt;
    }
}
