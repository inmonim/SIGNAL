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
@Table(name = "user_career")
public class UserCareer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_career_seq")
    private Integer userCareerSeq;

    @Column(name = "user_seq")
    private Integer userSeq;

    @Column(name = "content")
    private String content;

    @Builder
    public UserCareer(Integer userCareerSeq, Integer userSeq, String content) {
        this.userCareerSeq = userCareerSeq;
        this.userSeq = userSeq;
        this.content = content;
    }
}
