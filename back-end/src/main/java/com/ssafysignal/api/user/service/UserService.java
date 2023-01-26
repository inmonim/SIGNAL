package com.ssafysignal.api.user.service;

import com.ssafysignal.api.auth.entity.Auth;
import com.ssafysignal.api.auth.repository.AuthRepository;
import com.ssafysignal.api.common.dto.EmailDto;
import com.ssafysignal.api.common.service.EmailService;
import com.ssafysignal.api.user.dto.response.FindUserRes;
import com.ssafysignal.api.user.entity.User;
import com.ssafysignal.api.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final AuthRepository authRepository;
    private final EmailService emailService;

    @Value("${server.backend.host}")
    private String beHost;

    @Value("${server.frontend.host}")
    private String feHost;

    /*@Transactional(readOnly = true)
    public UserFindAllResponse findAllUsers(int page, int size) {
        Page<User> userList = userRepository.findAll(PageRequest.of(page - 1, size, Sort.Direction.ASC, "userSeq"));

        return new UserFindAllResponse().fromEntity(userList);
    }*/
    
    /*@Transactional(readOnly = true)
    public User findUserAllInfo(final int userSeq) {

        Optional<User> user = userRepository.findById(userSeq);
        //        .orElseThrow(() -> new RuntimeException("찾는 회원이 없습니다."));
        //return UserFindResponse.fromEntity(user);
        return user.get();
    }*/

    @Transactional()
    public FindUserRes findUser(final int userSeq) {

        User user = userRepository.findByUserSeq(userSeq)
                .orElseThrow(() -> new RuntimeException("찾는 회원이 없습니다."));
        FindUserRes res = FindUserRes.builder()
                .email(user.getEmail())
                .nickname(user.getNickname())
                .phone(user.getPhone())
                .build();
        return res;
    }
    
    @Transactional()
    public User registUser(final User user) throws Exception {
        String authCode = UUID.randomUUID().toString();

    	User ret = userRepository.save(user);

        Auth auth = Auth.builder()
                .userSeq(ret.getUserSeq())
                .authCode("AU101")
                .code(authCode)
                .build();

        // 인증 코드 등록
        authRepository.save(auth);

        // 이메일 전송 코드 필요
        emailService.sendMail(
                EmailDto.builder()
                        .receiveAddress(ret.getEmail())
                        .title("Signal 회원가입 인증")
                        .text("url을 클릭하면 인증이 완료됩니다.")
                        .host(beHost)
                        .url(String.format("/auth/emailauth/%s", authCode))
                        .build());

    	return ret;
    }


}
