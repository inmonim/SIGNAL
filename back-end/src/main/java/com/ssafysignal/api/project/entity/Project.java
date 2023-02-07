package com.ssafysignal.api.project.entity;

import com.ssafysignal.api.common.entity.CommonCode;
import com.ssafysignal.api.common.entity.ImageFile;
import com.ssafysignal.api.posting.entity.Posting;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicInsert
@DynamicUpdate
@Table(name = "project")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_seq")
    private Integer projectSeq;
    @Column(name = "posting_seq")
    private Integer postingSeq;
    @Column(name = "subject")
    private String subject;
    @Column(name = "local_code")
    private String localCode;
    @Column(name = "field_code")
    private String fieldCode;
    @Column(name = "is_contact")
    private boolean isContact;
    @Column(name = "week_cnt")
    private Integer weekCnt;
    @Column(name = "term")
    private Integer term;
    @Column(name = "git_url")
    private String gitUrl;
    @Column(name = "content")
    private String content;
    @Column(name = "evaluation_dt")
    private LocalDate evaluationDt;
    @Column(name = "project_code")
    private String projectCode;
    @Column(name = "project_image_file_seq")
    private Integer projectImageFileSeq;
    @Column(name = "reg_dt")
    private LocalDateTime regDt;

    // 1 : 1 관계
    @OneToOne
    @JoinColumn(name = "local_code", insertable = false, updatable = false)
    private CommonCode local;
    @OneToOne
    @JoinColumn(name = "field_code", insertable = false, updatable = false)
    private CommonCode field;
    @OneToOne
    @JoinColumn(name = "project_code", insertable = false, updatable = false)
    private CommonCode code;
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "project_image_file_seq", insertable = false, updatable = false)
    private ImageFile imageFile;
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "posting_seq", insertable = false, updatable = false)
    private Posting posting;

    // 1 : N 관계
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "project_seq")
    private List<ProjectEvaluation> projectEvaluationList;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "project_seq")
    private List<ProjectNotionDocs> projectNotionDocsList;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "project_seq")
    private List<ProjectPosition> projectPositionList;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "project_seq")
    private List<ProjectToDo> projectToDoList;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "project_seq")
    private List<ProjectUser> projectUserList;

    @Builder
    public Project(Integer projectSeq, Integer postingSeq, String subject, String localCode, String fieldCode, boolean isContact, Integer weekCnt, Integer term, String gitUrl, String content, LocalDate evaluationDt, String projectCode, ImageFile imageFile, Posting posting, List<ProjectEvaluation> projectEvaluationList, List<ProjectNotionDocs> projectNotionDocsList, List<ProjectPosition> projectPositionList, List<ProjectToDo> projectToDoList, List<ProjectUser> projectUserList, LocalDateTime regDt) {
        this.projectSeq = projectSeq;
        this.postingSeq = postingSeq;
        this.subject = subject;
        this.localCode = localCode;
        this.fieldCode = fieldCode;
        this.isContact = isContact;
        this.weekCnt = weekCnt;
        this.term = term;
        this.gitUrl = gitUrl;
        this.content = content;
        this.evaluationDt = evaluationDt;
        this.projectCode = projectCode;
        this.imageFile = imageFile;
        this.posting = posting;
        this.projectEvaluationList = projectEvaluationList;
        this.projectNotionDocsList = projectNotionDocsList;
        this.projectPositionList = projectPositionList;
        this.projectToDoList = projectToDoList;
        this.projectUserList = projectUserList;
        this.regDt = regDt;
    }
}
