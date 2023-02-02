package com.ssafysignal.api.global.redis;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

import javax.persistence.Id;

// Redis 에 저장할 Refresh Token 객체
@Getter
@RedisHash("refreshToken")
@AllArgsConstructor
@Builder
public class RefreshToken {
    @Id
    private String id;
    private String refreshToken;
    @TimeToLive
    private Long expiration;
    public static RefreshToken createRefreshToken(String username, String refreshToken, Long remainingMilliSeconds) {
        return RefreshToken.builder()
                .id(username)
                .refreshToken(refreshToken)
                .expiration(remainingMilliSeconds / 1000)
                .build();
    }
}
