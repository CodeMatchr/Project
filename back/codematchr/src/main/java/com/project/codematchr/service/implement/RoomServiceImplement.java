package com.project.codematchr.service.implement;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.project.codematchr.dto.request.room.PatchRoomImageUrlRequestDto;
import com.project.codematchr.dto.request.room.PatchRoomPasswordRequestDto;
import com.project.codematchr.dto.request.room.PatchRoomTitleRequestDto;
import com.project.codematchr.dto.request.room.PostRoomRequestDto;
import com.project.codematchr.dto.response.ResponseDto;
import com.project.codematchr.dto.response.room.DeleteMultiChatResponseDto;
import com.project.codematchr.dto.response.room.GetRoomResponseDto;
import com.project.codematchr.dto.response.room.GetUserRoomListResponseDto;
import com.project.codematchr.dto.response.room.PatchRoomImageUrlResponseDto;
import com.project.codematchr.dto.response.room.PatchRoomPasswordResponseDto;
import com.project.codematchr.dto.response.room.PatchRoomTitleResponseDto;
import com.project.codematchr.dto.response.room.PostRoomResponseDto;
import com.project.codematchr.dto.response.room.UserRoomListResponseDto;
import com.project.codematchr.entity.RoomEntity;
import com.project.codematchr.entity.RoomViewEntity;
import com.project.codematchr.entity.UserEntity;
import com.project.codematchr.entity.UserViewEntity;
import com.project.codematchr.repository.RoomRepository;
import com.project.codematchr.repository.RoomViewRepository;
import com.project.codematchr.repository.UserRepository;
import com.project.codematchr.service.RoomService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoomServiceImplement implements RoomService {

    private final UserRepository userRepository;
    // todo :  다시 확인 해보기 //
    private final RoomViewRepository roomViewRepository;
    private final RoomRepository roomRepository;

    // 다인원 채팅방 생성
    @Override
    public ResponseEntity<? super PostRoomResponseDto> postRoom(String roomUserEmail, PostRoomRequestDto postRoomRequestDto) {

        try {
            // 존재하는 사용자 이메일 확인
            UserEntity existsByUserEmail = userRepository.findByUserEmail(roomUserEmail);
            if(existsByUserEmail == null) return PostRoomResponseDto.noExistedUserEmail();

            // Entity 생성
            RoomEntity roomEntity = new RoomEntity(roomUserEmail, postRoomRequestDto);

            // 데이터베이스 저장
            roomRepository.save(roomEntity);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return PostRoomResponseDto.success();
    }

    // 특정 다인원 채팅방 조회
    @Override
    public ResponseEntity<? super GetRoomResponseDto> getRoom(Integer roomNumber) {
        RoomEntity roomEntity = null;

        try {
            // 존재하는 특정 다인원 채팅방 번호 확인
            RoomEntity existsByRoomNumber = roomRepository.findByRoomNumber(roomNumber);
            if(existsByRoomNumber == null) return GetRoomResponseDto.noExistedRoomNumber();
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetRoomResponseDto.success(roomEntity);
    }

    // 특정 다인원 채팅방 제목 수정
    @Override
    public ResponseEntity<? super PatchRoomTitleResponseDto> patchRoomTitle(Integer roomNumber, String userEmail, PatchRoomTitleRequestDto patchRoomRequestDto) {

        try {
            // 존재하는 사용자 이메일 확인
            boolean existedUserEmail = userRepository.existsByUserEmail(userEmail);
            if(!existedUserEmail) return PatchRoomTitleResponseDto.noExistedUserEmail();

            // 존재하는 특정 다인원 채팅방 번호 확인
            RoomEntity roomEntity = roomRepository.findByRoomNumber(roomNumber);
            if(roomEntity == null) return PatchRoomTitleResponseDto.noExistedRoomNumber();

            // 권한 없음(다인원 채팅방을 생성한 사용자 이메일과 입력받은 사용자 이메일이 일치하는지 확인)
            boolean equalUserEmail = roomEntity.getRoomUserEmail().equals(userEmail);
            if(!equalUserEmail) return PatchRoomTitleResponseDto.noPermission();

            // 존재하는 특정 다인원 채팅방 제목 확인(중복)
             boolean exsitedRoomTitle = roomRepository.existsByRoomTitle(patchRoomRequestDto.getRoomTitle());
             if(exsitedRoomTitle) return PatchRoomTitleResponseDto.existedRoomTitle();

            // 특정 다인원 채팅방 제목 수정
            roomEntity.setRoomTitle(patchRoomRequestDto);

            // 특정 다인원 채팅방 수정사항 데이터베이스 저장
            roomRepository.save(roomEntity);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError(); 
        }

        return PatchRoomTitleResponseDto.success();
    }

    // 특정 다인원 채팅방 이미지 Url 수정
    @Override
    public ResponseEntity<? super PatchRoomImageUrlResponseDto> patchRoomImageUrl(Integer roomNumber, String userEmail, PatchRoomImageUrlRequestDto patchRoomImageUrlRequestDto) {
        try {
            // 존재하는 특정 다인원 채팅방 번호 확인
            RoomEntity roomEntity = roomRepository.findByRoomNumber(roomNumber);
            if(roomEntity == null) return PatchRoomTitleResponseDto.noExistedRoomNumber();

            // 권한 없음(다인원 채팅방을 생성한 사용자 이메일과 입력받은 사용자 이메일이 일치하는지 확인)
            boolean equalUserEmail = roomEntity.getRoomUserEmail().equals(userEmail);
            if(!equalUserEmail) return PatchRoomTitleResponseDto.noPermission();

            // 특정 다인원 채팅방 이미지 Url 수정
            roomEntity.setRoomImageUrl(patchRoomImageUrlRequestDto);

            // 특정 다인원 채팅방 이미지 Url 수정사항 데이터베이스 저장
            roomRepository.save(roomEntity);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return PatchRoomImageUrlResponseDto.success();
    }

    // 특정 다인원 채팅방 비밀번호 수정
    @Override
    public ResponseEntity<? super PatchRoomPasswordResponseDto> patchRoomPassword(Integer roomNumber, String userEmail, PatchRoomPasswordRequestDto patchRoomPasswordRequestDto) {
        try {
            // 존재하는 특정 다인원 채팅방 번호 확인
            RoomEntity roomEntity = roomRepository.findByRoomNumber(roomNumber);
            if(roomEntity == null) return PatchRoomTitleResponseDto.noExistedRoomNumber();

            // 권한 없음(다인원 채팅방을 생성한 사용자 이메일과 입력받은 사용자 이메일이 일치하는지 확인)
            boolean equalUserEmail = roomEntity.getRoomUserEmail().equals(userEmail);
            if(!equalUserEmail) return PatchRoomTitleResponseDto.noPermission();

            // 이미 설정되어 있는 비밀번호 확인

            // 특정 다인원 채팅방 비밀번호 수정
            roomEntity.setRoomPassword(patchRoomPasswordRequestDto);

            // 사용자 비밀번호 수정사항 데이터베이스 저장
            roomRepository.save(roomEntity);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
            
        }

        return PatchRoomPasswordResponseDto.success();

    }

    // 다인원 채팅방 삭제
    public ResponseEntity<? super DeleteMultiChatResponseDto> deleteMultiChat(Integer roomNumber, String room_manger_email){

        try {

            // 존재하는 채팅방인지 확인
            RoomEntity roomEntity = roomRepository.findByRoomNumber(roomNumber);
            if(roomNumber==null) return DeleteMultiChatResponseDto.noExistedRoomNumber();

            // 방장인지 아닌지? (아니면 권한없음)
            boolean equalEmail = roomEntity.getRoomUserEmail().equals(room_manger_email);
            if(!equalEmail) return DeleteMultiChatResponseDto.noPermission();

            // 채팅방 삭제
            roomRepository.delete(roomEntity);


        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();

        }

        return DeleteMultiChatResponseDto.success();

    }

    @Override
    public ResponseEntity<? super GetUserRoomListResponseDto> getUserRoomList(String userEmail) {

        List<UserRoomListResponseDto> roomList = null;

        try {
            List<RoomViewEntity> userViewEntities = roomViewRepository.findByUserEmail(userEmail);

            roomList = UserRoomListResponseDto.copyEntityList(userViewEntities);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GetUserRoomListResponseDto.success(roomList);
    }


    

    

    
    
}
