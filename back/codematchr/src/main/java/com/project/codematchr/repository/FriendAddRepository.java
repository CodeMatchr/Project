package com.project.codematchr.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.project.codematchr.entity.FriendAddEntity;

public interface FriendAddRepository extends JpaRepository<FriendAddEntity, String>{

    
    // description : 존재하는 유저(친구)인지 검증 //
    boolean existsByFriendEmail(String friendEmail);

    
    @Query(value = 
    "SELECT " +
    "friend_my_email, " +
    "friend_email " +
    "from friend ",
    nativeQuery = true
    )
    List<FriendAddEntity> getAddFriend(String friendMyEmail);

    // description : 친구 삭제 //
    @Transactional
    void deleteByFriendEmail(String friendEmail);

}
