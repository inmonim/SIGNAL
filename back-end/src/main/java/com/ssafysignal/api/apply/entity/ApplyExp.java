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
@Table(name = "apply_exp")
public class ApplyExp {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "apply_exp_seq")
    private Integer applyExpSeq;

    @Column(name = "apply_seq")
    private Integer applySeq;

    @Column(name = "content")
    private String content;
}
