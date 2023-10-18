package com.project.codematchr.service.implement;

import java.util.List;

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
import com.project.codematchr.dto.response.user.GetUserBoardListResponseDto;
import com.project.codematchr.dto.response.user.GetUserResponseDto;
import com.project.codematchr.dto.response.user.GetUserRoomListResponseDto;
import com.project.codematchr.dto.response.user.PatchUserNicknameResponseDto;
import com.project.codematchr.dto.response.user.PatchUserPasswordResponseDto;
import com.project.codematchr.dto.response.user.PatchUserProfileImageUrlResponseDto;
import com.project.codematchr.dto.response.user.PatchUserStateMessageResponseDto;
import com.project.codematchr.dto.response.user.UserBoardListResponseDto;
import com.project.codematchr.dto.response.user.UserRoomListResponseDto;
import com.project.codematchr.entity.BoardViewEntity;
import com.project.codematchr.entity.RoomViewEntity;
import com.project.codematchr.entity.UserEntity;
import com.project.codematchr.repository.BoardViewRepository;
import com.project.codematchr.repository.RoomViewRepository;
import com.project.codematchr.repository.UserRepository;
import com.project.codematchr.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImplement implements UserService {

    // 사용자 데이터베이스(final)
    private final UserRepository userRepository;

    private final BoardViewRepository boardViewRepository;
    private final RoomViewRepository roomViewRepository;
    
    // 사용자 패스워드 암호화(final)
    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // 로그인 사용자 정보 조회
    @Override
    public ResponseEntity<? super GetSignInUserResponseDto> getSignInUser(String userEmail) {
        UserEntity userEntity = null;

        try {
            // 존재하는 사용자 이메일 확인
            userEntity = userRepository.findByUserEmail(userEmail);
            if(userEntity == null) return GetSignInUserResponseDto.noExistedUer();

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetSignInUserResponseDto.success(userEntity);
    }

    // 사용자 정보 조회
    @Override
    public ResponseEntity<? super GetUserResponseDto> getUser(String userEmail) {
        UserEntity userEntity = null;

        try {
            // 존재하는 사용자 이메일 확인
            userEntity = userRepository.findByUserEmail(userEmail);
            if(userEntity == null) return GetUserResponseDto.noExistedUser();
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetUserResponseDto.success(userEntity);
    }

    // 사용자 닉네임 수정
    @Override
    public ResponseEntity<? super PatchUserNicknameResponseDto> patchUserNickname(String userEmail, PatchUserNicknameRequestDto patchUserNicknameRequestDto) {
        String userNickname = patchUserNicknameRequestDto.getUserNickname();

        try {
            // 존재하는 사용자 이메일 확인
            UserEntity userEntity = userRepository.findByUserEmail(userEmail);
            if(userEntity == null) return PatchUserNicknameResponseDto.noExistedUserEmail();

            // 존재하는 사용자 닉네임 확인(중복)
            boolean existedUserNickname = userRepository.existsByUserNickname(userNickname);
            if(existedUserNickname) return PatchUserNicknameResponseDto.existedUserNickname();

            // 사용자 닉네임 수정
            userEntity.setUserNickname(userNickname);

            // 사용자 닉네임 수정사항 데이터베이스 저장
            userRepository.save(userEntity);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return PatchUserNicknameResponseDto.success();
    }

    // 사용자 상태 메세지 수정
    @Override
    public ResponseEntity<? super PatchUserStateMessageResponseDto> patchUserStateMessage(String userEmail, PatchUserStateMessageRequestDto patchStateMessageRequestDto) {

        String userStateMessage = patchStateMessageRequestDto.getUserStateMessage();

        try {
            // 존재하는 사용자 이메일 확인
            UserEntity userEntity = userRepository.findByUserEmail(userEmail);
            if(userEntity == null) return PatchUserStateMessageResponseDto.noExistedUserEmail();

            // 상태메세지 수정
            userEntity.setUserStateMessage(userStateMessage);

            // 상태메세지 수정 데이터베이스 저장
            userRepository.save(userEntity);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return PatchUserStateMessageResponseDto.success();

    }

    // 사용자 프로필 이미지 Url 수정
    @Override
    public ResponseEntity<? super PatchUserProfileImageUrlResponseDto> patchUserProfileImageUrl(String userEmail, PatchUserProfileImageUrlRequestDto patchUserProfileImageUrlRequestDto) {
        String userProfileImageUrl = patchUserProfileImageUrlRequestDto.getUserProfileImageUrl();

        try {
            // 존재하는 사용자 이메일 확인
            UserEntity userEntity = userRepository.findByUserEmail(userEmail);
            if(userEntity == null) return PatchUserProfileImageUrlResponseDto.noExistedUserEmail();

            // 사용자 프로필 이미지 Url 수정
            userEntity.setUserProfileImageUrl(userProfileImageUrl);

            // 사용자 프로필 이미지 Url 수정사항 데이터베이스 저장
            userRepository.save(userEntity);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return PatchUserProfileImageUrlResponseDto.success();
    }

    // 사용자 비밀번호 수정
    @Override
    public ResponseEntity<? super PatchUserPasswordResponseDto> patchUserPassword(String userEmail,PatchUserPasswordRequestDto patchUserPasswordRequestDto) {
        String userPassword = patchUserPasswordRequestDto.getUserPassword();

        try {
            // 존재하는 사용자 이메일 확인
            UserEntity userEntity = userRepository.findByUserEmail(userEmail);
            if(userEntity == null) return PatchUserPasswordResponseDto.noExistedUserEmail();

            
            // 이미 설정되어 있는 비밀번호 확인
            String prePassword = userEntity.getUserPassword();
            boolean existedUserPassword = passwordEncoder.matches(userPassword, prePassword);
            if(existedUserPassword) return PatchUserPasswordResponseDto.existedUserPassword();

            // 사용자 비밀번호 수정
            String encodedPassword = passwordEncoder.encode(userPassword);
            userEntity.setUserPassword(encodedPassword);

            // 사용자 비밀번호 수정사항 데이터베이스 저장
            userRepository.save(userEntity);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return PatchUserPasswordResponseDto.success();
    }

    // 유저페이지 게시물 리스트 불러오기
    @Override
    public ResponseEntity<? super GetUserBoardListResponseDto> getUserBoardList(String userEmail) {

        List<UserBoardListResponseDto> boardList;

        try {
            List<BoardViewEntity> boardViewEntities = boardViewRepository.findByWriterEmailOrderByWriteDatetimeDesc(userEmail);
            
            boardList = UserBoardListResponseDto.copyUserBoardList(boardViewEntities);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GetUserBoardListResponseDto.success(boardList);
    }
    
    // 유저페이지 채팅방 리스트 불러오기
    @Override
    public ResponseEntity<? super GetUserRoomListResponseDto> getUserRoomList(String userEmail) {

        List<UserRoomListResponseDto> roomList;

        try {
            List<RoomViewEntity> roomViewEntities = roomViewRepository.findByUserEmail(userEmail);
            
            roomList = UserRoomListResponseDto.copyUserRoomList(roomViewEntities);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GetUserRoomListResponseDto.success(roomList);

    }

    
   

}
