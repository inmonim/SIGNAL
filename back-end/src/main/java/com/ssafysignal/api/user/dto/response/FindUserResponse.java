package com.ssafysignal.api.user.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FindUserResponse {
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer userSeq;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String nickname;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String phone;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String email;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer heartCnt;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String userImageUrl;
}
