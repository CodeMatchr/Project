package com.project.codematchr.service.implement;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.project.codematchr.dto.request.room.PatchRoomEntranceRequestDto;
import com.project.codematchr.dto.request.room.PatchRoomExitRequestDto;
import com.project.codematchr.dto.request.room.PatchRoomImageUrlRequestDto;
import com.project.codematchr.dto.request.room.PatchRoomPasswordRequestDto;
import com.project.codematchr.dto.request.room.PatchRoomTitleRequestDto;
import com.project.codematchr.dto.request.room.PostRoomRequestDto;
import com.project.codematchr.dto.response.ResponseDto;
import com.project.codematchr.dto.response.room.DeleteRoomResponseDto;
import com.project.codematchr.dto.response.room.GetRoomListResponseDto;
import com.project.codematchr.dto.response.room.GetRoomResponseDto;
import com.project.codematchr.dto.response.room.GetUserRoomListResponseDto;
import com.project.codematchr.dto.response.room.PatchRoomEntranceResponseDto;
import com.project.codematchr.dto.response.room.PatchRoomExitResponseDto;
import com.project.codematchr.dto.response.room.PatchRoomImageUrlResponseDto;
import com.project.codematchr.dto.response.room.PatchRoomPasswordResponseDto;
import com.project.codematchr.dto.response.room.PatchRoomTitleResponseDto;
import com.project.codematchr.dto.response.room.PostRoomResponseDto;
import com.project.codematchr.dto.response.room.RoomListResponseDto;
import com.project.codematchr.entity.RoomEntity;
import com.project.codematchr.entity.RoomJoinEntity;
import com.project.codematchr.entity.RoomViewEntity;
import com.project.codematchr.entity.UserEntity;
import com.project.codematchr.entity.resultSet.RoomListResultSet;
import com.project.codematchr.repository.RoomJoinRepository;
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
    private final RoomJoinRepository roomJoinRepository;

    // 다인원 채팅방 생성
    @Override
    public ResponseEntity<? super PostRoomResponseDto> postRoom(String userEmail, PostRoomRequestDto postRoomRequestDto) {

        Integer roomNumber = null;

        try {
            // 존재하는 사용자 이메일 확인
            UserEntity existsByUserEmail = userRepository.findByUserEmail(userEmail);
            if(existsByUserEmail == null) return PostRoomResponseDto.noExistedUserEmail();

            // Entity 생성 - room 엔티티
            RoomEntity roomEntity = new RoomEntity(userEmail, postRoomRequestDto);

            // 데이터베이스 저장 - room
            roomRepository.save(roomEntity);

            // roomJoin - roomNumber //
            roomNumber = roomEntity.getRoomNumber();

            // Entity 생성 - roomJoin 엔터티
            RoomJoinEntity roomJoinEntity = new RoomJoinEntity(roomNumber, userEmail);

            // 데이터베이스 저장 - roomJoin
            roomJoinRepository.save(roomJoinEntity);
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return PostRoomResponseDto.success(roomNumber);
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
            if(roomEntity == null) return PatchRoomImageUrlResponseDto.noExistedRoomNumber();

            // 권한 없음(다인원 채팅방을 생성한 사용자 이메일과 입력받은 사용자 이메일이 일치하는지 확인)
            boolean equalUserEmail = roomEntity.getRoomManagerEmail().equals(userEmail);
            if(!equalUserEmail) return PatchRoomImageUrlResponseDto.noPermission();

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
            if(roomEntity == null) return PatchRoomPasswordResponseDto.noExistedRoomNumber();

            // 권한 없음(다인원 채팅방을 생성한 사용자 이메일과 입력받은 사용자 이메일이 일치하는지 확인)
            boolean equalUserEmail = roomEntity.getRoomManagerEmail().equals(userEmail);
            if(!equalUserEmail) return PatchRoomPasswordResponseDto.noPermission();

            // 이미 설정되어 있는 비밀번호 확인
            boolean equalPassword = roomEntity.getRoomPassword().equals(patchRoomPasswordRequestDto.getRoomPassword());
            if(equalPassword) return PatchRoomPasswordResponseDto.existedRoomPassword();

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
    public ResponseEntity<? super DeleteRoomResponseDto> deleteRoom(Integer roomNumber, String userEmail){

        try {
            // 존재하는 채팅방인지 확인
            RoomEntity roomEntity = roomRepository.findByRoomNumber(roomNumber);
            if(roomEntity==null) return DeleteRoomResponseDto.noExistedRoomNumber();

            // 방장인지 아닌지? (아니면 권한없음)
            boolean equalEmail = roomEntity.getRoomManagerEmail().equals(userEmail);
            if(!equalEmail) return DeleteRoomResponseDto.noPermission();

            // roomJoin - 해당되는 데이터 먼저 삭제(제약조건)
            List<RoomJoinEntity> roomJoinEntities = roomJoinRepository.findByRoomNumber(roomNumber);
            roomJoinRepository.deleteAll(roomJoinEntities);

            // 채팅방 삭제
            roomRepository.delete(roomEntity);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();

        }

        return DeleteRoomResponseDto.success();

    }

    // 다인원 채팅방 목록 리스트 조회(최신순)
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

    // 특정 사용자가 사용하는 다인원 채팅방 목록 리스트 조회(최신순)
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

    // 특정 사용자가 특정 채팅방 입장 메서드 - 방장이 아닌 경우 patch
    @Override
    public ResponseEntity<? super PatchRoomEntranceResponseDto> patchRoomEntrance(Integer roomNumber, String userEmail,
            PatchRoomEntranceRequestDto patchRoomEntranceRequestDto) {
        try {

            // 존재하는 사용자인지 확인 //
            boolean hasUserEmail = userRepository.existsByUserEmail(userEmail);
            if(!hasUserEmail) return PatchRoomEntranceResponseDto.noExistedUserEmail();

            // 존재하는 다인원 채팅방 번호인지 확인 //
            RoomEntity roomEntity = roomRepository.findByRoomNumber(roomNumber);
            if(roomEntity == null) return PatchRoomEntranceResponseDto.noExistedRoomNumber();

            // 해당 다인원 채팅방의 비밀번호가 입력한 비밀번호와 일치하는지 확인 //
            boolean equalPassword = roomEntity.getRoomPassword().equals(patchRoomEntranceRequestDto.getRoomPassword());
            if(!equalPassword) return PatchRoomEntranceResponseDto.notCorrectPassword();

            // 기존 채팅방에 소속된 사용자 확인 1 방장 //
            boolean existedRoomUser = roomEntity.getRoomManagerEmail().equals(userEmail);
            if(existedRoomUser) return PatchRoomEntranceResponseDto.existedUserEmail();

            // 기존 채팅방에 소속된 사용자 확인 2 다인원 채팅방 소속자들이 소속된 roomJoin roomNumber
            RoomJoinEntity roomJoinEntity = roomJoinRepository.findByRoomNumberAndUserEmail(roomNumber, userEmail);
            if(roomJoinEntity != null) return PatchRoomEntranceResponseDto.existedUserEmail();

            // Entity 생성 - roomJoin 엔터티 생성
            RoomJoinEntity roomJoinEntityPost = new RoomJoinEntity(roomEntity.getRoomNumber(), userEmail);

            // 데이터베이스 저장 - roomJoin
            roomJoinRepository.save(roomJoinEntityPost);

            // 다인원 채팅방 정보 수정 - 채팅방 인원수 1증가 //
            roomEntity.patchRoomEntrance(patchRoomEntranceRequestDto);

            // 데이터베이스 저장 - room //
            roomRepository.save(roomEntity);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return PatchRoomEntranceResponseDto.success();

    }

    // 특정 사용자가 특정 채팅방을 나가기 - 방장이 아닌 경우 patch //
    @Override
    public ResponseEntity<? super PatchRoomExitResponseDto> patchRoomExit(Integer roomNumber, String userEmail,
            PatchRoomExitRequestDto patchRoomExitRequestDto) {
        try {
            // 존재하는 다인원 채팅방 번호인지 확인 //
            RoomEntity roomEntity = roomRepository.findByRoomNumber(roomNumber);
            if(roomEntity == null) return PatchRoomTitleResponseDto.noExistedRoomNumber();

            // 기존 채팅방에 소속된 사용자 확인 2 다인원 채팅방 소속자들이 소속된 roomJoin roomNumber
            RoomJoinEntity roomJoinEntity = roomJoinRepository.findByRoomNumberAndUserEmail(roomNumber, userEmail);
            if(roomJoinEntity == null) return PatchRoomEntranceResponseDto.noExistedRoomNumber();

            // 방장인지 아닌지? (방장이면 권한없음)
            boolean equalEmail = roomEntity.getRoomManagerEmail().equals(userEmail);
            if(equalEmail) return PatchRoomTitleResponseDto.noPermission();
            
            // 다인원 채팅방 정보 수정 - 채팅방 인원수 1 감소 //
            roomEntity.patchRoomExit(patchRoomExitRequestDto);

            // 데이터베이스 저장 - room //
            roomRepository.save(roomEntity);

            // roomJoin 정보 수정 - 다인원 채팅방을 퇴장한 사용자 이메일 수정(삭제) //
            roomJoinRepository.delete(roomJoinEntity);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return PatchRoomExitResponseDto.success();
    }

    // 특정 다인원 채팅방에 속해 있는 사용자가 해당 채팅방 입장 //
    @Override
    public ResponseEntity<? super GetRoomResponseDto> getRoom(Integer roomNumber, String userEmail) {

        RoomViewEntity roomViewEntity = null;
        RoomJoinEntity roomJoinEntity = null;

        try {
            // 존재하는 다인원 채팅방 번호 확인 //
            roomViewEntity = roomViewRepository.findByRoomNumber(roomNumber);
            if(roomViewEntity == null) return GetRoomResponseDto.noExistedRoomNumber();

            // 특정한 다인원 채팅방에 속해 있는 사용자인지 확인 //
            // System.out.println(roomNumber);
            // System.out.println(userEmail);
            // roomJoinEntity = roomJoinRepository.findByRoomNumberAndUserEmail(roomNumber, userEmail);
            // if(roomJoinEntity == null) return GetRoomResponseDto.noExistedUserEmail();

            // 데이터베이스 저장
            roomViewRepository.save(roomViewEntity);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetRoomResponseDto.success(roomViewEntity);
    }

}
