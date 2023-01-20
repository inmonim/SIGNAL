package com.ssafysignal.api.posting.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "posting_question")
public class PostingQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "posting_question_seq")
    private Integer postingQuestionSeq;

    @ManyToOne
    @JoinColumn(name = "posting_seq")
    private Posting posting;

    @Column(name = "order")
    private Integer order;

    @Column(name = "content")
    private String content;

    @Builder
    public PostingQuestion(final Integer postingQuestionSeq, final Posting posting, final Integer order, final String content){
        this.postingQuestionSeq = postingQuestionSeq;
        this.posting = posting;
        this.order = order;
        this.content = content;
    }
}
