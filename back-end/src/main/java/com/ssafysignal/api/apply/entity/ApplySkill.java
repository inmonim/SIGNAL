package com.ssafysignal.api.apply.entity;

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
}
