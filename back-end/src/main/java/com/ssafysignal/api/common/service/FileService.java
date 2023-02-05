package com.ssafysignal.api.common.service;

import com.ssafysignal.api.common.entity.ImageFile;
import com.ssafysignal.api.common.repository.ImageFileRepository;
import com.ssafysignal.api.global.exception.NotFoundException;
import com.ssafysignal.api.global.response.ResponseCode;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileService {

    private final ImageFileRepository imageFileRepository;

    @Value("${server.host}")
    private String host;
    @Value("${server.port}")
    private Integer port;
    @Value("${app.fileUpload.uploadPath}")
    private String uploadPath;
    @Value("${app.fileUpload.uploadDir.userImage}")
    private String uploadDir;
    @Value("{app.fileUpload.referancePath}")
    private String referancePath;

    public void deleteImageFile(String url) throws IOException {
        File deleteFile = new File(url);
        if (deleteFile.exists()) deleteFile.delete();
    }


    public Integer registImageFile(MultipartFile uploadImage) throws IOException {
        String uploadFullPath = uploadPath + File.separator + uploadDir;

        File uploadPosition = new File(uploadFullPath);
        if (!uploadPosition.exists()) uploadPosition.mkdir();
        String fileName = uploadImage.getOriginalFilename();
        String name = UUID.randomUUID().toString();
        String type = Optional.ofNullable(fileName)
                .filter(f -> f.contains("."))
                .map(f -> f.substring(fileName.lastIndexOf(".") + 1))
                .orElseThrow(() -> new NotFoundException(ResponseCode.MODIFY_NOT_FOUND));
        String url = String.format("%s%s%s.%s", referancePath, File.separator, name, type);

        // 이미지 저장
        File saveFile = new File(uploadFullPath);
        uploadImage.transferTo(saveFile);

        ImageFile imageFile = ImageFile.builder()
                .name(uploadImage.getOriginalFilename())
                .size(uploadImage.getSize())
                .type(type)
                .url(url)
                .build();
        imageFileRepository.save(imageFile);
        return imageFile.getImageFileSeq();
    }

}
