package com.ssafysignal.api.project.entity;

import com.ssafysignal.api.common.entity.CommonCode;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicInsert
@DynamicUpdate
@Table(name = "project_notion_docs")
public class ProjectNotionDocs {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_notion_docs_seq")
    private Integer ProjectNotionDocsSeq;
    @Column(name = "project_seq")
    private Integer projectSeq;
    @Column(name = "url")
    private String url;
    @Column(name = "type_code")
    private String typeCode;
    @Column(name = "reg_dt")
    private LocalDateTime regDt;
    @OneToOne
    @JoinColumn(name = "type_code", insertable = false, updatable = false)
    private CommonCode code;

    @Builder
    public ProjectNotionDocs(Integer projectNotionDocsSeq, Integer projectSeq, String url, String typeCode, LocalDateTime regDt, CommonCode code) {
        ProjectNotionDocsSeq = projectNotionDocsSeq;
        this.projectSeq = projectSeq;
        this.url = url;
        this.typeCode = typeCode;
        this.regDt = regDt;
        this.code = code;
    }
}
