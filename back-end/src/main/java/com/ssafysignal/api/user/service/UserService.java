package com.ssafysignal.api.user.service;

import com.ssafysignal.api.auth.entity.Auth;
import com.ssafysignal.api.auth.repository.AuthRepository;
import com.ssafysignal.api.auth.repository.UserAuthRepository;
import com.ssafysignal.api.common.dto.EmailDto;
import com.ssafysignal.api.common.entity.ImageFile;
import com.ssafysignal.api.common.repository.ImageFileRepository;
import com.ssafysignal.api.common.service.EmailService;
import com.ssafysignal.api.common.service.FileService;
import com.ssafysignal.api.global.exception.NotFoundException;
import com.ssafysignal.api.global.response.ResponseCode;
import com.ssafysignal.api.user.dto.request.ModifyUserRequest;
import com.ssafysignal.api.user.dto.request.RegistUserRequest;
import com.ssafysignal.api.user.entity.User;
import com.ssafysignal.api.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.LocalDateTime;
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
    private final ImageFileRepository imageFileRepository;
    private final FileService fileService;

    @Value("${server.host}")
    private String host;
    @Value("${app.fileUpload.uploadPath.userImage}")
    private String imageUploadPath;
    @Value("${app.fileUpload.uploadPath}")
    private String uploadPath;

    @Transactional(readOnly = true)
    public User findUser(final int userSeq) {
        return userRepository.findByUserSeq(userSeq)
                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));
    }
    
    @Transactional
    public void registUser(RegistUserRequest registUserRequest) throws Exception {
        String authCode = UUID.randomUUID().toString();

        // 비밀번호 암호화
        String passwordEncode = passwordEncoder.encode(registUserRequest.getPassword());

        if (passwordEncoder.matches(registUserRequest.getPassword(), passwordEncode)) System.out.println(true);

        // 데이터베이스 저장
        User user = userRepository.save(User.builder()
                        .name(registUserRequest.getName())
                        .email(registUserRequest.getEmail())
                        .password(passwordEncode)
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
                        .title("Signal 회원 가입 - 이메일 인증")
                        .content("아래 버튼을 클릭하여 이메일을 인증해주세요.")
                        .text("이메일 인증")
                        .host(host)
                        .url(String.format("/api/auth/emailauth/%s", authCode))
                        .build());
    }
    
    @Transactional
    public void deleteUser(int userSeq) throws RuntimeException {
        User user = userRepository.findByUserSeq(userSeq)
                        .orElseThrow(() -> new NotFoundException(ResponseCode.DELETE_NOT_FOUND));
        userAuthRepository.deleteByUser(user);
    }
    
    @Transactional
    public void modifyUser(int userSeq, ModifyUserRequest modifyUserRequest) throws RuntimeException, IOException {
    	User user = userRepository.findByUserSeq(userSeq)
    			.orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));

        if(modifyUserRequest.getProfileImageFile() != null) {
            // 이미지 파일 업로드
            ImageFile imageFile = fileService.registImageFile(modifyUserRequest.getProfileImageFile(), imageUploadPath);
            // 이미 존재하는 이미지가 있으면 삭제
            if (user.getImageFile().getImageFileSeq() != 0) {
                // 물리 사진 파일 삭제
                fileService.deleteImageFile(uploadPath + user.getImageFile().getUrl());
                user.getImageFile().setType(imageFile.getType());
                user.getImageFile().setUrl(imageFile.getUrl());
                user.getImageFile().setName(imageFile.getName());
                user.getImageFile().setSize(imageFile.getSize());
                user.getImageFile().setRegDt(LocalDateTime.now());
            } else {
                ImageFile newImageFile = ImageFile.builder()
                        .name(imageFile.getName())
                        .size(imageFile.getSize())
                        .url(imageFile.getUrl())
                        .type(imageFile.getType())
                        .build();
                imageFileRepository.save(newImageFile);
                user.setUserImageFileSeq(newImageFile.getImageFileSeq());
            }
        }
        user.setNickname(modifyUserRequest.getNickname());
        user.setPhone(modifyUserRequest.getPhone());
        userRepository.save(user);
    }

    @Transactional
    public void modifyPassword(int userSeq, String password, String newPassword){
        User user = userRepository.findByUserSeq(userSeq)
                .orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));

        if (!passwordEncoder.matches(password, user.getPassword())){
            throw new NotFoundException(ResponseCode.UNAUTHORIZED);
        }
        // 비밀번호 암호화
        String passwordEncode = passwordEncoder.encode(newPassword);
        user.setPassword(passwordEncode);
        userRepository.save(user);
    }

}
