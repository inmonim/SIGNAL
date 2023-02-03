package com.ssafysignal.api.project.entity;

import com.ssafysignal.api.common.entity.CommonCode;
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
@Table(name = "project_position")
public class ProjectPosition {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_position_seq")
    private Integer ProjectEvaluationSeq;
    @Column(name = "project_seq")
    private Integer projectSeq;
    @Column(name = "position_code")
    private String positionCode;
    @Column(name = "position_cnt")
    private Integer positionCnt;
    @OneToOne
    @JoinColumn(name = "position_code", insertable = false, updatable = false)
    private CommonCode code;

    @Builder
    public ProjectPosition(Integer projectEvaluationSeq, Integer projectSeq, String positionCode, Integer positionCnt, CommonCode code) {
        ProjectEvaluationSeq = projectEvaluationSeq;
        this.projectSeq = projectSeq;
        this.positionCode = positionCode;
        this.positionCnt = positionCnt;
        this.code = code;
    }
}
