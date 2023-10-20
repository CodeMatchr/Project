package com.project.codematchr.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.project.codematchr.entity.RoomEntity;
import com.project.codematchr.entity.RoomViewEntity;

public interface RoomViewRepository extends JpaRepository<RoomViewEntity, Integer> {
    // 게시물 조회
    RoomViewEntity findByRoomNumber(Integer roomNumber);
    // 최신순 조회
    // List<RoomEntity> findByRoomNumberOrderByRoomDatetimeDesc();
}
