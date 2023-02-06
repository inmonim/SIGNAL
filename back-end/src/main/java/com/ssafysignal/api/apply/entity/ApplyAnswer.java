package com.ssafysignal.api.apply.entity;

import com.ssafysignal.api.posting.entity.PostingQuestion;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicInsert
@DynamicUpdate
@Table(name = "apply_answer")
public class ApplyAnswer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "apply_answer_seq")
    private Integer applyAnswerSeq;
    @Column(name = "apply_seq")
    private Integer applySeq;
    @Column(name = "posting_seq")
    private Integer postingSeq;
    @Column(name = "posting_question_seq")
    private Integer postingQuestionSeq;
    @Column(name = "content")
    private String content;
    @Column(name = "reg_dt")
    private LocalDateTime regDt;

    @Builder
    public ApplyAnswer(Integer applyAnswerSeq, Integer applySeq, Integer postingSeq, Integer postingQuestionSeq, String content, LocalDateTime regDt) {
        this.applyAnswerSeq = applyAnswerSeq;
        this.applySeq = applySeq;
        this.postingSeq = postingSeq;
        this.postingQuestionSeq = postingQuestionSeq;
        this.content = content;
        this.regDt = regDt;
    }
}
