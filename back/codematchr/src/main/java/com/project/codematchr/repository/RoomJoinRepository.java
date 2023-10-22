package com.project.codematchr.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.codematchr.entity.RoomJoinEntity;

@Repository
public interface RoomJoinRepository extends JpaRepository<RoomJoinEntity, Integer> {
    // 특정 다인원 채팅방에 속해있는 사용자 이메일 확인 //
    RoomJoinEntity findByUserEmail(String userEmail);
    // 특정 다인원 채팅방의 번호
    RoomJoinEntity findByRoomNumber(Integer roomNumber);
}
