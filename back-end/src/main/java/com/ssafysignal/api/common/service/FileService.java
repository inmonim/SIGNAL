package com.ssafysignal.api.common.service;

import com.ssafysignal.api.common.dto.FileDto;
import com.ssafysignal.api.common.entity.ImageFile;
import com.ssafysignal.api.common.entity.ProjectFile;
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
    @Value("${app.fileUpload.uploadPath}")
    private String uploadPath;
    @Value("${app.fileUpload.referancePath}")
    private String referancePath;

    public void deleteImageFile(String url) {
        File deleteFile = new File(url);
        if (deleteFile.exists()) deleteFile.delete();
    }

    public ImageFile registImageFile(MultipartFile uploadImage, String uploadDir) throws IOException {
        FileDto fileDto = uploadFile(uploadImage, uploadDir);
        return ImageFile.builder()
                .name(fileDto.getOriginalName())
                .size(fileDto.getSize())
                .type(fileDto.getType())
                .url(fileDto.getUrl())
                .build();
    }

    public ProjectFile registFile(MultipartFile uploadFile, String uploadDir) throws IOException {
        FileDto fileDto = uploadFile(uploadFile, uploadDir);
        return ProjectFile.builder()
                .name(fileDto.getOriginalName())
                .size(fileDto.getSize())
                .type(fileDto.getType())
                .url(fileDto.getUrl())
                .build();
    }
    public FileDto uploadFile(MultipartFile uploadFile, String uploadDir) throws IOException {
        File uploadPosition = new File(uploadPath + referancePath + File.separator + uploadDir);
        if (!uploadPosition.exists()) uploadPosition.mkdir();

        String fileName = uploadFile.getOriginalFilename();
        String name = UUID.randomUUID().toString();
        String type = Optional.ofNullable(fileName)
                .filter(f -> f.contains("."))
                .map(f -> f.substring(fileName.lastIndexOf(".") + 1))
                .orElseThrow(() -> new NotFoundException(ResponseCode.MODIFY_NOT_FOUND));

        String uploadUrl = String.format("%s%s%s%s%s.%s", uploadPath + referancePath, File.separator, uploadDir, File.separator, name, type);
        String url = String.format("%s%s%s%s%s.%s", referancePath, File.separator, uploadDir, File.separator, name, type);

        System.out.println("uploadUrl = " + uploadUrl);
        System.out.println("url = " + url);

        // 이미지 저장
        File saveFile = new File(uploadUrl);
        uploadFile.transferTo(saveFile);

        return FileDto.builder()
                .originalName(uploadFile.getOriginalFilename())
                .size(uploadFile.getSize())
                .type(type)
                .name(name)
                .url(url)
                .build();
    }
}
