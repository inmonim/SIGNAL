package com.ssafysignal.api.user.dto.response;

import com.ssafysignal.api.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;


@Getter
@Builder
@ToString
@AllArgsConstructor
public class UserFindResponse {
    private String email;
    private String nickName;
    private String phone;

    public static UserFindResponse fromEntity(final User user){
        return UserFindResponse.builder()
                .email(user.getEmail())
                .nickName(user.getNickname())
                .phone(user.getPhone())
                .build();
    }
}
