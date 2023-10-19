package com.project.codematchr.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.codematchr.entity.RoomEntity;

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
}
