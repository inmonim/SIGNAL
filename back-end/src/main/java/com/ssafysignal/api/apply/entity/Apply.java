package com.ssafysignal.api.apply.entity;

import com.ssafysignal.api.posting.entity.Posting;
import com.ssafysignal.api.user.entity.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "apply")
public class Apply {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "apply_seq")
    private Integer applySeq;

    @Column(name = "content")
    private String content;

    @Column(name = "memo")
    private String memo;

    @Column(name = "is_select")
    private boolean isSelect;

    @Column(name = "reg_dt")
    private LocalDateTime regDt;

    @Column(name = "position_code")
    private String positionCode;

    @Column(name = "apply_code")
    private String applyCode;

    @Column(name = "user_seq")
    private Integer user;

//    @Column(name = "posting_seq")
//    private Integer postingSeq;

    // Posting과 양방향으로 연결하고 주인은 Posting이 가져야할듯?
    @ManyToOne(targetEntity = Posting.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "posting_seq")
    private Posting posting;

//    @OneToMany
//    private List<ApplyAnswer> applyAnswerList;

    @OneToMany(targetEntity = ApplyCareer.class, orphanRemoval = true)
    @JoinColumn(name = "apply_seq")
    private List<ApplyCareer> applyCareerList = new ArrayList<>();
    @OneToMany
    @JoinColumn(name = "apply_seq")
    private List<ApplyExp> applyExpList = new ArrayList<>();
    @OneToMany
    @JoinColumn(name = "apply_seq")
    private List<ApplySkill> applySkillList = new ArrayList<>();

//    public void setApplyCode(String applyCode) { this.applyCode = applyCode; }

    @Builder
    public Apply(final Integer applySeq, final Integer user, final Posting posting, final String content, final String memo, final String positionCode, final boolean isSelect, final LocalDateTime regDt,
                  final String applyCode,
    //      final List<ApplyAnswer> applyAnswerList,
            final List<ApplyCareer> applyCareerList, final List<ApplyExp> applyExpList, final List<ApplySkill> applySkillList
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
        this.applyCareerList = applyCareerList;
        this.applyExpList = applyExpList;
        this.applySkillList = applySkillList;
    }
}
