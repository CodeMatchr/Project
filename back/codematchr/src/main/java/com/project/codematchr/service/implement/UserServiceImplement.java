package com.project.codematchr.service.implement;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.project.codematchr.dto.request.user.PatchUserProfileImageUrlRequestDto;
import com.project.codematchr.dto.request.user.PatchUserStateMessageRequestDto;
import com.project.codematchr.dto.request.user.PatchUserNicknameRequestDto;
import com.project.codematchr.dto.request.user.PatchUserPasswordRequestDto;
import com.project.codematchr.dto.response.ResponseDto;
import com.project.codematchr.dto.response.user.GetSignInUserResponseDto;
import com.project.codematchr.dto.response.user.GetUserResponseDto;
import com.project.codematchr.dto.response.user.PatchUserNicknameResponseDto;
import com.project.codematchr.dto.response.user.PatchUserPasswordResponseDto;
import com.project.codematchr.dto.response.user.PatchUserProfileImageUrlResponseDto;
import com.project.codematchr.dto.response.user.PatchUserStateMessageResponseDto;
import com.project.codematchr.entity.UserEntity;
import com.project.codematchr.repository.UserRepository;
import com.project.codematchr.service.UserService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImplement implements UserService {

    private final UserRepository userRepository;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public ResponseEntity<? super GetSignInUserResponseDto> getSignInUser(String userEmail) {

        UserEntity userEntity = null;

        try {
    
            userEntity = userRepository.findByUserEmail(userEmail);

            if(userEntity == null) return GetSignInUserResponseDto.noExistedUer();


        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetSignInUserResponseDto.success(userEntity);

    }

    @Override
    public ResponseEntity<? super GetUserResponseDto> getUser(String userEmail) {
        UserEntity userEntity = null;

        try {
    
            userEntity = userRepository.findByUserEmail(userEmail);

            if(userEntity == null) return GetUserResponseDto.noExistedUser();
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetUserResponseDto.success(userEntity);

    }

    @Override
    public ResponseEntity<? super PatchUserNicknameResponseDto> patchUserNickname(String userEmail, PatchUserNicknameRequestDto patchUserNicknameRequestDto) {

        String userNickname = patchUserNicknameRequestDto.getUserNickname();

        try {
    
            UserEntity userEntity = userRepository.findByUserEmail(userEmail);
            if(userEntity == null) return PatchUserNicknameResponseDto.noExistedUserEmail();

    
            boolean existedUserNickname = userRepository.existsByUserNickname(userNickname);
            if(existedUserNickname) return PatchUserNicknameResponseDto.existedUserNickname();

    
            userEntity.setUserNickname(userNickname);

    
            userRepository.save(userEntity);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return PatchUserNicknameResponseDto.success();

    }

    @Override
    public ResponseEntity<? super PatchUserStateMessageResponseDto> patchUserStateMessage(String userEmail, PatchUserStateMessageRequestDto patchStateMessageRequestDto) {

        String userStateMessage = patchStateMessageRequestDto.getUserStateMessage();

        try {
    
            UserEntity userEntity = userRepository.findByUserEmail(userEmail);

            if(userEntity == null) return PatchUserStateMessageResponseDto.noExistedUserEmail();

            userEntity.setUserStateMessage(userStateMessage);
    
            userRepository.save(userEntity);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        
        return PatchUserStateMessageResponseDto.success();

    }

    @Override
    public ResponseEntity<? super PatchUserProfileImageUrlResponseDto> patchUserProfileImageUrl(String userEmail, PatchUserProfileImageUrlRequestDto patchUserProfileImageUrlRequestDto) {

        String userProfileImageUrl = patchUserProfileImageUrlRequestDto.getUserProfileImageUrl();

        try {
    
            UserEntity userEntity = userRepository.findByUserEmail(userEmail);

            if(userEntity == null) return PatchUserProfileImageUrlResponseDto.noExistedUserEmail();

            userEntity.setUserProfileImageUrl(userProfileImageUrl);

            userRepository.save(userEntity);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return PatchUserProfileImageUrlResponseDto.success();

    }

    @Override
    public ResponseEntity<? super PatchUserPasswordResponseDto> patchUserPassword(String userEmail,PatchUserPasswordRequestDto patchUserPasswordRequestDto) {
        
        String userPassword = patchUserPasswordRequestDto.getUserPassword();

        try {
    
            UserEntity userEntity = userRepository.findByUserEmail(userEmail);

            if(userEntity == null) return PatchUserPasswordResponseDto.noExistedUserEmail();

            String prePassword = userEntity.getUserPassword();

            boolean existedUserPassword = passwordEncoder.matches(userPassword, prePassword);

            if(existedUserPassword) return PatchUserPasswordResponseDto.existedUserPassword();
    
            String encodedPassword = passwordEncoder.encode(userPassword);

            userEntity.setUserPassword(encodedPassword);

            userRepository.save(userEntity);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return PatchUserPasswordResponseDto.success();

    }

}
