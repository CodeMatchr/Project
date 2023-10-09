package com.project.codematchr.controller;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.codematchr.dto.request.user.PatchUserProfileImageUrlRequestDto;
import com.project.codematchr.dto.request.user.PatchUserNicknameRequestDto;
import com.project.codematchr.dto.request.user.PatchUserPasswordRequestDto;
import com.project.codematchr.dto.response.user.GetSignInUserResponseDto;
import com.project.codematchr.dto.response.user.GetUserResponseDto;
import com.project.codematchr.dto.response.user.PatchUserNicknameResponseDto;
import com.project.codematchr.dto.response.user.PatchUserPasswordResponseDto;
import com.project.codematchr.dto.response.user.PatchUserProfileImageUrlResponseDto;
import com.project.codematchr.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // API : 로그인 사용자 정보 불러오기 메서드 //
    @GetMapping("")
    public ResponseEntity<? super GetSignInUserResponseDto> getSignInUser(@AuthenticationPrincipal String userEmail) {
        ResponseEntity<? super GetSignInUserResponseDto> responseEntity = userService.getSignInUser(userEmail);
        return responseEntity;
    }
    
    // API : 사용자 정보 불러오기 메서드 //
    @GetMapping("/{userEmail}")
    public ResponseEntity<? super GetUserResponseDto> getUser(@PathVariable(value="userEmail", required=true) String userEmail) {
        ResponseEntity<? super GetUserResponseDto> responseEntity = userService.getUser(userEmail);
        return responseEntity;
    }

    // API : 사용자 닉네임 수정 메서드 //
    @PatchMapping("/{userEmail}/nickname")
    public ResponseEntity<? super PatchUserNicknameResponseDto> patchUserNickname(@AuthenticationPrincipal String userEmail, @RequestBody @Valid PatchUserNicknameRequestDto patchUserNicknameRequestDto) {
        ResponseEntity<? super PatchUserNicknameResponseDto> responseEntity = userService.patchUserNickname(userEmail, patchUserNicknameRequestDto);
        return responseEntity;
    }
    
    // API : 사용자 비밀번호 수정 메서드 //
    @PatchMapping("/{userEmail}/password")
    public ResponseEntity<? super PatchUserPasswordResponseDto> patchUserPassword(@AuthenticationPrincipal String userEmail, @RequestBody @Valid PatchUserPasswordRequestDto patchUserPasswordRequestDto) {
        ResponseEntity<? super PatchUserPasswordResponseDto> responseEntity = userService.patchUserPassword(userEmail, patchUserPasswordRequestDto);
        return responseEntity;
    }

    // API : 사용자 프로필 이미지 수정 메서드 //
    @PatchMapping("/{userEmail}/profile")
    public ResponseEntity<? super PatchUserProfileImageUrlResponseDto> patchUserProfileImage(@AuthenticationPrincipal String userEmail, @RequestBody @Valid PatchUserProfileImageUrlRequestDto patchUserProfileImageUrlRequestDto) {
        ResponseEntity<? super PatchUserProfileImageUrlResponseDto> responseEntity = userService.patchUserProfileImageUrl(userEmail, patchUserProfileImageUrlRequestDto);
        return responseEntity;
    }

}