package com.ssafysignal.api.posting.entity;

import com.ssafysignal.api.user.entity.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "posting")
public class Posting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "posting_seq")
    private Integer postingSeq;

    @OneToOne
    @JoinColumn(name = "user_seq")
    private User user;

    @Column(name = "content")
    private String content;

    @Column(name = "posting_start_dt")
    private LocalDateTime postingStartDt;

    @Column(name = "posting_end_dt")
    private LocalDateTime postingEndDt;

    @Column(name = "level")
    private Integer level;

    @Column(name = "posting_code")
    private String postingCode;

    @Column(name = "reg_dt")
    private LocalDateTime regDt;

    @Builder
    public Posting(final Integer postingSeq, final User user, final String content, final LocalDateTime postingStartDt, final LocalDateTime postingEndDt,
                    final Integer level, final String postingCode, final LocalDateTime regDt) {
        this.postingSeq = postingSeq;
        this.user = user;
        this.content = content;
        this.postingStartDt = postingStartDt;
        this.postingEndDt = postingEndDt;
        this.level = level;
        this.postingCode = postingCode;
        this.regDt = regDt;
    }

}
