package com.ssafysignal.api.profile.entity;

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
@Builder
@AllArgsConstructor
@Table(name = "user_heart_log")
public class UserHeartLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_heart_log_seq")
    private Integer userHeartLogSeq;
    @Column(name = "user_seq")
    private Integer userSeq;
    @Column(name = "heart_cnt")
    private Integer heartCnt;
    @Column(name = "reg_dt")
    private LocalDateTime regDt;
    @Column(name = "content")
    private String content;
}
