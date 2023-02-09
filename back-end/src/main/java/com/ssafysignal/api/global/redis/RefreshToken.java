package com.ssafysignal.api.global.redis;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

import javax.persistence.Id;

// Redis 에 저장할 Refresh Token 객체
@Getter
@Setter
@RedisHash("refreshToken")
@AllArgsConstructor
@Builder
public class RefreshToken {
    @Id
    private String id;
    private String refreshToken;
    private String accessToken;
    @TimeToLive
    private Long expiration;
    public static RefreshToken createRefreshToken(String username, String accessToken, String refreshToken, Long remainingMilliSeconds) {
        return RefreshToken.builder()
                .id(username)
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .expiration(remainingMilliSeconds / 1000)
                .build();
    }
}
