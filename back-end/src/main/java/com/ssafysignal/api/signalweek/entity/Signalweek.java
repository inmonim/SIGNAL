package com.ssafysignal.api.signalweek.entity;

import com.ssafysignal.api.common.entity.ProjectFile;
import com.ssafysignal.api.project.entity.Project;
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
@Table(name = "signalweek")
public class Signalweek {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "signalweek_seq")
    private Integer signalweekSeq;

    @Column(name = "signalweek_schedule_seq")
    private Integer signalweekScheduleSeq;

    @Column(name = "title")
    private String title;

    @Column(name = "ucc_url")
    private String uccUrl;

    @Column(name = "deploy_url")
    private String deployUrl;

    @Column(name = "content")
    private String content;

    @Column(name = "view")
    private Integer view;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "project_seq")
    private Project project;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "ppt_file_seq")
    private ProjectFile pptFile;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "readme_file_seq")
    private ProjectFile readmeFile;


}
