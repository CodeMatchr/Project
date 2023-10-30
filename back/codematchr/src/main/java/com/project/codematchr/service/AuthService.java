package com.project.codematchr.service;
import org.springframework.http.ResponseEntity;
import com.project.codematchr.dto.request.authentication.SignInRequestDto;
import com.project.codematchr.dto.request.authentication.SignUpRequestDto;
import com.project.codematchr.dto.response.authentication.SignInResponseDto;
import com.project.codematchr.dto.response.authentication.SignUpResponseDto;

public interface AuthService {
    
  ResponseEntity<? super SignInResponseDto> signIn(SignInRequestDto dto);
  
  ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto);
    
}
