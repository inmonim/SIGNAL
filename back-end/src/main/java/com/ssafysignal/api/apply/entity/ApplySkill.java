package com.ssafysignal.api.apply.entity;

//import com.ssafysignal.api.commoncode.CommonCode;
import com.ssafysignal.api.apply.entity.Apply;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "apply_skill")
public class ApplySkill {
    @Id
    private Integer applySkillSeq;
//    @ManyToOne
//    private Apply apply;
//    @ManyToOne
//    private CommonCode commonCode;

    @Builder
    public ApplySkill(final Integer applySkillSeq
//    , final Integer apply, final Integer commonCode
    ) {
        this.applySkillSeq = applySkillSeq;
//        this.apply = apply;
//        this.commonCode = commonCode;
    }
}
