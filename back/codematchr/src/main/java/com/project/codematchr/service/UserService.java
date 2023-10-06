package com.project.codematchr.service;

import org.springframework.http.ResponseEntity;

import com.project.codematchr.dto.request.user.PatchUserProfileImageUrlRequestDto;
import com.project.codematchr.dto.request.user.PatchUserNicknameRequestDto;
import com.project.codematchr.dto.request.user.PatchUserPasswordRequestDto;
import com.project.codematchr.dto.response.user.GetSignInUserResponseDto;
import com.project.codematchr.dto.response.user.GetUserResponseDto;
import com.project.codematchr.dto.response.user.PatchUserNicknameResponseDto;
import com.project.codematchr.dto.response.user.PatchUserPasswordResponseDto;
import com.project.codematchr.dto.response.user.PatchUserProfileImageUrlResponseDto;

public interface UserService {
    // Method : 로그인 사용자 정보 불러오기 메서드 //
    ResponseEntity<? super GetSignInUserResponseDto> getSignInUser(String userEmail);

    // Method : 사용자 정보 불러오기 메서드 //
    ResponseEntity<? super GetUserResponseDto> getUser(String userEmail);

    // Method : 사용자 닉네임 변경 메서드 //
    ResponseEntity<? super PatchUserNicknameResponseDto> patchUserNickname(String userEmail, PatchUserNicknameRequestDto patchUserNicknameRequestDto);

    // Method : 사용자 비밀번호 변경 메서드 //
    ResponseEntity<? super PatchUserPasswordResponseDto> patchUserPassword(String userEmail, PatchUserPasswordRequestDto patchUserPasswordRequestDto);

    // Method : 사용자 프로필 이미지 Url 변경 메서드 //
    ResponseEntity<? super PatchUserProfileImageUrlResponseDto> patchUserProfileImageUrl(String userEmail, PatchUserProfileImageUrlRequestDto patchUserProfileImageUrlRequestDto);

}
