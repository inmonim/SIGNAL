package com.ssafysignal.api.apply.entity;

import com.ssafysignal.api.apply.entity.Apply;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "apply_career")
public class ApplyCareer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "apply_career_seq")
    private Integer applyCareerSeq;

    @Column(name = "apply_seq")
    private Integer applySeq;

    @Column(name = "content")
    private String content;

    @Builder
    public ApplyCareer(final Integer applyCareerSeq, final Integer applySeq, final String content) {
        this.applyCareerSeq = applyCareerSeq;
        this.applySeq = applySeq;
        this.content = content;
    }

}
