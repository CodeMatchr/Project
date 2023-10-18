package com.project.codematchr.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.codematchr.entity.BoardViewEntity;

@Repository
public interface BoardViewRepository extends JpaRepository<BoardViewEntity, Integer> {
  
  // description : 게시물 조회 //
  BoardViewEntity findByBoardNumber(Integer boardNumber);

  // description : TOP3 최신순 //
  List<BoardViewEntity> findTop3ByOrderByWriteDatetimeDesc();
  
  // description : TOP3 댓글순 //
  List<BoardViewEntity> findTop3ByOrderByCommentCountDesc();
  
  // description : TOP3 좋아요순 //
  List<BoardViewEntity> findTop3ByOrderByFavoriteCountDesc();

  // description : TOP3 조회수순 //
  List<BoardViewEntity> findTop3ByOrderByViewCountDesc();
  
  // description : 특정 유저의 게시물 리스트 조회 //
  List<BoardViewEntity> findByWriterEmailOrderByWriteDatetimeDesc(String writerEmail);
  
  // description : 검색어 리스트 조회 //
  List<BoardViewEntity> findByTitleContainsOrContentsContainsOrderByWriteDatetimeDesc(String title, String contents);

  

}
