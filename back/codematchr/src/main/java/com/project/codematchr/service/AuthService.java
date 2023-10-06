package com.project.codematchr.service;

import org.springframework.http.ResponseEntity;

import com.project.codematchr.dto.request.authentication.SignInRequestDto;
import com.project.codematchr.dto.request.authentication.SignUpRequestDto;
import com.project.codematchr.dto.response.authentication.SignInResponseDto;
import com.project.codematchr.dto.response.authentication.SignUpResponseDto;

public interface AuthService {
    
  // method : 로그인 메서드 //
  ResponseEntity<? super SignInResponseDto> signIn(SignInRequestDto dto);
  
  // method : 회원가입 메서드 //
  ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto);
    
}
