package com.ssafysignal.api.user.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Data
@Builder
public class FindUserResponse {
    String nickname;
    String phone;
    String email;
    Integer heartCnt;
    String userImageUrl;
}
