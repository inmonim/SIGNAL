package com.ssafysignal.api.global.jwt;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TokenInfo {
    private String accessToken;
    private String refreshToken;

    public static TokenInfo of (String accessToken, String refreshToken){
        return TokenInfo.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

}
