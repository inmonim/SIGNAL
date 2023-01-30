package com.ssafysignal.api.profile.entity;

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
@Table(name = "user_position")
public class UserPosition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_position_seq")
    private Integer userPositionSeq;

    @Column(name = "user_seq")
    private Integer userSeq;

    @Column(name = "position_code")
    private String positionCode;

    @Builder
    public UserPosition(Integer userPositionSeq, Integer userSeq, String positionCode) {
        this.userPositionSeq = userPositionSeq;
        this.userSeq = userSeq;
        this.positionCode = positionCode;
    }
}
