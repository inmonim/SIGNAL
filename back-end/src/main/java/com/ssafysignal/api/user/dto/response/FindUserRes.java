package com.ssafysignal.api.user.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter

public class FindUserRes {
    String nickname;
    String phone;
    String email;
    int heartCnt;

    @Builder
    public FindUserRes(String nickname, String phone, String email, int heartCnt) {
        this.nickname = nickname;
        this.phone = phone;
        this.email = email;
        this.heartCnt = heartCnt;
    }
}
