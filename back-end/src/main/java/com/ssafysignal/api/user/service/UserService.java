package com.ssafysignal.api.user.service;

import com.ssafysignal.api.auth.entity.Auth;
import com.ssafysignal.api.auth.entity.UserAuth;
import com.ssafysignal.api.auth.repository.AuthRepository;
import com.ssafysignal.api.auth.repository.UserAuthRepository;
import com.ssafysignal.api.common.dto.EmailDto;
import com.ssafysignal.api.common.service.EmailService;
import com.ssafysignal.api.global.exception.NotFoundException;
import com.ssafysignal.api.global.response.ResponseCode;
import com.ssafysignal.api.user.dto.request.ModifyUserRequest;
import com.ssafysignal.api.user.dto.request.RegistUserRequest;
import com.ssafysignal.api.user.dto.response.FindUserResponse;
import com.ssafysignal.api.user.entity.User;
import com.ssafysignal.api.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final AuthRepository authRepository;
    private final UserAuthRepository userAuthRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    @Value("${server.host}")
    private String host;


    @Transactional(readOnly = true)
    public User findUser(final int userSeq) {
        return userRepository.findByUserSeq(userSeq)
                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));
    }
    
    @Transactional
    public void registUser(RegistUserRequest registUserRequest) throws Exception {
        String authCode = UUID.randomUUID().toString();

        // 비밀번호 암호화
        registUserRequest.setPassword(passwordEncoder.encode(registUserRequest.getPassword()));

        // 데이터베이스 저장
        User user = userRepository.save(User.builder()
                        .name(registUserRequest.getName())
                        .email(registUserRequest.getEmail())
                        .password(registUserRequest.getPassword())
                        .nickname(registUserRequest.getNickname())
                        .birth(registUserRequest.getBirth())
                        .phone(registUserRequest.getPhone())
                        .build());

        // 이메일 인증 코드 저장
        Auth auth = Auth.builder()
                .userSeq(user.getUserSeq())
                .authCode("AU101")
                .code(authCode)
                .build();

        // 인증 코드 등록
        authRepository.save(auth);

        // 인증 메일 전송
        emailService.sendMail(
                EmailDto.builder()
                        .receiveAddress(user.getEmail())
                        .title("Signal 회원가입 인증")
                        .text("이메일 인증")
                        .host(host)
                        .url(String.format("/auth/emailauth/%s", authCode))
                        .build());
    }
    
    @Transactional
    public void deleteUser(int userSeq) throws RuntimeException {
        User user = userRepository.findByUserSeq(userSeq)
                        .orElseThrow(() -> new NotFoundException(ResponseCode.DELETE_NOT_FOUND));
        userAuthRepository.deleteByUser(user);
    }
    
    @Transactional
    public void modifyUser(int userSeq, ModifyUserRequest userInfo) throws RuntimeException {
    	User user = userRepository.findByUserSeq(userSeq)
    			.orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));
    	user.modifyUser(userInfo.getName(), userInfo.getNickname(), userInfo.getPhone(), userInfo.getBirth());
    	userRepository.save(user);
    	
    	//파일 이미지  변경 코드 추가하기
    }

}
