package com.ssafysignal.api.posting.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicInsert
@DynamicUpdate
@Table(name = "posting")
public class Posting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "posting_seq")
    private Integer postingSeq;

    @Column(name = "content")
    private String content;

    @Column(name = "posting_start_dt")
    private LocalDateTime postingStartDt;

    @Column(name = "posting_end_dt")
    private LocalDateTime postingEndDt;

    @Column(name = "level")
    private Integer level;

    @Column(name = "reg_dt")
    private LocalDateTime regDt;

    @Column(name = "posting_code")
    private String postingCode;

    @Column(name = "user_seq")
    private Integer user;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "posting_seq")
    private List<PostingSkill> postingSkillList = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "posting_seq")
    private List<PostingMeeting> postingMeetingList = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "posting_seq")
    private List<PostingPosition> postingPositionList = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "posting_seq")
    private List<PostingQuestion> postingQuestionList = new ArrayList<>();

    public void setPostingCode(String postingCode) {
        this.postingCode = postingCode;
    }

    @Builder
    public Posting(Integer postingSeq, Integer user, String content, LocalDateTime postingStartDt, LocalDateTime postingEndDt,
                    Integer level, String postingCode, LocalDateTime regDt,
                   List<PostingSkill> postingSkillList, List<PostingMeeting> postingMeetingList, List<PostingPosition> postingPositionList, List<PostingQuestion> postingQuestionList) {
        this.postingSeq = postingSeq;
        this.user = user;
        this.content = content;
        this.postingStartDt = postingStartDt;
        this.postingEndDt = postingEndDt;
        this.level = level;
        this.postingCode = postingCode;
        this.regDt = regDt;
        this.postingSkillList = postingSkillList;
        this.postingMeetingList = postingMeetingList;
        this.postingPositionList = postingPositionList;
        this.postingQuestionList = postingQuestionList;
    }

}
