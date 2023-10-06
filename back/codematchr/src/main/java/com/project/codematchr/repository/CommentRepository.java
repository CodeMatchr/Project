package com.project.codematchr.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.project.codematchr.entity.CommentEntity;
import com.project.codematchr.entity.resultSet.CommentListResultSet;

@Repository
public interface CommentRepository extends JpaRepository<CommentEntity, Integer>{
  
  @Query(
    value = 
    "SELECT " + 
    "U.user_profile_image_url AS profileImageUrl, " +
    "U.user_nickname AS nickname, " +
    "C.comment_contents AS contents, " +
    "C.comment_write_datetime AS writeDatetime " +
    "FROM Comment AS C INNER JOIN user AS U " +
    "ON C.comment_user_email = U.user_email " +
    "WHERE comment_board_number = ?1 " + 
    "ORDER BY C.comment_write_datetime DESC",
    nativeQuery = true
  )
  List<CommentListResultSet> getCommentList(Integer commentBoardNumber);

  @Transactional
  void deleteByCommentBoardNumber(Integer commentBoardNumber);

}
