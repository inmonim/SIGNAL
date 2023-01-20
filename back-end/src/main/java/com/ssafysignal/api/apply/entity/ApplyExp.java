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
    private Integer applyExpSeq;
    private String content;

//    @ManyToOne
//    private Apply apply;

    @Builder
    public ApplyExp(final Integer applyExpSeq, final Apply apply, final String content) {
        this.applyExpSeq = applyExpSeq;
//        this.apply = apply;
        this.content = content;
    }
}
