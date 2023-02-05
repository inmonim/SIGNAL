package com.ssafysignal.api.openprofile.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.ssafysignal.api.profile.entity.UserCareer;
import com.ssafysignal.api.profile.entity.UserExp;
import com.ssafysignal.api.profile.entity.UserPosition;
import com.ssafysignal.api.profile.entity.UserSkill;
import io.swagger.annotations.ApiModel;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@ApiModel(value = "FindAllReq", description = "오픈프로필 리스트")
public class FindAllReq {
    @Schema(description = "유저 seq")
    private int userSeq;

    @Schema(description = "오픈프로필 등록일")
    private LocalDateTime regDt;
    
    @Schema(description = "포지션 목록")
    private List<UserPosition> userPositionList;

    @Schema(description = "기술 스택 목록")
    private List<UserSkill> userSkillList;

    @Schema(description = "경력 목록")
    private List<UserCareer> userCareerList;

    @Schema(description = "경험 목록")
    private List<UserExp> userExpList;
}
