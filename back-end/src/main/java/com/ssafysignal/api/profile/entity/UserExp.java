package com.ssafysignal.api.profile.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicInsert
@DynamicUpdate
@Table(name = "user_exp")
public class UserExp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_exp_seq")
    private Integer userExpSeq;

    @Column(name = "user_seq")
    private Integer userSeq;

    @Column(name = "content")
    private String content;

    @Builder
    public UserExp(Integer userExpSeq, Integer userSeq, String content) {
        this.userExpSeq = userExpSeq;
        this.userSeq = userSeq;
        this.content = content;
    }
}
