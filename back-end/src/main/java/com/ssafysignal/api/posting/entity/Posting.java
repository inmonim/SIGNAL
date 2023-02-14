package com.ssafysignal.api.posting.entity;

import com.ssafysignal.api.apply.entity.Apply;
import com.ssafysignal.api.common.entity.CommonCode;
import com.ssafysignal.api.project.entity.Project;
import com.ssafysignal.api.user.entity.User;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicInsert
@DynamicUpdate
@Builder
@AllArgsConstructor
@Table(name = "posting")
public class Posting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "posting_seq")
    private Integer postingSeq;
    @Column(name = "user_seq")
    private Integer userSeq;
    @Column(name = "content")
    private String content;
    @Column(name = "posting_start_dt")
    private LocalDateTime postingStartDt;
    @Column(name = "posting_end_dt")
    private LocalDateTime postingEndDt;
    @Column(name = "level")
    private Integer level;
    @Column(name = "posting_code")
    private String postingCode;
    @Column(name = "reg_dt")
    private LocalDateTime regDt;

    // 1 : 1 관계
    @OneToOne(mappedBy = "posting")
    private Project project;
    @OneToOne
    @JoinColumn(name = "user_seq", insertable = false, updatable = false)
    private User user;
    @OneToOne
    @JoinColumn(name = "posting_code", insertable = false, updatable = false)
    private CommonCode code;

    // 1 : N 관계
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "posting_seq")
    private List<Apply> applyList;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "posting_seq")
    private List<PostingSkill> postingSkillList;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "posting_seq")
    private List<PostingMeeting> postingMeetingList;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "posting_seq")
    private List<PostingPosition> postingPositionList;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "posting_seq")
    private List<PostingQuestion> postingQuestionList;
}
