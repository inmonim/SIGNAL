package com.ssafysignal.api.project.entity;

import com.ssafysignal.api.common.entity.CommonCode;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicInsert
@DynamicUpdate
@Table(name = "project_evaluation")
public class ProjectEvaluation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_evaluation_seq")
    private Integer ProjectEvaluationSeq;
    @Column(name = "project_seq")
    private Integer projectSeq;
    @Column(name = "from_user_seq")
    private Integer fromUserSeq;
    @Column(name = "to_user_seq")
    private Integer toUserSeq;
    @Column(name = "num")
    private Integer num;
    @Column(name = "score")
    private Integer score;
    @Column(name = "term_cnt")
    private Integer termCnt;
    @Column(name = "reg_dt")
    private LocalDateTime regDt;
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "project_evaluation_seq", insertable = false, updatable = false)
    private ProjectEvaluationQuestion projectEvaluationQuestion;

    @Builder
    public ProjectEvaluation(Integer projectEvaluationSeq, Integer projectSeq, Integer fromUserSeq, Integer toUserSeq, Integer num, Integer score, Integer termCnt, LocalDateTime regDt, ProjectEvaluationQuestion projectEvaluationQuestion) {
        ProjectEvaluationSeq = projectEvaluationSeq;
        this.projectSeq = projectSeq;
        this.fromUserSeq = fromUserSeq;
        this.toUserSeq = toUserSeq;
        this.num = num;
        this.score = score;
        this.termCnt = termCnt;
        this.regDt = regDt;
        this.projectEvaluationQuestion = projectEvaluationQuestion;
    }
}
