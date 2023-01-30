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
@Table(name = "posting_question")
public class PostingQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "posting_question_seq")
    private Integer postingQuestionSeq;
    @Column(name = "posting_seq")
    private Integer postingSeq;
    @Column(name = "num")
    private Integer num;
    @Column(name = "content")
    private String content;

    @Builder
    public PostingQuestion(final Integer postingQuestionSeq, final Integer postingSeq, final Integer num, final String content){
        this.postingQuestionSeq = postingQuestionSeq;
        this.postingSeq = postingSeq;
        this.num = num;
        this.content = content;
    }
}
