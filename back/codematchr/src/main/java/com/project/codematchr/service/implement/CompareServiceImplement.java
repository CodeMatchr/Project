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

    @Override
    public ResponseEntity<? super PostCompareResponseDto> postCompare(String compareUserEmail, PostCompareRequestDto postCompareRequestDto) {

        try {
            
            UserEntity existsByUserEmail = userRepository.findByUserEmail(compareUserEmail);

            if(existsByUserEmail == null) return PostCompareResponseDto.noExistedUserEmail();
            
            CompareEntity compareEntity = new CompareEntity(compareUserEmail, postCompareRequestDto);
            
            compareRepository.save(compareEntity);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return PostCompareResponseDto.success();
        
    }
    
    @Override
    public ResponseEntity<? super GetCompareResponseDto> getCompareList(String compareUserEmail) {

        List<CompareListResponseDto> compareList = null;

        try {
            
            List<CompareEntity> compareEntities = compareRepository.findByCompareUserEmailOrderByCompareDatetime(compareUserEmail);
            
            compareList = CompareListResponseDto.copyCompareList(compareEntities);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetCompareResponseDto.success(compareList);

    }

}
