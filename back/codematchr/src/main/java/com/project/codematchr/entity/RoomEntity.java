package com.project.codematchr.entity;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

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
    @GeneratedValue(strategy=GenerationType.IDENTITY) // AUTO INCREASEMENT
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
        
    // 다인원 채팅방 제목 수정
    public void setRoomTitle(PatchRoomTitleRequestDto patchRoomTitleRequestDto) {
        this.roomTitle = patchRoomTitleRequestDto.getRoomTitle();
    }

    // 다인원 채팅방 이미지 Url 수정
    public void setRoomImageUrl(PatchRoomImageUrlRequestDto patchRoomImageUrlRequestDto) {
        this.roomImageUrl = patchRoomImageUrlRequestDto.getRoomImageUrl();
    }

    // 다인원 채팅방 비밀번호 수정
    public void setRoomPassword(PatchRoomPasswordRequestDto patchRoomPasswordRequestDto) {
        this.roomPassword = patchRoomPasswordRequestDto.getRoomPassword();
    }

    


}
