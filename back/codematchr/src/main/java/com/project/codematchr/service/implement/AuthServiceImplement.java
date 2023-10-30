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
   public ResponseEntity<? super SignInResponseDto> signIn(SignInRequestDto dto){

      String token = null;

      String userEmail = dto.getUserEmail();
      String userPassword = dto.getUserPassword();

      try {

         UserEntity userEntity = userRepository.findByUserEmail(userEmail);
      
         if (userEntity == null) return SignInResponseDto.signInFail();
         

         String encodePassword = userEntity.getUserPassword();
         boolean equalPassword = passwordEncoder.matches(userPassword, encodePassword);
         if (!equalPassword) return SignInResponseDto.signInFail();


         token = jwtProvider.create(userEmail);
        
      } catch (Exception exception) {
         exception.printStackTrace();
         return ResponseDto.databaseError();
      }

         return SignInResponseDto.success(token);

    }

    @Override
    public ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto) {

      String userEmail = dto.getUserEmail();
      String userPassword = dto.getUserPassword();
      String userNickname = dto.getUserNickname();
      String userTelnumber = dto.getUserTelnumber();

      try {
      boolean hasUserEmail = userRepository.existsById(userEmail);
      if(hasUserEmail) return SignUpResponseDto.existedUserEmail();

      boolean hasNickname = userRepository.existsByUserNickname(userNickname);
      if(hasNickname) return SignUpResponseDto.existedUserNickname();

      boolean hasTelNumber = userRepository.existsByUserTelnumber(userTelnumber);
      if(hasTelNumber) return SignUpResponseDto.existedUserTelnumber();

      userPassword = passwordEncoder.encode(userPassword);

      dto.setUserPassword(userPassword);

      UserEntity userEntity = new UserEntity(dto);

      userRepository.save(userEntity);

      } catch (Exception exception) {

         exception.printStackTrace();
         return ResponseDto.databaseError();
      }

      return SignUpResponseDto.success();
      
   }
   
}
