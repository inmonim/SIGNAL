package com.ssafysignal.api.profile.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicInsert
@DynamicUpdate
@Table(name = "user_skill")
public class UserSkill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_skill_seq")
    private Integer userSkillSeq;

    @Column(name = "user_seq")
    private Integer userSeq;

    @Column(name = "skill_code")
    private String skillCode;

    @Builder
    public UserSkill(Integer userSkillSeq, Integer userSeq, String skillCode) {
        this.userSkillSeq = userSkillSeq;
        this.userSeq = userSeq;
        this.skillCode = skillCode;
    }
}
