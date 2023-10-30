package com.project.codematchr.repository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.project.codematchr.entity.BoardViewEntity;

@Repository
public interface BoardViewRepository extends JpaRepository<BoardViewEntity, Integer> {
  
  BoardViewEntity findByBoardNumber(Integer boardNumber);

  List<BoardViewEntity> findTop3ByOrderByBoardWriteDatetimeDesc();
  
  List<BoardViewEntity> findTop3ByOrderByBoardCommentCountDesc();
  
  List<BoardViewEntity> findTop3ByOrderByBoardFavoriteCountDesc();

  List<BoardViewEntity> findTop3ByOrderByBoardViewCountDesc();
  
  List<BoardViewEntity> findByUserEmailOrderByBoardWriteDatetimeDesc(String writerEmail);
  
  List<BoardViewEntity> findByBoardTitleContainsOrBoardContentsContainsOrderByBoardWriteDatetimeDesc(String title, String contents);

}
