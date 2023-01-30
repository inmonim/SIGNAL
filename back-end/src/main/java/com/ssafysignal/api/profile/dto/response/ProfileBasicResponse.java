package com.ssafysignal.api.profile.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.ssafysignal.api.profile.entity.UserCareer;
import com.ssafysignal.api.profile.entity.UserExp;
import com.ssafysignal.api.profile.entity.UserPosition;
import com.ssafysignal.api.profile.entity.UserSkill;
import io.swagger.annotations.ApiModel;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@ApiModel(value = "ProfileFindResponse", description = "프로필 상세")
public class ProfileBasicResponse {
    @Schema(description = "포지션 목록")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<UserPosition> userPositionList;
    @Schema(description = "기술 스택 목록")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<UserSkill> userSkillList;
    @Schema(description = "경력 목록")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<UserCareer> userCareerList;
    @Schema(description = "경험 목록")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<UserExp> userExpList;
}
