package com.ssafysignal.api.letter.entity;

import com.ssafysignal.api.user.entity.User;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@ToString
@DynamicInsert
@DynamicUpdate
@Table(name = "letter")
public class Letter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int letterSeq;
    private int fromUserSeq;
    private int toUserSeq;
    private String title;
    private String content;
    private boolean isTrash;
    private boolean isRead;
    private LocalDateTime regDt;
    @OneToOne
    @JoinColumn(name = "fromUserSeq", insertable = false, updatable = false)
    private User fromUser;

    @OneToOne
    @JoinColumn(name = "toUserSeq", insertable = false, updatable = false)
    private User toUser;

    @Builder

    public Letter(int letterSeq, int fromUserSeq, int toUserSeq, String title, String content, boolean isTrash, boolean isRead, LocalDateTime regDt) {
        this.letterSeq = letterSeq;
        this.fromUserSeq = fromUserSeq;
        this.toUserSeq = toUserSeq;
        this.title = title;
        this.content = content;
        this.isTrash = isTrash;
        this.isRead = isRead;
        this.regDt = regDt;
    }

    public void makeReadTrue(){
        this.isRead=true;
    }
    public void makeTrashTrue(){
        this.isTrash=true;
    }
}
