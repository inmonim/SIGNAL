package com.ssafysignal.api.apply.entity;

import com.ssafysignal.api.posting.entity.Posting;
import com.ssafysignal.api.user.entity.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "apply")
public class Apply {
    @Id
    private Integer applySeq;
    private String content;
    private String memo;
    private boolean isSelect;
    private Date regDt;
    private String positionCode;
    private String applyCode;
    @OneToOne
    private User user;
    @OneToOne
    private Posting posting;
//    @OneToMany
//    private List<ApplyAnswer> applyAnswerList;
    @OneToMany
    private List<ApplyCareer> applyCareerList;
    @OneToMany
    private List<ApplyExp> applyExpList;
    @OneToMany
    private List<ApplySkill> applySkillList;

    @Builder
    public Apply(final Integer applySeq, final User user, final Posting posting, final String content, final String memo, final String positionCode, final boolean isSelect, final Date regDt,
                  final String applyCode
//            , final List<ApplyAnswer> applyAnswerList
            , List<ApplyCareer> applyCareerList, List<ApplyExp> applyExpList, List<ApplySkill> applySkillList
    ) {
        this.applySeq = applySeq;
        this.user = user;
        this.posting = posting;
        this.content = content;
        this.positionCode = positionCode;
        this.memo = memo;
        this.isSelect = isSelect;
        this.applyCode = applyCode;
        this.regDt = regDt;
    }
}
