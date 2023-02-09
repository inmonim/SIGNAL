package com.ssafysignal.api.auth.service;

import com.ssafysignal.api.auth.dto.request.FindEmailRequest;
import com.ssafysignal.api.auth.dto.response.LoginResponse;
import com.ssafysignal.api.auth.entity.Auth;
import com.ssafysignal.api.auth.entity.UserAuth;
import com.ssafysignal.api.auth.repository.AuthRepository;
import com.ssafysignal.api.auth.repository.UserAuthRepository;
import com.ssafysignal.api.common.dto.EmailDto;
import com.ssafysignal.api.common.service.EmailService;
import com.ssafysignal.api.global.exception.NotFoundException;
import com.ssafysignal.api.global.exception.UnAuthException;
import com.ssafysignal.api.global.jwt.JwtExpirationEnums;
import com.ssafysignal.api.global.jwt.JwtTokenUtil;
import com.ssafysignal.api.global.jwt.TokenInfo;
import com.ssafysignal.api.global.jwt.UserCodeEnum;
import com.ssafysignal.api.global.redis.LogoutAccessToken;
import com.ssafysignal.api.global.redis.LogoutAccessTokenRedisRepository;
import com.ssafysignal.api.global.redis.RefreshToken;
import com.ssafysignal.api.global.redis.RefreshTokenRedisRepository;
import com.ssafysignal.api.global.response.ResponseCode;
import com.ssafysignal.api.user.entity.User;
import com.ssafysignal.api.user.repository.UserRepository;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthRepository authRepository;
    private final UserRepository userRepository;
    private final UserAuthRepository userAuthRepository;
    private final EmailService emailService;
    private final JwtTokenUtil jwtTokenUtil;
    private final RefreshTokenRedisRepository refreshTokenRedisRepository;
    private final LogoutAccessTokenRedisRepository logoutAccessTokenRedisRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${server.host}")
    private String host;
    @Value("${server.port}")
    private Integer port;

    @Transactional
    public LoginResponse login(String email, String password) throws RuntimeException {
        // 아이디 비밀번호 검증
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));
        if (!passwordEncoder.matches(password, user.getPassword())) throw new IllegalArgumentException("비밀번호가 맞지 않습니다.");

        // 이메일 인증 여부 검증
        Auth auth = authRepository.findTop1ByUserSeqAndAuthCodeOrderByRegDtDesc(user.getUserSeq(),"AU101")
                .orElseThrow(() -> new NotFoundException(ResponseCode.UNAUTHORIZED));
        if (!auth.isAuth()) throw new NotFoundException(ResponseCode.UNAUTHORIZED);


        // 중복 로그인 여부 검증
        // 이미 로그인된 정보가 있으면 해당 accessToken 꺼내서 로그아웃 토큰으로 등록시킴 (중복 로그인 방지)
        if (refreshTokenRedisRepository.findById(email).isPresent()){
            try {
                RefreshToken redisRefreshToken = refreshTokenRedisRepository.findById(email).get();
                String accessToken = redisRefreshToken.getAccessToken();
                long remainMilliSeconds = jwtTokenUtil.getRemainMilliSeconds(accessToken);
                logoutAccessTokenRedisRepository.save(LogoutAccessToken.of(accessToken, email, remainMilliSeconds));
            } catch (ExpiredJwtException e) {
                e.printStackTrace();
            } finally {
                refreshTokenRedisRepository.deleteById(email);
            }
        }

        // 토큰 발급 시작
        String accessToken = jwtTokenUtil.generateAccessToken(user.getEmail());
        RefreshToken refreshToken = refreshTokenRedisRepository.save(
                RefreshToken.createRefreshToken(user.getEmail(),
                accessToken,
                jwtTokenUtil.generateRefreshToken(user.getEmail()),
                JwtExpirationEnums.REFRESH_TOKEN_EXPIRATION_TIME.getValue()));

        return LoginResponse.builder()
                .userSeq(user.getUserSeq())
                .name(user.getName())
                .nickname(user.getNickname())
                .email(user.getEmail())
                .accessToken(accessToken)
                .refreshToken(refreshToken.getRefreshToken())
                .build();
    }

    @Transactional
    public LoginResponse reissue (String refreshToken) throws RuntimeException {
        refreshToken = refreshToken.substring(7);

        String email =jwtTokenUtil.getUsername(refreshToken);

        RefreshToken redisRefreshToken = refreshTokenRedisRepository.findById(email)
                .orElseThrow(() -> new UnAuthException(ResponseCode.TOKEN_NOT_FOUND));

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));

        // 레디스의 리프레시 토큰와 일치하면
        if (refreshToken.equals(redisRefreshToken.getRefreshToken())){
            // 엑세스 토큰 발급
            String accessToken = jwtTokenUtil.generateAccessToken(email);
            // 리프레시 토큰이 만료되었으면
//            if (jwtTokenUtil.getRemainMilliSeconds(refreshToken) <= 0) {
//                refreshToken = jwtTokenUtil.generateRefreshToken(email);
//            }
            redisRefreshToken.setAccessToken(accessToken);
            refreshTokenRedisRepository.save(redisRefreshToken);

            return LoginResponse.builder()
                    .userSeq(user.getUserSeq())
                    .name(user.getName())
                    .email(user.getEmail())
                    .accessToken(accessToken)
                    .refreshToken(refreshToken)
                    .build();
        }

        throw new UnAuthException(ResponseCode.INVALID_TOKEN);
    }

    @CacheEvict(value = "user", key = "#email")
    public void logout(TokenInfo tokenInfo, String email) {
        String accessToken = tokenInfo.getAccessToken().substring(7);
        long remainMilliSeconds = jwtTokenUtil.getRemainMilliSeconds(accessToken);
        refreshTokenRedisRepository.deleteById(email);
        logoutAccessTokenRedisRepository.save(LogoutAccessToken.of(accessToken, email, remainMilliSeconds));
    }

    @Transactional(readOnly = true)
    public void checkEmail(String email) {
        userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public void checkNickname(String nickname) {
        userRepository.findByNickname(nickname)
                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public String findEmail(FindEmailRequest findEmailRequest) {
        User user = userRepository.findByNameAndPhone(findEmailRequest.getName(), findEmailRequest.getPhone())
                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));
        return user.getEmail();
    }

    @Transactional
    public void emailAuth(String authCode) throws RuntimeException {
        Auth auth = authRepository.findByCodeAndIsAuth(authCode, false)
                // 인증이 이미 되었거나 코드가 없는 경우
                .orElseThrow(() -> new UnAuthException(ResponseCode.ALREADY_AUTH));
        auth.setAuth(true);
        auth.setAuthDt(LocalDateTime.now());
        authRepository.save(auth);

        UserAuth userAuth = UserAuth.builder()
                .role(UserCodeEnum.USER.getCode())
                .user(User.builder()
                .userSeq(auth.getUserSeq())
                .build())
                .build();

        // 유저 권한 승급 ("USER")
        userAuthRepository.save(userAuth);
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

        // 인증을 위한 이메일 전송
        emailService.sendMail(
                EmailDto.builder()
                        .receiveAddress(email)
                        .title("Signal 비밀번호 찾기 - 이메일 인증")
                        .content("아래 버튼을 클릭하여 이메일을 인증해주세요.")
                        .text("이메일 인증")
                        .host(host)
                        .port(port)
                        .url(String.format("/auth/password/%s", authCode))
                        .build());
    }

    @Transactional
    public void getPasswordByEmail(final String authCode) throws Exception {
        // 인증이 이미 되었거나 코드가 없는 경우
        Auth auth = authRepository.findByCodeAndIsAuth(authCode, false)
                .orElseThrow(() -> new NotFoundException(ResponseCode.ALREADY_AUTH));

        // 인증처리
        auth.setAuth(true);
        auth.setAuthDt(LocalDateTime.now());
        authRepository.save(auth);

        //임시 비밀번호로 변경
        String tempPassword = UUID.randomUUID().toString().substring(0, 6);
        User user = userRepository.findByUserSeq(auth.getUserSeq())
                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));
        user.setPassword(passwordEncoder.encode(tempPassword));
        userRepository.save(user);

        //임시 비밀번호 전송
        emailService.sendMail(
                EmailDto.builder()
                        .receiveAddress(user.getEmail())
                        .title("Signal 임시 비밀 번호")
                        .content("변경된 임시 비밀번호 입니다.\n임시 비밀번호 : " + tempPassword)
                        .text("로그인")
                        .host(host)
                        .build());
    }
}
