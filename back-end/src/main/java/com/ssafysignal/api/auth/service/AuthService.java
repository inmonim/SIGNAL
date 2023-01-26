package com.ssafysignal.api.auth.service;

import com.ssafysignal.api.auth.dto.request.FindEmailRequest;
import com.ssafysignal.api.auth.entity.Auth;
import com.ssafysignal.api.auth.repository.AuthRepository;
import com.ssafysignal.api.common.dto.EmailDto;
import com.ssafysignal.api.common.service.EmailService;
import com.ssafysignal.api.global.exception.NotFoundException;
import com.ssafysignal.api.global.response.ResponseCode;
import com.ssafysignal.api.user.entity.User;
import com.ssafysignal.api.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {

    private final AuthRepository authRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;

    @Value("${server.backend.host}")
    private String beHost;

    @Value("${server.frontend.host}")
    private String feHost;

    @Transactional(readOnly = true)
    public void checkEmail(final String email) {
        userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException(ResponseCode.SUCCESS));
    }

    @Transactional(readOnly = true)
    public void checkNickname(final String nickname) {
        userRepository.findByNickname(nickname)
                .orElseThrow(() -> new NotFoundException(ResponseCode.SUCCESS));
    }

    @Transactional(readOnly = true)
    public String findEmail(final FindEmailRequest findEmailRequest) {
        User user = userRepository.findByNameAndPhone(findEmailRequest.getName(), findEmailRequest.getPhone())
                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));
        return user.getEmail();
    }

    @Transactional(readOnly = true)
    public void emailAuth(final String authCode) throws RuntimeException {
        Auth auth = authRepository.findByCodeAndIsAuth(authCode, false)
                // 인증이 이미 되었거나 코드가 없는 경우
                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));

        auth.setAuth(true);
        authRepository.save(auth);
    }

    @Transactional
    public void findPassword(final String email) throws Exception {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));

        String authCode = UUID.randomUUID().toString();

        Auth auth = Auth.builder()
                .userSeq(user.getUserSeq())
                .authCode("AU100")
                .code(authCode)
                .build();
        // 인증 코드 등록
        authRepository.save(auth);
        
        // 이메일 전송 코드 필요
        emailService.sendMail(
                EmailDto.builder()
                        .receiveAddress(email)
                        .title("시그널 비밀번호 변경")
                        .text("비밀번호 변경")
                        .host(beHost)
                        .url(String.format("/auth/findPassword?code=%s", authCode))
                        .build());
    }
}
