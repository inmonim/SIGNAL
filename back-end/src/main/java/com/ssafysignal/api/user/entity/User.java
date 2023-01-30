package com.ssafysignal.api.user.entity;

import com.ssafysignal.api.common.entity.CommonCode;
import com.ssafysignal.api.common.entity.ImageFile;
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
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "user_image_file_seq")
    private ImageFile imageFile;


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
    
    public void deleteAuth() {
    	this.userCode = "US102";
    }
    
    public void modifyUser(String name, String nickname,String phone, int birthYear, int birthMonth, int birthDay) {
    	this.name = name;
        this.nickname = nickname;
        this.phone = phone;
        this.birthYear = birthYear;
        this.birthMonth = birthMonth;
        this.birthDay = birthDay;
    }

    public void modifyPassword(String password){
        this.password = password;
    }


    // 하트 충전

    public void chargeHeart(int heartCnt) { this.heartCnt = heartCnt; }
}
