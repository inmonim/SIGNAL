package com.ssafysignal.api.common.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicInsert
@DynamicUpdate
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
    private Long size;
    @Column(name = "type")
    private String type;
    @Column(name = "url")
    private String url;
    @Column(name = "reg_dt")
    private LocalDateTime regDt;

    @Builder
    public ImageFile(Integer imageFileSeq, String name, Long size, String type, String url, LocalDateTime regDt) {
        this.imageFileSeq = imageFileSeq;
        this.name = name;
        this.size = size;
        this.type = type;
        this.url = url;
        this.regDt = regDt;
    }
}
