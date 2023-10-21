package com.project.codematchr.entity.pk;

import javax.persistence.Column;
import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoomJoinPk implements Serializable{
    @Column(name = "room_number")
    private int roomNumber;
    @Column(name = "user_email")
    private String userEmail;
}
