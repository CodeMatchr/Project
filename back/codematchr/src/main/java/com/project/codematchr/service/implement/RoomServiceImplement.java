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
import com.project.codematchr.dto.response.room.GetSearchRoomResponseDto;
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

    @Override
    public ResponseEntity<? super PostRoomResponseDto> postRoom(String userEmail, PostRoomRequestDto postRoomRequestDto) {

        Integer roomNumber = null;

        try {
        
            UserEntity existsByUserEmail = userRepository.findByUserEmail(userEmail);

            if(existsByUserEmail == null) return PostRoomResponseDto.noExistedUserEmail();
        
            RoomEntity roomEntity = new RoomEntity(userEmail, postRoomRequestDto);
        
            roomRepository.save(roomEntity);
        
            roomNumber = roomEntity.getRoomNumber();
        
            RoomJoinEntity roomJoinEntity = new RoomJoinEntity(roomNumber, userEmail);
        
            roomJoinRepository.save(roomJoinEntity);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return PostRoomResponseDto.success(roomNumber);

    }


    @Override
    public ResponseEntity<? super PatchRoomTitleResponseDto> patchRoomTitle(Integer roomNumber, String userEmail, PatchRoomTitleRequestDto patchRoomRequestDto) {

        try {
        
            boolean existedUserEmail = userRepository.existsByUserEmail(userEmail);
            if(!existedUserEmail) return PatchRoomTitleResponseDto.noExistedUserEmail();

        
            RoomEntity roomEntity = roomRepository.findByRoomNumber(roomNumber);
            if(roomEntity == null) return PatchRoomTitleResponseDto.noExistedRoomNumber();

        
            boolean equalUserEmail = roomEntity.getRoomManagerEmail().equals(userEmail);
            if(!equalUserEmail) return PatchRoomTitleResponseDto.noPermission();

        
            boolean exsitedRoomTitle = roomRepository.existsByRoomTitle(patchRoomRequestDto.getRoomTitle());
            if(exsitedRoomTitle) return PatchRoomTitleResponseDto.existedRoomTitle();

            roomEntity.setRoomTitle(patchRoomRequestDto);
        
            roomRepository.save(roomEntity);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError(); 
        }

        return PatchRoomTitleResponseDto.success();

    }


    @Override
    public ResponseEntity<? super PatchRoomImageUrlResponseDto> patchRoomImageUrl(Integer roomNumber, String userEmail, PatchRoomImageUrlRequestDto patchRoomImageUrlRequestDto) {

        try {
        
            RoomEntity roomEntity = roomRepository.findByRoomNumber(roomNumber);

            if(roomEntity == null) return PatchRoomImageUrlResponseDto.noExistedRoomNumber();
        
            boolean equalUserEmail = roomEntity.getRoomManagerEmail().equals(userEmail);

            if(!equalUserEmail) return PatchRoomImageUrlResponseDto.noPermission();

            roomEntity.setRoomImageUrl(patchRoomImageUrlRequestDto);

            roomRepository.save(roomEntity);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return PatchRoomImageUrlResponseDto.success();

    }

    @Override
    public ResponseEntity<? super PatchRoomPasswordResponseDto> patchRoomPassword(Integer roomNumber, String userEmail, PatchRoomPasswordRequestDto patchRoomPasswordRequestDto) {
        try {
        
            RoomEntity roomEntity = roomRepository.findByRoomNumber(roomNumber);

            if(roomEntity == null) return PatchRoomPasswordResponseDto.noExistedRoomNumber();
        
            boolean equalUserEmail = roomEntity.getRoomManagerEmail().equals(userEmail);

            if(!equalUserEmail) return PatchRoomPasswordResponseDto.noPermission();

            boolean equalPassword = roomEntity.getRoomPassword().equals(patchRoomPasswordRequestDto.getRoomPassword());

            if(equalPassword) return PatchRoomPasswordResponseDto.existedRoomPassword();
        
            roomEntity.setRoomPassword(patchRoomPasswordRequestDto);
        
            roomRepository.save(roomEntity);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return PatchRoomPasswordResponseDto.success();

    }


    public ResponseEntity<? super DeleteRoomResponseDto> deleteRoom(Integer roomNumber, String userEmail){

        try {
        
            RoomEntity roomEntity = roomRepository.findByRoomNumber(roomNumber);

            if(roomEntity==null) return DeleteRoomResponseDto.noExistedRoomNumber();

        
            boolean equalEmail = roomEntity.getRoomManagerEmail().equals(userEmail);

            if(!equalEmail) return DeleteRoomResponseDto.noPermission();

        
            List<RoomJoinEntity> roomJoinEntities = roomJoinRepository.findByRoomNumber(roomNumber);

            roomJoinRepository.deleteAll(roomJoinEntities);

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
    
            Integer limit = (section - 1) * 50;
            
            List<RoomListResultSet> resultSets = roomRepository.getCurrentRoomList(limit);

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
    
            List<RoomViewEntity> roomViewEntities = roomViewRepository.findByRoomManagerEmailOrderByRoomDatetimeDesc(userEmail);
    
            roomList = RoomListResponseDto.copyList(roomViewEntities);
    
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetUserRoomListResponseDto.success(roomList);

    }

    @Override
    public ResponseEntity<? super PatchRoomEntranceResponseDto> patchRoomEntrance(Integer roomNumber, String userEmail, PatchRoomEntranceRequestDto patchRoomEntranceRequestDto) {

        try {
    
            boolean hasUserEmail = userRepository.existsByUserEmail(userEmail);

            if(!hasUserEmail) return PatchRoomEntranceResponseDto.noExistedUserEmail();
    
            RoomEntity roomEntity = roomRepository.findByRoomNumber(roomNumber);

            if(roomEntity == null) return PatchRoomEntranceResponseDto.noExistedRoomNumber();
    
            boolean equalPassword = roomEntity.getRoomPassword().equals(patchRoomEntranceRequestDto.getRoomPassword());

            if(!equalPassword) return PatchRoomEntranceResponseDto.notCorrectPassword();

            boolean existedRoomUser = roomEntity.getRoomManagerEmail().equals(userEmail);

            if(existedRoomUser) return PatchRoomEntranceResponseDto.existedUserEmail();
    
            RoomJoinEntity roomJoinEntity = roomJoinRepository.findByRoomNumberAndUserEmail(roomNumber, userEmail);

            if(roomJoinEntity != null) return PatchRoomEntranceResponseDto.existedUserEmail();

            RoomJoinEntity roomJoinEntityPost = new RoomJoinEntity(roomEntity.getRoomNumber(), userEmail);

            roomJoinRepository.save(roomJoinEntityPost);

            roomEntity.patchRoomEntrance(patchRoomEntranceRequestDto);
    
            roomRepository.save(roomEntity);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return PatchRoomEntranceResponseDto.success();

    }

    @Override
    public ResponseEntity<? super PatchRoomExitResponseDto> patchRoomExit(Integer roomNumber, String userEmail, PatchRoomExitRequestDto patchRoomExitRequestDto) {

        try {
    
            RoomEntity roomEntity = roomRepository.findByRoomNumber(roomNumber);
            if(roomEntity == null) return PatchRoomTitleResponseDto.noExistedRoomNumber();

    
            RoomJoinEntity roomJoinEntity = roomJoinRepository.findByRoomNumberAndUserEmail(roomNumber, userEmail);
            if(roomJoinEntity == null) return PatchRoomEntranceResponseDto.noExistedRoomNumber();

    
            boolean equalEmail = roomEntity.getRoomManagerEmail().equals(userEmail);
            if(equalEmail) return PatchRoomTitleResponseDto.noPermission();
            
    
            roomEntity.patchRoomExit(patchRoomExitRequestDto);

    
            roomRepository.save(roomEntity);

    
            roomJoinRepository.delete(roomJoinEntity);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return PatchRoomExitResponseDto.success();

    }

    @Override
    public ResponseEntity<? super GetRoomResponseDto> getRoom(Integer roomNumber, String userEmail) {

        RoomViewEntity roomViewEntity = null;

        try {

            roomViewEntity = roomViewRepository.findByRoomNumber(roomNumber);
            if(roomViewEntity == null) return GetRoomResponseDto.noExistedRoomNumber();
    
            roomViewRepository.save(roomViewEntity);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetRoomResponseDto.success(roomViewEntity);
        
    }

    @Override
    public ResponseEntity<? super GetSearchRoomResponseDto> getSearchRoom(String searchWord) {

        List<RoomListResponseDto> roomList = null;

        try {
    
            List<RoomViewEntity> roomViewEntities = roomViewRepository.findByRoomTitleContainsOrderByRoomDatetimeDesc(searchWord);
            
            roomList = RoomListResponseDto.copyList(roomViewEntities);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetSearchRoomResponseDto.success(roomList);

    }

}
