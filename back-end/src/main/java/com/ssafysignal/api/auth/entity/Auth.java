package com.ssafysignal.api.auth.entity;

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
@ToString
@Table(name = "auth")
public class Auth {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "auth_seq")
    private Integer authSeq;
    @Column(name = "user_seq", unique = true)
    private Integer userSeq;
    @Column(name = "auth_code")
    private String authCode;
    @Column(name = "auth_dt")
    private LocalDateTime authDt;
    @Column(name = "reg_dt")
    private LocalDateTime regDt;
    @Column(name = "is_auth")
    private boolean isAuth;
    @Column(name = "code")
    private String code;

    @Builder
    public Auth(Integer authSeq, Integer userSeq, String authCode, LocalDateTime authDt, LocalDateTime regDt, boolean isAuth, String code) {
        this.authSeq = authSeq;
        this.userSeq = userSeq;
        this.authCode = authCode;
        this.authDt = authDt;
        this.regDt = regDt;
        this.isAuth = isAuth;
        this.code = code;
    }
}
