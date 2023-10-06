package com.project.codematchr.service.implement;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.project.codematchr.dto.request.compare.PostCompareRequestDto;
import com.project.codematchr.dto.response.ResponseDto;
import com.project.codematchr.dto.response.compare.CompareListResponseDto;
import com.project.codematchr.dto.response.compare.GetCompareResponseDto;
import com.project.codematchr.dto.response.compare.PostCompareResponseDto;
import com.project.codematchr.entity.CompareEntity;
import com.project.codematchr.entity.UserEntity;
import com.project.codematchr.repository.CompareRepository;
import com.project.codematchr.repository.UserRepository;
import com.project.codematchr.service.CompareService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CompareServiceImplement implements CompareService {

    private final UserRepository userRepository;
    private final CompareRepository compareRepository;

    // 비교 분석 결과 저장 //
    @Override
    public ResponseEntity<? super PostCompareResponseDto> postCompare(String compareUserEmail, PostCompareRequestDto postCompareRequestDto) {


        try {
            // 존재하는 사용자 이메일 확인
            UserEntity existsByUserEmail = userRepository.findByUserEmail(compareUserEmail);
            if(existsByUserEmail == null) return PostCompareResponseDto.noExistedUserEmail();

            // Entity 생성
            CompareEntity compareEntity = new CompareEntity(compareUserEmail, postCompareRequestDto);

            // 데이터베이스 저장
            compareRepository.save(compareEntity);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }


        return PostCompareResponseDto.success();

        
    }

    // 특정 사용자의 비교 분석 결과 조회 //
    @Override
    public ResponseEntity<? super GetCompareResponseDto> getCompareList(String compareUserEmail) {

        List<CompareListResponseDto> compareList = null;

        try {
            // 특정 사용자 이메일에 하당하는 비교 분석 결과 조회 //
            List<CompareEntity> compareEntities = compareRepository.findByCompareUserEmailOrderByCompareDatetime(compareUserEmail);

            // entity 를 dto 로 변환 //
            compareList = CompareListResponseDto.copyCompareList(compareEntities);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetCompareResponseDto.success(compareList);
    }

    
}
