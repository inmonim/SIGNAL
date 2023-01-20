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
    private Integer applyCareerSeq;
    private String content;

//    @ManyToOne
//    private Apply apply;

    @Builder
    public ApplyCareer(final Integer applyCareerSeq, final String content
//            ,final Apply apply
    ) {
        this.applyCareerSeq = applyCareerSeq;
        this.content = content;
//        this.apply = apply
    }

}
