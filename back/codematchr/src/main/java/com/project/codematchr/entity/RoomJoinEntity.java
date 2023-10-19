package com.project.codematchr.entity;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.project.codematchr.dto.request.authentication.SignInRequestDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="roomJoin")
@Table(name="roomJoin")
public class RoomJoinEntity {
    
    private String userEmail;
    private int roomNumber;

    public RoomJoinEntity(SignInRequestDto dto) {
        this.userEmail = dto.getUserEmail();
    }

    

}
