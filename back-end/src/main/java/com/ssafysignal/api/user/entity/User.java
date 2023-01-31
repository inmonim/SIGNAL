package com.ssafysignal.api.user.entity;

import com.ssafysignal.api.common.entity.ImageFile;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Getter
@ToString
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Entity
@DynamicInsert
@DynamicUpdate
@Table(name = "user")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userSeq")
    private Integer userSeq;
    @Column(name = "name")
    private String name;
    @Column(name = "email", unique = true)
    private String email;
    @Column(name = "password")
    private String password;
    @Column(name = "nickname")
    private String nickname;
    @Column(name = "birth")
    private LocalDateTime birth;
    @Column(name = "phone")
    private String phone;
    @Column(name = "reg_dt")
    private LocalDateTime regDt;
    @Column(name = "heart_cnt")
    private int heartCnt;
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "user_image_file_seq")
    private ImageFile imageFile;

    @Builder
    public User(Integer userSeq, String name, String email, String password, String nickname, LocalDateTime birth, String phone, LocalDateTime regDt, int heartCnt, ImageFile imageFile) {
        this.userSeq = userSeq;
        this.name = name;
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.birth = birth;
        this.phone = phone;
        this.regDt = regDt;
        this.heartCnt = heartCnt;
        this.imageFile = imageFile;
    }

    public void modifyUser(String name, String nickname,String phone, LocalDateTime birth) {
        this.name = name;
        this.nickname = nickname;
        this.phone = phone;
        this.birth = birth;
    }

    public void modifyPassword(String password){
        this.password = password;
    }
}
