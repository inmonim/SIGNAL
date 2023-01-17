package com.ssafysignal.api.user.dto.Response;

import com.ssafysignal.api.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.Date;

@Getter
@Builder
@AllArgsConstructor
public class UserFindResponse {

    private int userSeq;
    private String name;
    private String email;
    private String nickName;
    private Date birth;
    private String phone;
    private Date regDt;
    private int heartCount;
    private String userCode;

    public static UserFindResponse fromEntity(final User user){
        return UserFindResponse.builder()
                .userSeq(user.getUserSeq())
                .name(user.getName())
                .email(user.getEmail())
                .nickName(user.getNickname())
                .birth(user.getBirth())
                .phone(user.getPhone())
                .regDt(user.getRegDt())
                .heartCount(user.getHeartCount())
                .userCode(user.getUserCode())
                .build();
    }
}
