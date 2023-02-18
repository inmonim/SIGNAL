package com.ssafysignal.api.apply.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicInsert
@DynamicUpdate
@Builder
@AllArgsConstructor
@Table(name = "apply_career")
public class ApplyCareer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "apply_career_seq")
    private Integer applyCareerSeq;
    @Column(name = "apply_seq")
    private Integer applySeq;
    @Column(name = "content")
    private String content;
}
