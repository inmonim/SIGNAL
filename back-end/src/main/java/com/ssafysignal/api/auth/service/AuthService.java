package com.ssafysignal.api.auth.service;

import com.ssafysignal.api.auth.dto.request.FindEmailRequest;
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
import com.ssafysignal.api.global.response.AuthResponseCode;
import com.ssafysignal.api.global.response.ResponseCode;
import com.ssafysignal.api.user.entity.User;
import com.ssafysignal.api.user.repository.UserRepository;
import jdk.nashorn.internal.parser.Token;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
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

    public TokenInfo login(String email, String password) throws RuntimeException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));

        if (!passwordEncoder.matches(password, user.getPassword())) throw new IllegalArgumentException("비밀번호가 맞지 않습니다.");

        String accessToken = jwtTokenUtil.generateAccessToken(user.getEmail());
        RefreshToken refreshToken = refreshTokenRedisRepository.save(RefreshToken.createRefreshToken(user.getEmail(),
                jwtTokenUtil.generateRefreshToken(user.getEmail()), JwtExpirationEnums.REFRESH_TOKEN_EXPIRATION_TIME.getValue()));
        return TokenInfo.of(accessToken, refreshToken.getRefreshToken());
    }

    public TokenInfo reissue (String refreshToken) throws RuntimeException {
        refreshToken = refreshToken.substring(7);

        // email 추출
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        String email = principal.getUsername();

        RefreshToken redisRefreshToken = refreshTokenRedisRepository.findById(email)
                .orElseThrow(() -> new UnAuthException(AuthResponseCode.TOKEN_NOT_FOUND));

        // 레디스의 리프레시 토큰와 일치하면
        if (refreshToken.equals(redisRefreshToken.getRefreshToken())){
            // 만료 기간까지 남은 시간이 없으면
            if (jwtTokenUtil.getRemainMilliSeconds(refreshToken) < JwtExpirationEnums.REFRESH_TOKEN_EXPIRATION_TIME.getValue()) {
                // 엑세스 토큰 발급
                String accessToken = jwtTokenUtil.generateAccessToken(email);
                return TokenInfo.of(accessToken,
                        refreshTokenRedisRepository.save(RefreshToken.createRefreshToken(email,
                                jwtTokenUtil.generateRefreshToken(email), JwtExpirationEnums.REFRESH_TOKEN_EXPIRATION_TIME.getValue())).getRefreshToken());
            }
            // 만료 까지 남은 시간이 있으면
            return TokenInfo.of(jwtTokenUtil.generateAccessToken(email), refreshToken);
        }
        // 토큰이 일치하지 않으면
        throw new UnAuthException(AuthResponseCode.UNAUTHORIZED);
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
                .orElseThrow(() -> new NotFoundException(ResponseCode.SUCCESS));
    }

    @Transactional(readOnly = true)
    public void checkNickname(String nickname) {
        userRepository.findByNickname(nickname)
                .orElseThrow(() -> new NotFoundException(ResponseCode.SUCCESS));
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
                .orElseThrow(() -> new UnAuthException(AuthResponseCode.ALREADY_AUTH));
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
                        .host(host)
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

}
