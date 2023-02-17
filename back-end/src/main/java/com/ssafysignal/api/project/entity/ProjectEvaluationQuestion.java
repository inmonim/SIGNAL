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
@Table(name = "project_evaluation_question")
public class ProjectEvaluationQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_evaluation_question_seq")
    private Integer ProjectEvaluationQuestionSeq;
    @Column(name = "content")
    private String content;

    @Builder
    public ProjectEvaluationQuestion(Integer projectEvaluationQuestionSeq, String content) {
        ProjectEvaluationQuestionSeq = projectEvaluationQuestionSeq;
        this.content = content;
    }
}
