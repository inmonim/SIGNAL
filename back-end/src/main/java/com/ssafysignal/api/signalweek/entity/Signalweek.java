package com.ssafysignal.api.signalweek.entity;

import com.ssafysignal.api.common.entity.File;
import com.ssafysignal.api.project.entity.Project;
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

    @Column(name = "title")
    private String title;

    @Column(name = "ucc_url")
    private String uccUrl;

    @Column(name = "deploy_url")
    private String deployUrl;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "project_seq")
    private Project project;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "ppt_file_seq")
    private File pptFile;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "readme_file_seq")
    private File readmeFile;

    @Builder
    public Signalweek(Integer signalweekSeq, Integer signalweekSchedulSeq, String title, Project project,
                      String uccUrl, String deployUrl, File pptFile, File readmeFile) {
        this.signalweekSeq = signalweekSeq;
        this.signalweekSchedulSeq = signalweekSchedulSeq;
        this.title = title;
        this.project = project;
        this.uccUrl = uccUrl;
        this.deployUrl = deployUrl;
        this.pptFile = pptFile;
        this.readmeFile = readmeFile;
    }

}
