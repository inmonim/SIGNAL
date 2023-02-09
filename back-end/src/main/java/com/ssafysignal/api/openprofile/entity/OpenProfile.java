package com.ssafysignal.api.openprofile.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@DynamicInsert
@DynamicUpdate
public class OpenProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "open_profile_seq")
    private Integer openProfileSeq;

    @Column(name = "user_seq")
    private Integer userSeq;

    @Column(name = "reg_dt")
    private LocalDateTime regDt;

}
