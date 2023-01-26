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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "apply_skill_seq")
    private Integer applySkillSeq;

    @Column(name = "apply_seq")
    private Integer applySeq;

    @Column(name = "skill_code")
    private String skillCode;

    @Builder
    public ApplySkill(final Integer applySkillSeq, final Integer applySeq, final String skillCode) {
        this.applySkillSeq = applySkillSeq;
        this.applySeq = applySeq;
        this.skillCode = skillCode;
    }
}
