package com.ssafysignal.api.admin.dto.Response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafysignal.api.admin.Entity.BlackUser;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
public class FindAdminUserResponse {
    @Schema(description = "블랙 유저 Seq")
    private Integer blackUserSeq;
    @Schema(description = "사용자 Seq")
    private Integer userSeq;
    @Schema(description = "사용자 이메일")
    private String email;
    @Schema(description = "사용자 닉네임")
    private String nickname;
    @Schema(description = "블랙리스트 등록 일자")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSS", shape = JsonFormat.Shape.STRING)
    private LocalDateTime regDt;
    @Schema(description = "퇴출된 프로젝트 Seq")
    private Integer projectSeq;

    public static List<FindAdminUserResponse> toList(List<BlackUser> blackUserList){
        return blackUserList.stream().map(FindAdminUserResponse::fromEntity).collect(Collectors.toList());
    }
    public static FindAdminUserResponse fromEntity(BlackUser blackUser){
        return FindAdminUserResponse.builder()
                .blackUserSeq(blackUser.getBlackUserSeq())
                .userSeq(blackUser.getUserSeq())
                .email(blackUser.getUser().getEmail())
                .nickname(blackUser.getUser().getNickname())
                .regDt(blackUser.getRegDt())
                .projectSeq(blackUser.getProjectSeq())
                .build();

    }
}
