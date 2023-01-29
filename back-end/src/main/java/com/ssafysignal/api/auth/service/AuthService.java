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

import javax.security.auth.message.AuthException;
import java.util.Optional;
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

    @Transactional
    public void emailAuth(final String authCode) throws RuntimeException {
        Auth auth = authRepository.findByCodeAndIsAuth(authCode, false)
                // 인증이 이미 되었거나 코드가 없는 경우
                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));

        //유저 권한 승급
        User user = userRepository.findByUserSeq(auth.getUserSeq())
                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));
        user.giveAuth();
        userRepository.save(user);

        auth.setAuth(true);
        authRepository.save(auth);
    }

    @Transactional
    public void findPassword(final String email) throws Exception {
        System.out.println(email);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));
        System.out.println(user);
        String authCode = UUID.randomUUID().toString();

        Auth auth = Auth.builder()
                .userSeq(user.getUserSeq())
                .authCode("AU100")
                .code(authCode)
                .build();
        // 인증 코드 등록
        authRepository.save(auth);

        // 인증을 위한 이메일 전송
        emailService.sendMail(
                EmailDto.builder()
                        .receiveAddress(email)
                        .title("Signal 비밀번호 찾기 - 이메일 인증")
                        .text("url을 클릭하여 임시 비밀번호를 이메일로 받을 수 있습니다.")
                        .host(beHost)
                        .url(String.format("/auth/password/%s", authCode))
                        .build());
    }


    @Transactional
    public void getTempPassword(final String authCode) throws Exception {
        Auth auth = authRepository.findByCodeAndIsAuth(authCode, false)
                // 인증이 이미 되었거나 코드가 없는 경우
                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));

        String tempPassword = UUID.randomUUID().toString().substring(0,6);

        //임시 비밀번호로 변경
        User user = userRepository.findByUserSeq(auth.getUserSeq())
                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));
        user.modifyPassword(tempPassword);
        userRepository.save(user);

        //임시 비밀번호 전송
        emailService.sendMail(
                EmailDto.builder()
                        .receiveAddress(user.getEmail())
                        .title("Signal 임시 비밀 번호")
                        .text("변경된 임시 비밀번호 입니다.\n임시 비밀번호 : "+tempPassword)
                        .build());
    }
    @Transactional
    public void login(final String email, final String password) throws AuthException {
        User user = userRepository.findByEmailAndPassword(email, password)
                //잘못된 정보
                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));
        String userCode = user.getUserCode();
        if(userCode.equals("US103") || userCode.equals("US102")){ //이메일 인증 안된경우, 삭제된 유저인경우
            throw new AuthException();
        }

    }
}
