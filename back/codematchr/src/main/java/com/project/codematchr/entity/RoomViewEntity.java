package com.project.codematchr.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "room_view")
@Table(name = "room_view")
public class RoomViewEntity {
    @Id
    private int roomNumber;
    private String roomTitle;
    private String roomImageUrl;
    private int roomMemberCount;
    private String roomManagerNickname;
    private String roomManagerProfileImageUrl;
   

}
