package com.ssafysignal.api.todolist.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafysignal.api.common.entity.CommonCode;
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
@Table(name = "project_to_do")
public class Todolist {
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

    @Builder
    public Todolist(Integer projectToDoSeq, Integer projectSeq, Integer userSeq, String content, String toDoCode, LocalDateTime regDt) {
        this.projectToDoSeq = projectToDoSeq;
        this.projectSeq = projectSeq;
        this.userSeq = userSeq;
        this.content = content;
        this.toDoCode = toDoCode;
        this.regDt = regDt;
    }
}
