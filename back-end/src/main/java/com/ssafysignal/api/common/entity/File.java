package com.ssafysignal.api.common.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicInsert
@DynamicUpdate
@Table(name = "file")
public class File {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "file_seq")
    private Integer fileSeq;

    @Column(name = "name")
    private String name;

    @Column(name = "size")
    private Integer size;

    @Column(name = "type")
    private String type;

    @Column(name = "url")
    private String url;

    @Column(name = "reg_dt")
    private LocalDateTime regDt;

    @Builder
    private File(Integer fileSeq, String name, Integer size, String type, String url, LocalDateTime regDt) {
        this.fileSeq = fileSeq;
        this.name = name;
        this.size = size;
        this.type = type;
        this.url = url;
        this.regDt = regDt;
    }
}
