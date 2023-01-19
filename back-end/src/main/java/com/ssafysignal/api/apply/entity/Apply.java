package com.ssafysignal.api.apply.entity;

import com.ssafysignal.api.user.entity.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "apply")
public class Apply {
    @Id
    private int apply_seq;

    @ManyToOne
    private User user;

    private String content;


}
