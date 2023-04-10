package com.ssafysignal.api.common.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
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
}
