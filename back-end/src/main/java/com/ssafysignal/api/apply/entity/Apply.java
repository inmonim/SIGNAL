package com.ssafysignal.api.apply.entity;

import com.ssafysignal.api.posting.entity.Posting;
import com.ssafysignal.api.posting.entity.PostingMeeting;
import com.ssafysignal.api.user.entity.User;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicInsert
@DynamicUpdate
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
    private Integer userSeq;
    @Column(name = "posting_seq")
    private Integer postingSeq;

    @OneToOne(targetEntity = PostingMeeting.class, orphanRemoval = true, cascade = CascadeType.ALL)
    @JoinColumn(name = "applySeq")
    private PostingMeeting postingMeeting;

    @OneToMany(targetEntity = ApplyCareer.class, orphanRemoval = true, cascade = CascadeType.ALL)
    @JoinColumn(name = "apply_seq")
    private List<ApplyCareer> applyCareerList = new ArrayList<>();
    @OneToMany(targetEntity = ApplyExp.class, orphanRemoval = true, cascade = CascadeType.ALL)
    @JoinColumn(name = "apply_seq")
    private List<ApplyExp> applyExpList = new ArrayList<>();
    @OneToMany(targetEntity = ApplySkill.class, orphanRemoval = true, cascade = CascadeType.ALL)
    @JoinColumn(name = "apply_seq")
    private List<ApplySkill> applySkillList = new ArrayList<>();

    @Builder
    public Apply(Integer applySeq, Integer userSeq, Integer postingSeq, String content, String memo, String positionCode, boolean isSelect, LocalDateTime regDt,
                  PostingMeeting postingMeeting, String applyCode, List<ApplyCareer> applyCareerList, List<ApplyExp> applyExpList, List<ApplySkill> applySkillList
    ) {
        this.applySeq = applySeq;
        this.userSeq = userSeq;
        this.postingSeq = postingSeq;
        this.content = content;
        this.positionCode = positionCode;
        this.memo = memo;
        this.isSelect = isSelect;
        this.applyCode = applyCode;
        this.postingMeeting = postingMeeting;
        this.applyCareerList = applyCareerList;
        this.applyExpList = applyExpList;
        this.applySkillList = applySkillList;
    }
}
