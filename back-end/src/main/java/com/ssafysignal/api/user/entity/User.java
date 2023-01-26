package com.ssafysignal.api.user.entity;

import com.ssafysignal.api.common.entity.CommonCode;
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
    private String userCode;
    private int heartCnt;

    @Builder
    public User(int userSeq, String name, String email, String password, String nickname, int birthYear, int birthMonth, int birthDay, String phone, LocalDateTime regDt, String userCode, int heartCnt) {
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

    public void giveAuth(){
        this.userCode = "US100";
    }

    public void modifyPassword(String password){
        this.password = password;
    }
}
