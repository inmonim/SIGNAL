package com.ssafysignal.api.posting.entity;

import com.ssafysignal.api.global.db.entity.CommonCode;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "posting_position")
public class PostingPosition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "posting_position_seq")
    private Integer postingPositionSeq;

    @ManyToOne
    @JoinColumn(name = "posting_seq")
    private Posting posting;

    @ManyToOne
    @JoinColumn(name = "code")
    private CommonCode positionCode;

    @Column(name = "position_cnt")
    private Integer positionCnt;

    @Builder
    public PostingPosition(final Integer postingPositionSeq, final Posting posting, final CommonCode positionCode, final Integer positionCnt){
        this.postingPositionSeq = postingPositionSeq;
        this.posting = posting;
        this.positionCode = positionCode;
        this.positionCnt = positionCnt;
    }
}
