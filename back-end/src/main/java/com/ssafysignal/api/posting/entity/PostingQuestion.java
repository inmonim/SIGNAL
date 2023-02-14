package com.ssafysignal.api.posting.entity;

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
@Builder
@AllArgsConstructor
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
}
