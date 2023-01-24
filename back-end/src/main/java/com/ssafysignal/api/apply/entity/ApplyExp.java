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
@Table(name = "apply_exp")
public class ApplyExp {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "apply_exp_seq")
    private Integer applyExpSeq;

    @Column(name = "apply_seq")
    private Integer applySeq;

    @Column(name = "content")
    private String content;

    @Builder
    public ApplyExp(final Integer applyExpSeq, final Integer applySeq, final String content) {
        this.applyExpSeq = applyExpSeq;
        this.applySeq = applySeq;
        this.content = content;
    }
}
