package com.ssafysignal.api.profile.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.ssafysignal.api.common.entity.CommonCode;
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
@Table(name = "user_skill")
public class UserSkill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_skill_seq")
    private Integer userSkillSeq;
    @Column(name = "user_seq")
    private Integer userSeq;
    @Column(name = "skill_code")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String skillCode;

    @OneToOne
    @JoinColumn(name = "skill_code", insertable = false, updatable = false)
    private CommonCode code;

    public static UserSkill fromEntity(UserSkill userSkill){
        return UserSkill.builder()
                    .userSkillSeq(userSkill.getUserSkillSeq())
                    .userSeq(userSkill.getUserSeq())
                    .code(userSkill.getCode())
                    .build();
    }
}
