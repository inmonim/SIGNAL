package com.ssafysignal.api.user.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter

public class FindUserResponse {
    String nickname;
    String phone;
    String email;
    int heartCnt;

    @Builder
    public FindUserResponse(String nickname, String phone, String email, int heartCnt) {
        this.nickname = nickname;
        this.phone = phone;
        this.email = email;
        this.heartCnt = heartCnt;
    }
}
