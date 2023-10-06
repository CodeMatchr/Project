package com.project.codematchr.service;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface FileService {
    
    // method : 파일 업로드 메서드 //
    String upload(MultipartFile file);

    // method : 파일 업로드 이미지 불러오기 메소드 //
    Resource getFile(String fileName);

    // 코딩 관련 파일 (텍스트 변환) 업로드 메서드 //

}
