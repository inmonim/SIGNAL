package com.ssafysignal.api.common.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
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
    @Column(name = "url")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String url;

    @Builder
    public CommonCode(String code, String name, String groupCode, String groupName, String url) {
        this.code = code;
        this.name = name;
        this.groupCode = groupCode;
        this.groupName = groupName;
        this.url = url;
    }


}
