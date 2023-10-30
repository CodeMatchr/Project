package com.project.codematchr.entity;
import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;
import com.project.codematchr.entity.pk.RoomJoinPk;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="room_join")
@Table(name="room_join")
@IdClass(RoomJoinPk.class)
public class RoomJoinEntity implements Serializable {

    @Id
    private int roomNumber;

    @Id
    private String userEmail;
    
}
