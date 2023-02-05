package com.ssafysignal.api.admin.Entity;

import com.ssafysignal.api.user.entity.User;
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
@Table(name = "black_user")
public class BlackUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "black_user_seq")
    private Integer blackUserSeq;
    @Column(name = "user_seq")
    private Integer userSeq;
    @Column(name = "project_seq")
    private Integer projectSeq;
    @Column(name = "reg_dt")
    private LocalDateTime regDt;
    @OneToOne
    @JoinColumn(name = "user_seq", insertable = false, updatable = false)
    private User user;

    @Builder
    public BlackUser(Integer blackUserSeq, Integer userSeq, Integer projectSeq, User user) {
        this.blackUserSeq = blackUserSeq;
        this.userSeq = userSeq;
        this.projectSeq = projectSeq;
        this.user = user;
    }
}
