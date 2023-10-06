package com.project.codematchr.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.project.codematchr.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, String> {
    // 존재하는 사용자 이메일 확인
    boolean existsByUserEmail(String userEmail);
    // 존채하는 사용자 닉네임 확인
    boolean existsByUserNickname(String userNickname);
    // 존재하는 사용자 비밀번호 확인
    boolean existsByUserPassword(String userPassword);
    // 존재하는 사용자 전화번호 확인 
    boolean existsByUserTelnumber(String userTelnumber);
    // 존재하는 사용자 이메일 찾기
    UserEntity findByUserEmail(String userEmail);

    @Query(value = 
  "SELECT * " +
  "FROM user " +
  "WHERE user_email IN ( " +
      "SELECT user_email " +
      "FROM favorite " +
      "WHERE favorite_board_number = ?1 " +
    ") ", nativeQuery = true
  ) 
  List<UserEntity> getFavoriteList(Integer boardNumber);

  @Query(value = 
  "SELECT " +
	"user_email, " +
	"user_nickname, " +
	"user_state_message, " +
	"user_profile_image_url " +
	"FROM `user` " +
	"WHERE user_email IN ( " +
    "SELECT friend_email " +
    "FROM friend " +
    ") ",
    nativeQuery = true
  )
  List<UserEntity> getFriendTltalList(String friendMyEmail);
}
