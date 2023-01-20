package com.ssafysignal.api.user.dto.response;

import com.ssafysignal.api.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
public class UserFindAllResponse {

    private List<UserFindResponse> userList;

    private UserFindAllResponse(final List<UserFindResponse> userList) {
        this.userList = userList;
    }

    public static UserFindAllResponse fromEntity(final Page<User> findUserList) {
        List<UserFindResponse> userList = findUserList.stream()
                .map(UserFindResponse::fromEntity)
                .collect(Collectors.toList());
        return new UserFindAllResponse(userList);
    }

}
