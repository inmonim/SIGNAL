package com.ssafysignal.api.posting.entity;

import com.ssafysignal.api.global.db.entity.CommonCode;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "posting_skill")
public class PostingSkill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "posting_skill_seq")
    private Integer postingSkillSeq;

    @ManyToOne
    @JoinColumn(name = "posting_seq")
    private Posting posting;

    @ManyToOne
    @JoinColumn(name = "code")
    private CommonCode skillCode;

    @Builder
    public PostingSkill(final Integer postingSkillSeq, final Posting posting, final CommonCode skillCode){
        this.postingSkillSeq = postingSkillSeq;
        this.posting = posting;
        this.skillCode = skillCode;
    }
}
