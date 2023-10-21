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
  List<BoardViewEntity> findTop3ByOrderByBoardWriteDatetimeDesc();
  
  // description : TOP3 댓글순 //
  List<BoardViewEntity> findTop3ByOrderByBoardCommentCountDesc();
  
  // description : TOP3 좋아요순 //
  List<BoardViewEntity> findTop3ByOrderByBoardFavoriteCountDesc();

  // description : TOP3 조회수순 //
  List<BoardViewEntity> findTop3ByOrderByBoardViewCountDesc();
  
  // description : 특정 유저의 게시물 리스트 조회 //
  List<BoardViewEntity> findByWriterEmailOrderByBoardWriteDatetimeDesc(String writerEmail);
  
  // description : 검색어 리스트 조회 //
  List<BoardViewEntity> findByBoardTitleContainsOrBoardContentsContainsOrderByBoardWriteDatetimeDesc(String title, String contents);

  
  

}
