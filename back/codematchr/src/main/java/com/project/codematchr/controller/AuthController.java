package com.project.codematchr.controller;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.codematchr.dto.request.authentication.SignInRequestDto;
import com.project.codematchr.dto.request.authentication.SignUpRequestDto;
import com.project.codematchr.dto.response.authentication.SignInResponseDto;
import com.project.codematchr.dto.response.authentication.SignUpResponseDto;
import com.project.codematchr.service.AuthService;

import lombok.RequiredArgsConstructor;



// 인증 컨트롤러 //
@RestController
@RequestMapping("/api/v1/authentication")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    
    // API : 회원가입 메서드 //
    @PostMapping("/sign-up")
    public ResponseEntity<? super SignUpResponseDto> signUp(
        @RequestBody @Valid SignUpRequestDto requestBody
    ) {
        ResponseEntity<? super SignUpResponseDto> response = authService.signUp(requestBody);
        return response;
    }

    // API : 로그인 메서드 //
    @PostMapping("/sign-in")
    public ResponseEntity<? super SignInResponseDto> signIn(
        @RequestBody @Valid SignInRequestDto requestBody
    ) {
        ResponseEntity<? super SignInResponseDto> response = authService.signIn(requestBody);
        return response;
    }
    
}
