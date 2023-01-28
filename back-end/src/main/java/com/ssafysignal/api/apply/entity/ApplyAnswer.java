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
    @Column(name = "posting_seq")
    private Integer postingSeq;
    @Column(name = "posting_question_seq")
    private Integer postingQuestionSeq;
    @Column(name = "content")
    private String content;
    @Column(name = "reg_dt")
    private LocalDateTime regDt;

    @OneToOne
    @JoinColumn(name = "posting_question_seq",  insertable = false, updatable = false)
    private PostingQuestion postingQuestion;

    @Builder
    public ApplyAnswer(Integer applyAnswerSeq, Integer postingSeq, Integer postingQuestionSeq, String content,LocalDateTime regDt, PostingQuestion postingQuestion) {
        this.applyAnswerSeq = applyAnswerSeq;
        this.postingSeq = postingSeq;
        this.postingQuestionSeq = postingQuestionSeq;
        this.content = content;
        this.regDt = regDt;
        this.postingQuestion = postingQuestion;
    }
}
