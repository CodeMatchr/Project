package com.project.codematchr.dto.response.room;
import java.util.ArrayList;
import java.util.List;
import com.project.codematchr.entity.RoomViewEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserRoomListResponseDto {

  private int roomNumber;
  private String roomTitle;
  private String roomImageUrl;
  private int roomMemberCount;
  private String roomManagerNickname;
  private String roomManagerProfileImageUrl;
  private String userEmail;

  public UserRoomListResponseDto(RoomViewEntity roomViewEntity) {
    this.roomNumber = roomViewEntity.getRoomNumber();
    this.roomImageUrl = roomViewEntity.getRoomImageUrl();
    this.roomTitle = roomViewEntity.getRoomTitle();
    this.roomManagerNickname = roomViewEntity.getRoomManagerNickname();
    this.roomManagerProfileImageUrl = roomViewEntity.getRoomManagerProfileImageUrl();
    this.roomMemberCount = roomViewEntity.getRoomUserCount();
    this.userEmail = roomViewEntity.getRoomManagerEmail();
  }

  public static List<UserRoomListResponseDto> copyEntityList(List<RoomViewEntity> roomViewEntities ){

    List<UserRoomListResponseDto> roomList = new ArrayList<>();

    for(RoomViewEntity entity: roomViewEntities){
      UserRoomListResponseDto room = new UserRoomListResponseDto(entity);
      roomList.add(room);
    }

    return roomList;

  }
  
}
