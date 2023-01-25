package com.ssafysignal.api.user.entity;

import com.ssafysignal.api.global.common.db.entity.CommonCode;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@ToString
@DynamicInsert
@DynamicUpdate
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userSeq;
    private String name;
    private String email;
    private String password;
    private String nickname;
    int birthYear;
    int birthMonth;
    int birthDay;
    private String phone;
    private LocalDateTime regDt;
    @OneToOne
    @JoinColumn(name = "code")
    private CommonCode userCode;
    private int heartCnt;

    @Builder

    public User(int userSeq, String name, String email, String password, String nickname, int birthYear, int birthMonth, int birthDay, String phone, LocalDateTime regDt, CommonCode userCode, int heartCnt) {
        this.userSeq = userSeq;
        this.name = name;
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.birthYear = birthYear;
        this.birthMonth = birthMonth;
        this.birthDay = birthDay;
        this.phone = phone;
        this.regDt = regDt;
        this.userCode = userCode;
        this.heartCnt = heartCnt;
    }
}
