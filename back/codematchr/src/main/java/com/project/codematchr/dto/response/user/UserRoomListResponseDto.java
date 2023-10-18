package com.project.codematchr.dto.response.user;

import java.util.ArrayList;
import java.util.List;

import com.project.codematchr.dto.response.ResponseDto;
import com.project.codematchr.entity.RoomViewEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserRoomListResponseDto extends ResponseDto {
    private int roomNumber;
    private String roomTitle;
    private String roomImageUrl;
    private int roomMemberCount;
    private String roomManagerNickname;
    private String roomManagerProfileImageUrl;

    public UserRoomListResponseDto(RoomViewEntity roomViewEntity) {
        this.roomNumber = roomViewEntity.getRoomNumber();
        this.roomTitle = roomViewEntity.getRoomTitle();
        this.roomImageUrl = roomViewEntity.getRoomImageUrl();
        this.roomMemberCount = roomViewEntity.getRoomMemberCount();
        this.roomManagerNickname = roomViewEntity.getRoomManagerNickname();
        this.roomManagerProfileImageUrl = roomViewEntity.getRoomManagerProfileImageUrl();
    }
    public static List<UserRoomListResponseDto> copyUserRoomList(List<RoomViewEntity> roomViewEntities) {
        List<UserRoomListResponseDto> roomList = new ArrayList<>();

        for(RoomViewEntity entity:roomViewEntities) {
            UserRoomListResponseDto room = new UserRoomListResponseDto(entity);
            roomList.add(room);
        }
        return roomList;
    }
}
