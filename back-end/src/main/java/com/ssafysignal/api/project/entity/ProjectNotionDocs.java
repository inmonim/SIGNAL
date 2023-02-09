package com.ssafysignal.api.project.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
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

    @Column(name = "num")
    private Integer num;

    @Column(name = "reg_dt")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSS", shape = JsonFormat.Shape.STRING)
    private LocalDateTime regDt;

}
