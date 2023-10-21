package com.project.codematchr.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.codematchr.entity.RoomJoinEntity;

public interface RoomJoinRepository extends JpaRepository<RoomJoinEntity, Integer> {
    
}
