package com.project.codematchr.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.codematchr.entity.RoomViewEntity;

public interface RoomViewRepository extends JpaRepository<RoomViewEntity, Integer> {
    // 게시물 조회 //
    RoomViewEntity findByRoomNumber(Integer roomNumber);
    // 다인원 채팅방 리스트 조회(최신순) - 모든 리스트 조회(비회원도 가능) //
    // List<RoomEntity> findByRoomNumberOrderByRoomDatetimeDesc();
    // 특정 사용자의 다인원 채팅방 리스트 조회(최신순) //
    List<RoomViewEntity> findByRoomManagerEmailOrderByRoomDatetimeDesc(String userEmail);
}
