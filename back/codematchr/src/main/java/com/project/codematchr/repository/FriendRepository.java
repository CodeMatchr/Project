package com.project.codematchr.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.codematchr.entity.FriendViewEntity;
import com.project.codematchr.entity.pk.FriendPk;

@Repository
public interface FriendRepository extends JpaRepository<FriendViewEntity, FriendPk> {

  // description : 친구 추가한 리스트 조회 //
  List<FriendViewEntity> findByFriendMyEmailOrderByFriendEmailDesc(String friendMyEmail);
    

}
