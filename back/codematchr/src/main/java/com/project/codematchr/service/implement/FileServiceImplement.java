package com.project.codematchr.service.implement;

import java.io.File;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.project.codematchr.service.FileService;

@Service
public class FileServiceImplement implements FileService {

    @Value("${file.path}") private String filePath;
    @Value("${file.url}") private String fileUrl;

    // 파일 업로드 //
    @Override
    public String upload(MultipartFile file) {

        // 빈 파일인지 확인 //
        if(file.isEmpty()) return null;

        // 원본 파일명 불러오기 //
        String originalFileName = file.getOriginalFilename();

        // 확장자명 구하기 //
        String extenstion = originalFileName.substring(originalFileName.lastIndexOf("."));

        // UUID 형식의 임의의 파일명 생성 //
        String uuid = UUID.randomUUID().toString();
        String saveFileName = uuid + extenstion;

        // 파일 저장 경로 지정 //
        String savePath = filePath + saveFileName;

        try {
            // 파일 업로드 저장
            file.transferTo(new File(savePath));    
        } catch (Exception exception) {
            exception.printStackTrace();
            return null;
        }

        // 파일을 불러올 수 있는 경로를 반환 //
        String url = fileUrl + saveFileName;
        return url;
    }

    // 파일 업로드 이미지 불러오기 //
    @Override
    public Resource getFile(String fileName) {
        Resource resource = null;

        try {
            // 파일 저장 경로에서 파일명에 해당하는 파일 불러오기 //
            resource = new UrlResource("file:" + filePath + fileName);
        } catch (Exception exception) {
            exception.printStackTrace();
            return null;
        }

        return resource;
    }
    
}
