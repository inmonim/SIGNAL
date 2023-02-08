package com.ssafysignal.api.apply.entity;

import com.ssafysignal.api.common.entity.CommonCode;
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
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicInsert
@DynamicUpdate
@Table(name = "apply")
public class Apply {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "apply_seq")
    private Integer applySeq;
    @Column(name = "user_seq")
    private Integer userSeq;
    @Column(name = "posting_seq")
    private Integer postingSeq;
    @Column(name = "posting_meeting_seq")
    private Integer postingMeetingSeq;
    @Column(name = "content")
    private String content;
    @Column(name = "position_code")
    private String positionCode;
    @Column(name = "memo")
    private String memo;
    @Column(name = "state_code")
    private String stateCode;
    @Column(name = "apply_code")
    private String applyCode;
    @Column(name = "reg_dt")
    private LocalDateTime regDt;
    
    // 1 : 1 관계
    @OneToOne
    @JoinColumn(name = "apply_code", insertable = false, updatable = false)
    private CommonCode code;
    @OneToOne
    @JoinColumn(name = "state_code", insertable = false, updatable = false)
    private CommonCode state;
    @OneToOne
    @JoinColumn(name = "position_code", insertable = false, updatable = false)
    private CommonCode position;
    @OneToOne
    @JoinColumn(name = "posting_seq", insertable = false, updatable = false)
    private Posting posting;
    @OneToOne
    @JoinColumn(name = "user_seq", insertable = false, updatable = false)
    private User user;
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "posting_meeting_seq", insertable = false, updatable = false)
    private PostingMeeting postingMeeting;

    // 1 : N 관계
    @OneToMany(targetEntity = ApplyCareer.class, orphanRemoval = true, cascade = CascadeType.ALL)
    @JoinColumn(name = "apply_seq")
    private List<ApplyCareer> applyCareerList;
    @OneToMany(targetEntity = ApplyExp.class, orphanRemoval = true, cascade = CascadeType.ALL)
    @JoinColumn(name = "apply_seq")
    private List<ApplyExp> applyExpList;
    @OneToMany(targetEntity = ApplySkill.class, orphanRemoval = true, cascade = CascadeType.ALL)
    @JoinColumn(name = "apply_seq")
    private List<ApplySkill> applySkillList;
    @OneToMany(targetEntity = ApplyAnswer.class, orphanRemoval = true, cascade = CascadeType.ALL)
    @JoinColumn(name = "apply_seq")
    private List<ApplyAnswer> applyAnswerList;

    @Builder
    public Apply(Integer applySeq, Integer userSeq, Integer postingSeq, Integer postingMeetingSeq, String content, String positionCode, String memo, CommonCode state, String applyCode, LocalDateTime regDt, CommonCode code, Posting posting, PostingMeeting postingMeeting, List<ApplyCareer> applyCareerList, List<ApplyExp> applyExpList, List<ApplySkill> applySkillList, List<ApplyAnswer> applyAnswerList) {
        this.applySeq = applySeq;
        this.userSeq = userSeq;
        this.postingSeq = postingSeq;
        this.postingMeetingSeq = postingMeetingSeq;
        this.content = content;
        this.positionCode = positionCode;
        this.memo = memo;
        this.state = state;
        this.applyCode = applyCode;
        this.regDt = regDt;
        this.code = code;
        this.posting = posting;
        this.postingMeeting = postingMeeting;
        this.applyCareerList = applyCareerList;
        this.applyExpList = applyExpList;
        this.applySkillList = applySkillList;
        this.applyAnswerList = applyAnswerList;
    }
}
