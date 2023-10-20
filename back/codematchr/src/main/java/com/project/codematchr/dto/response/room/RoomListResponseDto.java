package com.project.codematchr.dto.response.room;

import java.util.ArrayList;
import java.util.List;

import com.project.codematchr.entity.RoomViewEntity;
import com.project.codematchr.entity.resultSet.RoomListResultSet;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class RoomListResponseDto {
    private int roomNumber;
    private String roomTitle;
    private String roomImageUrl;
    private String roomPassword;
    private String roomDatetime;
    private String roomManagerEmail;
    private int roomUserCount;

    public RoomListResponseDto(RoomViewEntity roomViewEntity) {
        this.roomNumber = roomViewEntity.getRoomNumber();
        this.roomTitle = roomViewEntity.getRoomTitle();
        this.roomImageUrl = roomViewEntity.getRoomImageUrl();
        this.roomPassword = roomViewEntity.getRoomPassword();
        this.roomDatetime = roomViewEntity.getRoomDatetime();
        this.roomManagerEmail = roomViewEntity.getRoomManagerEmail();
        this.roomUserCount = roomViewEntity.getRoomUserCount();
    }

    public static List<RoomListResponseDto> copyList(List<RoomViewEntity> roomViewEntities) {
        List<RoomListResponseDto> roomList = new ArrayList<>();

        for(RoomViewEntity roomViewEntity: roomViewEntities) {
            RoomListResponseDto room = new RoomListResponseDto(roomViewEntity);
            roomList.add(room);
        }

        return roomList;
    }

    public RoomListResponseDto(RoomListResultSet roomListResultSet) {
        this.roomNumber = roomListResultSet.getRoomNumber();
        this.roomTitle = roomListResultSet.getRoomTitle();
        this.roomImageUrl = roomListResultSet.getRoomImageUrl();
        this.roomPassword = roomListResultSet.getRoomPassword();
        this.roomDatetime = roomListResultSet.getRoomDatetime();
        this.roomManagerEmail = roomListResultSet.getRoomManagerEmail();
        this.roomUserCount = roomListResultSet.getRoomUserCount();
    }

    public static List<RoomListResponseDto> copyCurrentList(List<RoomListResultSet> roomListResultSets) {
        List<RoomListResponseDto> roomList = new ArrayList<>();

        for(RoomListResultSet roomListResultSet: roomListResultSets) {
            RoomListResponseDto room = new RoomListResponseDto(roomListResultSet);
            roomList.add(room);
        }

        return roomList;
    }
}
