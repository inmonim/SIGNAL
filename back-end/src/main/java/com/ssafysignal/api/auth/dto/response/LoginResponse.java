package com.ssafysignal.api.auth.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResponse {
    private Integer userSeq;
    private String email;
    private String name;
    private String nickname;
    private String accessToken;
    private String refreshToken;
}
