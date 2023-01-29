package com.ssafysignal.api.project.entity;

import com.ssafysignal.api.user.entity.User;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicInsert
@DynamicUpdate
@Table(name = "project_user")
public class ProjectUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_user_seq")
    private Integer projectUserSeq;
    @Column(name = "user_seq")
    private Integer userSeq;
    @Column(name = "project_seq")
    private Integer projectSeq;
    @Column(name = "warning_cnt")
    private Integer warningCnt;
    @Column(name = "position_code")
    private String positionCode;
    @Column(name = "is_leader")
    private boolean isLeader;
    @Column(name = "heart_cnt")
    private Integer heartCnt;

    @OneToOne
    @JoinColumn(name = "user_seq", insertable = false, updatable = false)
    private User user;

    @Builder
    public ProjectUser(Integer projectUserSeq, Integer userSeq, Integer projectSeq, Integer warningCnt, String positionCode, boolean isLeader, Integer heartCnt) {
        this.projectUserSeq = projectUserSeq;
        this.userSeq = userSeq;
        this.projectSeq = projectSeq;
        this.warningCnt = warningCnt;
        this.positionCode = positionCode;
        this.isLeader = isLeader;
        this.heartCnt = heartCnt;
    }
}
