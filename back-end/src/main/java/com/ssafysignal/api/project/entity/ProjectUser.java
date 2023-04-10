package com.ssafysignal.api.project.entity;

import com.ssafysignal.api.apply.entity.Apply;
import com.ssafysignal.api.common.entity.CommonCode;
import com.ssafysignal.api.user.entity.User;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicInsert
@DynamicUpdate
@Builder
@AllArgsConstructor
@Table(name = "project_user")
public class ProjectUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_user_seq")
    private Integer projectUserSeq;
    @Column(name = "user_seq")
    private Integer userSeq;
    @Column(name = "project_seq")
    private Integer projectSeq;
    @Column(name = "warning_cnt")
    private Integer warningCnt;
    @Column(name = "position_code")
    private String positionCode;
    @Column(name = "is_leader")
    private boolean isLeader;
    @Column(name = "heart_cnt")
    private Integer heartCnt;

    @OneToOne
    @JoinColumn(name = "position_code", insertable = false, updatable = false)
    private CommonCode code;
    @OneToOne
    @JoinColumn(name = "user_seq", insertable = false, updatable = false)
    private User user;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "project_user_seq", insertable = false, updatable = false)
    private List<ProjectUserHeartLog> projectUserHeartLogList;

    public static List<ProjectUser> toList(List<Apply> applyList) {
        return applyList.stream().map(ProjectUser::fromEntity).collect(Collectors.toList());
    }

    public static ProjectUser fromEntity(Apply apply){
        return ProjectUser.builder()
                .userSeq(apply.getUserSeq())
                .projectSeq(apply.getPosting().getProject().getProjectSeq())
                .heartCnt(100)
                .positionCode(apply.getPositionCode())
                .build();
    }
}
