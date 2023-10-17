package com.project.codematchr.dto.response.compare;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.project.codematchr.common.response.ResponseCode;
import com.project.codematchr.common.response.ResponseMessage;
import com.project.codematchr.dto.response.ResponseDto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class GetCompareResponseDto extends ResponseDto {

    private List<CompareListResponseDto> compareList;

    private GetCompareResponseDto(String code, String message, List<CompareListResponseDto> compareList) {
        super(code, message);
        this.compareList = compareList;
    }

    public static ResponseEntity<GetCompareResponseDto> success(List<CompareListResponseDto> compareList) {
        GetCompareResponseDto result = new GetCompareResponseDto(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, compareList);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    
    
}
