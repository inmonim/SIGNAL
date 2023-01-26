package com.ssafysignal.api.common.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "image_file")
public class ImageFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_file_seq")
    private Integer imageFileSeq;

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

}
