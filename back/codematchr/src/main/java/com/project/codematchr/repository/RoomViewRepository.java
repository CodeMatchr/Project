package com.project.codematchr.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.project.codematchr.entity.RoomViewEntity;

@Repository
public interface RoomViewRepository extends JpaRepository<RoomViewEntity, Integer> {
    
    List<RoomViewEntity> findByUserEmail(String userEmail);

    @Query(
        value = 
        "SELECT " +
        "R.room_number AS room_number, " +
        "R.room_title as room_title, " +
        "R.room_image_url as room_image_url, " +
        "R.room_member_count as room_member_count, " +
        "U.user_nickname as room_manager_nickname, " +
        "U.user_profile_image_url as room_manager_profile_image_url, " +
        "U.user_email as user_email " + 
        "from room AS R " +
        "INNER JOIN user AS U " +
        "ON R.room_manager_email = U.user_email " ,
        nativeQuery = true
    )
    List<RoomViewEntity> getRoomList(Integer roomNumber);


}
