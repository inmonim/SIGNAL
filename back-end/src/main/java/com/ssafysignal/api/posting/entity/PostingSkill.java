package com.ssafysignal.api.posting.entity;

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
@Table(name = "posting_skill")
public class PostingSkill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "posting_skill_seq")
    private Integer postingSkillSeq;

    @Column(name = "posting_seq")
    private Integer postingSeq;

    @Column(name = "skill_code")
    private String skillCode;

    @Builder
    public PostingSkill(final Integer postingSkillSeq, final Integer postingSeq, final String skillCode){
        this.postingSkillSeq = postingSkillSeq;
        this.postingSeq = postingSeq;
        this.skillCode = skillCode;
    }
}
