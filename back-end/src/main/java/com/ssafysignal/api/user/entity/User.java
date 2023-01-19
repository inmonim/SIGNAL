package com.ssafysignal.api.user.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "user")
public class User {
    @Id
    private int userSeq;
    private String name;
    private String email;
    private String nickname;
    private Date birth;
    private String phone;
    private Date regDt;
    private String userCode;
    //private int userHeartSeq;
    //private int userImageFileSeq;

    @Builder
    public User(final int userSeq, String name, String email, String nickname,
                    Date birth, String phone, Date regDt, int heartCnt, String userCode) {
        this.userSeq = userSeq;
        this.name = name;
        this.email = email;
        this.nickname = nickname;
        this.birth = birth;
        this.phone = phone;
        this.regDt = regDt;
        this.userCode = userCode;
    }
}

