package com.project.codematchr.repository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.project.codematchr.entity.RoomViewEntity;

public interface RoomViewRepository extends JpaRepository<RoomViewEntity, Integer> {
    
    RoomViewEntity findByRoomNumber(Integer roomNumber);

    List<RoomViewEntity> findByRoomManagerEmailOrderByRoomDatetimeDesc(String userEmail);

    List<RoomViewEntity> findByRoomTitleContainsOrderByRoomDatetimeDesc(String searchWord);
    
}
