package com.ssafysignal.api.project.entity;

import com.ssafysignal.api.global.db.entity.CommonCode;
import com.ssafysignal.api.global.db.entity.ImageFile;
import com.ssafysignal.api.posting.entity.Posting;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "project")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_seq")
    private Integer projectSeq;

    @Column(name = "subject")
    private String subject;

    @Column(name = "is_contact")
    private boolean isContact;

    @Column(name = "week_cnt")
    private Integer weekCnt;

    @Column(name = "term")
    private Integer term;

    @OneToOne
    @JoinColumn(name = "posting_seq")
    private Posting posting;

    @OneToOne
    @JoinColumn(name = "local_code")
    private CommonCode localCode;

    @OneToOne
    @JoinColumn(name = "field_code")
    private CommonCode fieldCode;

    @OneToOne
    @JoinColumn(name = "project_code")
    private CommonCode projectCode;

    @OneToOne
    @JoinColumn(name = "project_image_file_seq")
    private ImageFile imageFile;

    @Column(name = "git_url")
    private String gitUrl;

    @Column(name = "content")
    private String content;

    @Column(name = "evaluation_dt")
    private LocalDateTime evaluationDt;

    @Builder
    public Project(Integer projectSeq, String subject, boolean isContact, Integer weekCnt, Integer term, Posting posting,
                   CommonCode localCode, CommonCode fieldCode, CommonCode projectCode, ImageFile imageFile,
                   String gitUrl, String content, LocalDateTime evaluationDt) {
        this.projectSeq = projectSeq;
        this.subject = subject;
        this.isContact = isContact;
        this.weekCnt = weekCnt;
        this.term = term;
        this.posting = posting;
        this.localCode = localCode;
        this.fieldCode = fieldCode;
        this.projectCode = projectCode;
        this.imageFile = imageFile;
        this.gitUrl = gitUrl;
        this.content = content;
        this.evaluationDt = evaluationDt;
    }
}
