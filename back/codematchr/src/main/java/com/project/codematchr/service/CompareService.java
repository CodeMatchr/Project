package com.project.codematchr.service;

import org.springframework.http.ResponseEntity;

import com.project.codematchr.dto.request.compare.PostCompareRequestDto;
import com.project.codematchr.dto.response.compare.GetCompareResponseDto;
import com.project.codematchr.dto.response.compare.PostCompareResponseDto;

public interface CompareService {
    // Method : 비교 분석 결과 저장 메서드 //
    ResponseEntity<? super PostCompareResponseDto> postCompare(String compareUserEmail, PostCompareRequestDto postCompareRequestDto);

    // Method : 특정 사용자의 비교 분석 결과 조회 메서드 //
    ResponseEntity<? super GetCompareResponseDto> getCompareList(String compareUserEmail);
}
