package com.ssafysignal.api.project.entity;

import com.ssafysignal.api.common.entity.ImageFile;
import com.ssafysignal.api.posting.entity.Posting;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicInsert
@DynamicUpdate
@Table(name = "project")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_seq")
    private Integer projectSeq;

    @Column(name = "subject")
    private String subject;

    @Column(name = "posting_seq")
    private Integer postingSeq;

    @Column(name = "is_contact")
    private boolean isContact;

    @Column(name = "week_cnt")
    private Integer weekCnt;

    @Column(name = "term")
    private Integer term;

    @Column(name = "field_code")
    private String fieldCode;

    @Column(name = "project_code")
    private String projectCode;

    @Column(name = "local_code")
    private String localCode;

    @Column(name = "git_url")
    private String gitUrl;

    @Column(name = "content")
    private String content;

    @Column(name = "evaluation_dt")
    private LocalDateTime evaluationDt;

    @OneToOne
    @JoinColumn(name = "posting_seq", insertable = false, updatable = false)
    private Posting posting;

    @OneToOne
    @JoinColumn(name = "project_image_file_seq")
    private ImageFile imageFile;


    @Builder
    public Project(Integer projectSeq, Integer postingSeq, String subject, boolean isContact, Integer weekCnt, Integer term, Posting posting,
                   String localCode, String fieldCode, String projectCode, ImageFile imageFile,
                   String gitUrl, String content, LocalDateTime evaluationDt) {
        this.projectSeq = projectSeq;
        this.subject = subject;
        this.postingSeq = postingSeq;
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
