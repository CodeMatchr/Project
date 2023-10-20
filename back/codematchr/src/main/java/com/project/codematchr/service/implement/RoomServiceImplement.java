package com.project.codematchr.service.implement;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.project.codematchr.dto.request.room.PatchRoomImageUrlRequestDto;
import com.project.codematchr.dto.request.room.PatchRoomPasswordRequestDto;
import com.project.codematchr.dto.request.room.PatchRoomTitleRequestDto;
import com.project.codematchr.dto.request.room.PostRoomRequestDto;
import com.project.codematchr.dto.response.ResponseDto;
import com.project.codematchr.dto.response.room.DeleteRoomResponseDto;
import com.project.codematchr.dto.response.room.GetCurrentRoomListResponseDto;
import com.project.codematchr.dto.response.room.GetRoomListResponseDto;
import com.project.codematchr.dto.response.room.GetUserRoomListResponseDto;
import com.project.codematchr.dto.response.room.PatchRoomImageUrlResponseDto;
import com.project.codematchr.dto.response.room.PatchRoomPasswordResponseDto;
import com.project.codematchr.dto.response.room.PatchRoomTitleResponseDto;
import com.project.codematchr.dto.response.room.PostRoomResponseDto;
import com.project.codematchr.dto.response.room.RoomListResponseDto;
import com.project.codematchr.entity.RoomEntity;
import com.project.codematchr.entity.RoomViewEntity;
import com.project.codematchr.entity.UserEntity;
import com.project.codematchr.entity.resultSet.RoomListResultSet;
import com.project.codematchr.repository.RoomRepository;
import com.project.codematchr.repository.RoomViewRepository;
import com.project.codematchr.repository.UserRepository;
import com.project.codematchr.service.RoomService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoomServiceImplement implements RoomService {

    private final UserRepository userRepository;
    private final RoomRepository roomRepository;
    private final RoomViewRepository roomViewRepository;

    // 다인원 채팅방 생성
    @Override
    public ResponseEntity<? super PostRoomResponseDto> postRoom(String userEmail, PostRoomRequestDto postRoomRequestDto) {

        try {
            // 존재하는 사용자 이메일 확인
            UserEntity existsByUserEmail = userRepository.findByUserEmail(userEmail);
            if(existsByUserEmail == null) return PostRoomResponseDto.noExistedUserEmail();

            // Entity 생성
            RoomEntity roomEntity = new RoomEntity(userEmail, postRoomRequestDto);

            // 데이터베이스 저장
            roomRepository.save(roomEntity);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return PostRoomResponseDto.success();
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
            boolean equalUserEmail = roomEntity.getRoomManagerEmail().equals(userEmail);
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
            boolean equalUserEmail = roomEntity.getRoomManagerEmail().equals(userEmail);
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
            boolean equalUserEmail = roomEntity.getRoomManagerEmail().equals(userEmail);
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
    public ResponseEntity<? super DeleteRoomResponseDto> deleteRoom(Integer roomNumber, String userEail){

        try {

            // 존재하는 채팅방인지 확인
            RoomEntity roomEntity = roomRepository.findByRoomNumber(roomNumber);
            if(roomNumber==null) return DeleteRoomResponseDto.noExistedRoomNumber();

            // 방장인지 아닌지? (아니면 권한없음)
            boolean equalEmail = roomEntity.getRoomManagerEmail().equals(userEail);
            if(!equalEmail) return DeleteRoomResponseDto.noPermission();

            // 채팅방 삭제
            roomRepository.delete(roomEntity);


        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();

        }

        return DeleteRoomResponseDto.success();

    }

    @Override
    public ResponseEntity<? super GetRoomListResponseDto> getCurrentRoomList(Integer section) {

        List<RoomListResponseDto> roomList = null;

        try {
            // 최신 room 리스트 불러오기 //
            Integer limit = (section - 1) * 50;
            List<RoomListResultSet> resultSets = roomRepository.getCurrentRoomList(limit);

            // ResponseDto 형태로 반환 //
            roomList = RoomListResponseDto.copyCurrentList(resultSets);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetRoomListResponseDto.success(roomList);
    }

    @Override
    public ResponseEntity<? super GetUserRoomListResponseDto> getUserRoomList(String userEmail) {
        
        List<RoomListResponseDto> roomList = null;

        try {
            // 특정 이메일에 해당하는 게시물 리스트 조회 //
            List<RoomViewEntity> roomViewEntities = roomViewRepository.findByRoomManagerEmailOrderByRoomDatetimeDesc(userEmail);

            // entity 를 dto 로 변환 //
            roomList = RoomListResponseDto.copyList(roomViewEntities);
    
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetUserRoomListResponseDto.success(roomList);

    }

}
