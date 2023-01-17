package com.ssafysignal.api.user.service;

import com.ssafysignal.api.user.dto.Response.UserFindAllResponse;
import com.ssafysignal.api.user.dto.Response.UserFindResponse;
import com.ssafysignal.api.user.entity.User;
import com.ssafysignal.api.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public UserFindAllResponse findAllUsers(int page, int size) {
        Page<User> userList = userRepository.findAll(PageRequest.of(page - 1, size, Sort.Direction.ASC, "userSeq"));

        return new UserFindAllResponse().fromEntity(userList);
    }

    @Transactional(readOnly = true)
    public UserFindResponse findUser(final int userSeq) {

        User user = userRepository.findById(userSeq).get();
        //        .orElseThrow(() -> new RuntimeException("찾는 회원이 없습니다."));

        return UserFindResponse.fromEntity(user);
    }

}
