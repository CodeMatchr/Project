package com.project.codematchr.service;
import org.springframework.http.ResponseEntity;
import com.project.codematchr.dto.request.compare.PostCompareRequestDto;
import com.project.codematchr.dto.response.compare.GetCompareResponseDto;
import com.project.codematchr.dto.response.compare.PostCompareResponseDto;

public interface CompareService {

    ResponseEntity<? super PostCompareResponseDto> postCompare(String compareUserEmail, PostCompareRequestDto postCompareRequestDto);

    ResponseEntity<? super GetCompareResponseDto> getCompareList(String compareUserEmail);
    
}
