package com.ssafysignal.api.posting.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicInsert
@DynamicUpdate
@Table(name = "posting_position")
public class PostingPosition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "posting_position_seq")
    private Integer postingPositionSeq;

    @Column(name = "posting_seq")
    private Integer postingSeq;

    @Column(name = "position_code")
    private String positionCode;

    @Column(name = "position_cnt")
    private Integer positionCnt;

    @Builder
    public PostingPosition(final Integer postingPositionSeq, final Integer postingSeq, final String positionCode, final Integer positionCnt){
        this.postingPositionSeq = postingPositionSeq;
        this.postingSeq = postingSeq;
        this.positionCode = positionCode;
        this.positionCnt = positionCnt;
    }
}
