package com.ssafysignal.api.posting.entity;

import com.ssafysignal.api.apply.entity.ApplyAnswer;
import com.ssafysignal.api.common.entity.CommonCode;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicInsert
@DynamicUpdate
@Builder
@AllArgsConstructor
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
    @OneToOne
    @JoinColumn(name = "position_code", insertable = false, updatable = false)
    private CommonCode code;
}
