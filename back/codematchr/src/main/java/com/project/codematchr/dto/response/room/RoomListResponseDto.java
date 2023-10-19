package com.project.codematchr.dto.response.room;

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

    

}
