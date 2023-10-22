package com.project.codematchr.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.project.codematchr.entity.RoomEntity;
import com.project.codematchr.entity.resultSet.RoomListResultSet;

@Repository
public interface RoomRepository extends JpaRepository<RoomEntity, Integer>{
    // 존재하는 다인원 채팅방 번호 확인
    boolean existsByRoomNumber(Integer roomNumber);
    // 존재하는 다인원 채팅방 제목 확인
    boolean existsByRoomTitle(String roomTitle);
    // 존재하는 다인원 채팅방 비밀번호 확인
    boolean existsByRoomPassword(String roomPassword);
    // 다인원 채팅방 번호 찾기
    RoomEntity findByRoomNumber(Integer roomNumber);
    // 다인원 채팅방 사용자 이메일 찾기(방장)
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
