package com.project.codematchr.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.codematchr.dto.request.authentication.SignInRequestDto;
import com.project.codematchr.dto.request.authentication.SignUpRequestDto;
import com.project.codematchr.dto.response.ResponseDto;
import com.project.codematchr.dto.response.authentication.SignInResponseDto;
import com.project.codematchr.dto.response.authentication.SignUpResponseDto;
import com.project.codematchr.entity.UserEntity;
import com.project.codematchr.repository.UserRepository;
import com.project.codematchr.service.AuthService;
import com.project.codematchr.provider.JwtProvider;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImplement implements AuthService {

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

   private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


    @Override
    // method : 로그인 //
    public ResponseEntity<? super SignInResponseDto> signIn(SignInRequestDto dto){
       String token = null;

       String userEmail = dto.getUserEmail();
       String userPassword = dto.getUserPassword();

       try {
        //description : 이메일로 entity 조회 //
        UserEntity userEntity = userRepository.findByUserEmail(userEmail);
        
        // description: 존재하지 않는 email 확인 //
         if (userEntity == null) return SignInResponseDto.signInDataMismatch();
         // description: 비밀번호 일치여부 확인 //
         String encodePassword = userEntity.getUserPassword();
         boolean equalPassword = passwordEncoder.matches(userPassword, encodePassword);
         if (!equalPassword) return SignInResponseDto.signInDataMismatch();

         // description : JWT 생성 //
         token = jwtProvider.create(userEmail);
        
       } catch (Exception exception) {
        exception.printStackTrace();
        return ResponseDto.databaseError();
       }

       return SignInResponseDto.success(token);
    }

    @Override
    // method : 회원가입 메서드 //
    public ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto) {

      String userEmail = dto.getUserEmail();
      String userPassword = dto.getUserPassword();
      String userNickname = dto.getUserNickname();
      String userTelnumber = dto.getUserTelnumber();

      try {
      // description :  이메일 중복 확인 //
      boolean hasUserEmail = userRepository.existsById(userEmail);
      if(hasUserEmail) return SignUpResponseDto.existedUserEmail();

      // description : 닉네임 중복확인 //
      boolean hasNickname = userRepository.existsByUserNickname(userNickname);
      if(hasNickname) return SignUpResponseDto.existedUserNickname();

      // description : 전화번호 중복 확인 //
      boolean hasTelNumber = userRepository.existsByUserTelnumber(userTelnumber);
      if(hasTelNumber) return SignUpResponseDto.existedUserTelnumber();

       // description: 비밀번호 암호화 //
       userPassword = passwordEncoder.encode(userPassword);

       // description: dto의 password 변경 //
       dto.setUserPassword(userPassword);

       // description : Entity 생성 //
       UserEntity userEntity = new UserEntity(dto);

       // description : 데이터 베이스 저장 //
       userRepository.save(userEntity);

    } catch (Exception exception) {
       // description : 데이터베이스 에러 //
       exception.printStackTrace();
       return ResponseDto.databaseError();
    }
    return SignUpResponseDto.success();
      
    }
}
