package com.project.codematchr.repository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.project.codematchr.entity.RoomJoinEntity;

@Repository
public interface RoomJoinRepository extends JpaRepository<RoomJoinEntity, Integer> {

    RoomJoinEntity findByUserEmail(String userEmail);

    List<RoomJoinEntity> findByRoomNumber(Integer roomNumber);

    RoomJoinEntity findByRoomNumberAndUserEmail(Integer roomNumber, String userEmail);
    
}
