package com.ssafysignal.api.user.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter

public class FindUserRes {
    String nickname;
    String phone;
    String email;

    @Builder
    public FindUserRes(String nickname, String phone, String email) {
        this.nickname = nickname;
        this.phone = phone;
        this.email = email;
    }
}
