package com.ssafysignal.api.board.entity;

import io.swagger.models.auth.In;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@ToString
@DynamicInsert
@DynamicUpdate
@Table(name = "notice")
public class Notice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notice_seq")
    private Integer noticeSeq;

    @Column(name = "user_seq")
    private Integer userSeq;

    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;

    @Column(name = "view")
    private Integer view;

    @Column(name = "reg_dt")
    private LocalDateTime regDt;

    public void addView(Integer view) {
        this.view = view+1;
    }

    @Builder
    public Notice(Integer noticeSeq, Integer userSeq, String title, String content,
                  Integer view, LocalDateTime regDt) {
        this.noticeSeq = noticeSeq;
        this.userSeq = userSeq;
        this.title = title;
        this.content = content;
        this.view = view;
        this.regDt = regDt;
    }
}