package com.project.codematchr.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.project.codematchr.entity.FriendViewEntity;
import com.project.codematchr.entity.pk.FriendPk;

@Repository
public interface FriendRepository extends JpaRepository<FriendViewEntity, FriendPk> {

  // 리스트 조회 //
  List<FriendViewEntity> findByFriendMyEmailOrderByFriendEmailDesc(String friendMyEmail);

  @Query(
    value = 
    "SELECT " +
    "F.friend_my_email AS friend_my_email, " +
    "F.friend_email AS friend_email, " +
    "U.user_nickname AS user_nickname, " +
    "U.user_state_message AS user_state_message, "+ 
    "U.user_profile_image_url AS user_profile_image_url "+ 
    "FROM friend AS F " +
    "LEFT JOIN user AS U " +
    "ON F.friend_email = U.user_email " + 
    "WHERE F.friend_my_email = ?1",
    nativeQuery = true
    )
    List<FriendViewEntity> getFriendList(String friendMyEmail);
    

}
