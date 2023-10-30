package com.project.codematchr.entity;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import com.project.codematchr.dto.request.room.PatchRoomEntranceRequestDto;
import com.project.codematchr.dto.request.room.PatchRoomExitRequestDto;
import com.project.codematchr.dto.request.room.PatchRoomImageUrlRequestDto;
import com.project.codematchr.dto.request.room.PatchRoomPasswordRequestDto;
import com.project.codematchr.dto.request.room.PatchRoomTitleRequestDto;
import com.project.codematchr.dto.request.room.PostRoomRequestDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="room")
@Table(name="room")
public class RoomEntity {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY) 
    private int roomNumber;
    private String roomTitle;
    private String roomImageUrl;
    private String roomPassword;
    private String roomDatetime;
    private String roomManagerEmail;
    private int roomUserCount;

    public RoomEntity(String roomManagerEmail, PostRoomRequestDto postRoomRequestDto) {

        Date now = Date.from(Instant.now());
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String roomDatetime = simpleDateFormat.format(now);

        this.roomTitle = postRoomRequestDto.getRoomTitle();
        this.roomImageUrl = postRoomRequestDto.getRoomImageUrl();
        this.roomPassword = postRoomRequestDto.getRoomPassword();
        this.roomDatetime = roomDatetime;
        this.roomManagerEmail = roomManagerEmail;
        this.roomUserCount = ++roomUserCount;
        
    }
    
    public void setRoomTitle(PatchRoomTitleRequestDto patchRoomTitleRequestDto) {
        this.roomTitle = patchRoomTitleRequestDto.getRoomTitle();
    }
    
    public void setRoomImageUrl(PatchRoomImageUrlRequestDto patchRoomImageUrlRequestDto) {
        this.roomImageUrl = patchRoomImageUrlRequestDto.getRoomImageUrl();
    }

    public void setRoomPassword(PatchRoomPasswordRequestDto patchRoomPasswordRequestDto) {
        this.roomPassword = patchRoomPasswordRequestDto.getRoomPassword();
    }

    public void patchRoomEntrance(PatchRoomEntranceRequestDto patchRoomEntranceRequestDto) {
        this.roomUserCount++;
    }

    public void patchRoomExit(PatchRoomExitRequestDto patchRoomExitRequestDto) {
        this.roomUserCount--;
    }

}