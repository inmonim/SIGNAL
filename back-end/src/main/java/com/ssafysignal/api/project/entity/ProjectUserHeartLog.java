package com.ssafysignal.api.project.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicInsert
@DynamicUpdate
@Table(name = "project_user_heart_log")
public class ProjectUserHeartLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_user_heart_log_seq")
    private Integer projectUserHeartLogSeq;
    @Column(name = "project_user_seq")
    private Integer projectUserSeq;
    @Column(name = "heart_cnt")
    private Integer heartCnt;
    @Column(name = "content")
    private String content;
    @Column(name = "reg_dt")
    private LocalDateTime regDt;

    @Builder
    public ProjectUserHeartLog(Integer projectUserHeartLogSeq, Integer projectUserSeq, Integer heartCnt, String content, LocalDateTime regDt) {
        this.projectUserHeartLogSeq = projectUserHeartLogSeq;
        this.projectUserSeq = projectUserSeq;
        this.heartCnt = heartCnt;
        this.content = content;
        this.regDt = regDt;
    }
}
