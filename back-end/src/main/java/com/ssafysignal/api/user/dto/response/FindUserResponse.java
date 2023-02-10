package com.ssafysignal.api.user.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Data
@Builder
public class FindUserResponse {
    private Integer userSeq;
    private String nickname;
    private String phone;
    private String email;
    private Integer heartCnt;
    private String userImageUrl;
}
