package com.ssafysignal.api.user.service;

import com.ssafysignal.api.auth.entity.Auth;
import com.ssafysignal.api.auth.repository.AuthRepository;
import com.ssafysignal.api.auth.repository.UserAuthRepository;
import com.ssafysignal.api.common.dto.EmailDto;
import com.ssafysignal.api.common.entity.ImageFile;
import com.ssafysignal.api.common.repository.ImageFileRepository;
import com.ssafysignal.api.common.service.EmailService;
import com.ssafysignal.api.global.exception.NotFoundException;
import com.ssafysignal.api.global.response.ResponseCode;
import com.ssafysignal.api.user.dto.request.UserInfo;
import com.ssafysignal.api.user.dto.request.RegistUserRequest;
import com.ssafysignal.api.user.entity.User;
import com.ssafysignal.api.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Optional;
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

    @Value("${server.host}")
    private String host;
    @Value("${server.port}")
    private Integer port;

    @Value("${app.fileUpload.uploadPath}")
    private String uploadPath;
    @Value("${app.fileUpload.uploadDir.userImage}")
    private String uploadDir;

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
                        .port(port)
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
    public void modifyUser(int userSeq, UserInfo userInfo) throws RuntimeException, IOException {
    	User user = userRepository.findByUserSeq(userSeq)
    			.orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND));

        user.modifyUser(userInfo.getName(), userInfo.getNickname(), userInfo.getPhone(), userInfo.getBirth());

        if(!userInfo.getProfileImageFile().isEmpty()) {
            MultipartFile uploadImage = userInfo.getProfileImageFile();
            String uploadFullPath = uploadPath + File.separator + uploadDir;

            // 디렉토리 없으면 생성
            File uploadPosition = new File(uploadFullPath);
            if (!uploadPosition.exists()) uploadPosition.mkdir();

            // 이름, 확장자, url 생성
            String fileName = uploadImage.getOriginalFilename();
            String name = UUID.randomUUID().toString();
            String type = Optional.ofNullable(fileName)
                    .filter(f -> f.contains("."))
                    .map(f -> f.substring(fileName.lastIndexOf(".") + 1))
                    .orElseThrow(() -> new NotFoundException(ResponseCode.MODIFY_NOT_FOUND));
            String url = String.format("%s%s%s.%s", uploadFullPath, File.separator, name, type);

            // 프로젝트 대표 이미지가 있는 경우
            if (user.getImageFile().getImageFileSeq() != 0) {
                File deleteFile = new File(user.getImageFile().getUrl());
                // 기존 파일 삭제
                if (deleteFile.exists()) deleteFile.delete();

                ImageFile imageFile = imageFileRepository.findById(user.getImageFile().getImageFileSeq())
                        .orElseThrow(() -> new NotFoundException(ResponseCode.MODIFY_NOT_FOUND));
                imageFile.setName(uploadImage.getOriginalFilename());
                imageFile.setSize(uploadImage.getSize());
                imageFile.setType(type);
                imageFile.setUrl(url);
                imageFileRepository.save(imageFile);
                user.setImageFileSeq(imageFile.getImageFileSeq());
            } else {
                // 이미지 Entity 생성
                ImageFile imageFile = ImageFile.builder()
                        .name(uploadImage.getOriginalFilename())
                        .size(uploadImage.getSize())
                        .type(type)
                        .url(url)
                        .build();
                imageFileRepository.save(imageFile);
                System.out.println("새이미지 넣기완료");
                user.setImageFileSeq(imageFile.getImageFileSeq());
            }

            // 이미지 저장
            File saveFile = new File(url);
            uploadImage.transferTo(saveFile);

        }
        userRepository.save(user);
    	
    }

}
