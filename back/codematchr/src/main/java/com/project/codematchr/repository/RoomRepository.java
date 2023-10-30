package com.project.codematchr.repository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.project.codematchr.entity.RoomEntity;
import com.project.codematchr.entity.resultSet.RoomListResultSet;

@Repository
public interface RoomRepository extends JpaRepository<RoomEntity, Integer>{
    
    boolean existsByRoomNumber(Integer roomNumber);
    
    boolean existsByRoomTitle(String roomTitle);
    
    boolean existsByRoomPassword(String roomPassword);
    
    RoomEntity findByRoomNumber(Integer roomNumber);
    
    RoomEntity findByroomManagerEmail(String roomManagerEmail);

    @Query(
        value = 
            "SELECT " +
            "R.room_number AS roomNumber, " +
            "R.room_title as roomTitle, " +
            "R.room_image_url as roomImageUrl, " +
            "R.room_password as roomPassword, " +
            "R.room_datetime as roomDatetime, " +
            "R.room_user_count as roomUserCount, " +
            "U.user_email as roomManagerEmail, " +
            "U.user_nickname as roomManagerNickname, " +
            "U.user_profile_image_url as roomManagerProfileImageUrl " +
            "from room AS R " +
            "INNER JOIN user AS U " +
            "ON R.room_manager_email = U.user_email " +
            "ORDER BY R.room_datetime DESC " +
            "LIMIT ?1, 50",
            nativeQuery = true
    )
    List<RoomListResultSet> getCurrentRoomList(Integer section);

}
