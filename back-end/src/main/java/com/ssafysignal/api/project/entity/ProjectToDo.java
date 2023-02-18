package com.ssafysignal.api.project.entity;


import com.ssafysignal.api.common.entity.CommonCode;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicInsert
@DynamicUpdate
@Builder
@AllArgsConstructor
@Table(name = "project_to_do")
public class ProjectToDo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_to_do_seq")
    private Integer projectToDoSeq;
    @Column(name = "project_seq")
    private Integer projectSeq;
    @Column(name = "user_seq")
    private Integer userSeq;
    @Column(name = "content")
    private String content;
    @Column(name = "to_do_code")
    private String toDoCode;
    @Column(name = "reg_dt")
    private LocalDateTime regDt;
    @OneToOne
    @JoinColumn(name = "to_do_code", insertable = false, updatable = false)
    private CommonCode code;
}
