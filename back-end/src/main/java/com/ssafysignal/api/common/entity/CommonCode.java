package com.ssafysignal.api.common.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "common_code")
public class CommonCode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "code")
    private String code;

    @Column(name = "name")
    private String name;

    @Column(name = "group_code")
    private String groupCode;

    @Column(name = "groupName")
    private String groupName;

    @Builder
    public CommonCode(final String code, final String name, final String groupCode, final String groupName) {
        this.code = code;
        this.name = name;
        this.groupCode = groupCode;
        this.groupName = groupName;
    }
}
