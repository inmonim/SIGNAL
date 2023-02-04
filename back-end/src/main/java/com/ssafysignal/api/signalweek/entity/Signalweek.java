package com.ssafysignal.api.signalweek.entity;

import com.ssafysignal.api.common.entity.File;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicInsert
@DynamicUpdate
@Table(name = "signalweek")
public class Signalweek {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "signalweek_seq")
    private Integer signalweekSeq;

    @Column(name = "signalweek_schedule_seq")
    private Integer signalweekSchedulSeq;

    @Column(name = "project_seq")
    private Integer projectSeq;

    @Column(name = "title")
    private String title;

    @Column(name = "ucc_url")
    private String uccUrl;

    @Column(name = "deploy_url")
    private String deployUrl;

    @Column(name = "content")
    private String content;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "ppt_file_seq")
    private File pptFile;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "readme_file_seq")
    private File readmeFile;

    @Builder
    public Signalweek(Integer signalweekSeq, Integer signalweekSchedulSeq, String title, Integer projectSeq,
                      String uccUrl, String deployUrl, String content, File pptFile, File readmeFile) {
        this.signalweekSeq = signalweekSeq;
        this.signalweekSchedulSeq = signalweekSchedulSeq;
        this.title = title;
        this.projectSeq = projectSeq;
        this.uccUrl = uccUrl;
        this.deployUrl = deployUrl;
        this.content = content;
        this.pptFile = pptFile;
        this.readmeFile = readmeFile;
    }

}
