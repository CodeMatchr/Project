package com.project.codematchr.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.project.codematchr.entity.UserViewEntity;

@Repository
public interface FriendTotalListRespository extends JpaRepository<UserViewEntity, String>{
    

// description : 친구 추가 안한 사용자 조회 //
  @Query(
    value = 
    "SELECT " +
    "U.user_email, " +
    "U.user_nickname, " +
    "U.user_state_message, " +
    "U.user_profile_image_url " +
    "FROM user_view AS U " +
    "LEFT JOIN ( " +
        "SELECT friend_my_email " +
        "from friend_view " +
        "UNION ALL " +
        "SELECT friend_email " +
        "FROM friend_view " +
    ") AS F " +
    "ON U.user_email = F.friend_my_email " +
    "WHERE F.friend_my_email IS NULL ",
    nativeQuery = true
    )
    List<UserViewEntity> getFriendList(String friendMyEmail);
}
