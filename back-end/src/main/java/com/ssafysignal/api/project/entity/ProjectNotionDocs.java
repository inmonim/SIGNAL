package com.ssafysignal.api.project.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@DynamicInsert
@DynamicUpdate
public class ProjectNotionDocs {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_notion_docs_seq")
    private Integer projectNotionDocsSeq;

    @Column(name = "project_seq")
    private Integer projectSeq;

    @Column(name = "url")
    private String url;

    @Column(name = "subject")
    private String subject;

    @Column(name = "reg_dt")
    private LocalDateTime regDt;

}
