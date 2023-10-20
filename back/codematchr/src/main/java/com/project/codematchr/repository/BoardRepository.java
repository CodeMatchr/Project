package com.project.codematchr.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.project.codematchr.entity.BoardEntity;
import com.project.codematchr.entity.resultSet.BoardListResultSet;

@Repository
public interface BoardRepository extends JpaRepository<BoardEntity, Integer> {

    boolean existsByBoardNumber(Integer boardNumber);
    BoardEntity findByBoardNumber(Integer boardNumber);
    
    // board : 게시물 최신순 리스트 불러오기 //
    @Query(
        value = 
        "SELECT " +
        "B.board_number AS boardNumber, " +
        "B.board_title AS boardTitle, " +
        "B.board_contents AS boardContents, " +
        "B.board_image_url AS boardImageUrl, " +
        "B.board_view_count AS boardViewCount, " +
        "B.board_comment_count AS boardCommentCount, " +
        "B.board_favorite_count AS boardFavoriteCount, " +
        "B.board_write_datetime AS boardWriteDatetime, " +
        "B.board_writer_email AS boardWriterEmail, " +
        "U.user_nickname AS userNickname, " +
        "U.user_profile_image_url AS userProfileImageUrl " +
        "FROM board AS B " +
        "INNER JOIN user AS U " +
        "ON B.board_writer_email = U.user_email " +
        "ORDER BY B.board_write_datetime DESC " +
        "LIMIT ?1, 50",
        nativeQuery = true
    )
    List<BoardListResultSet> getBoardList(Integer boardNumbers);

    // board : 게시물 좋아요 리스트 불러오기 //
    @Query(
        value = 
        "SELECT " +
        "B.board_number AS boardNumber, " +
        "B.board_title AS boardTitle, " +
        "B.board_contents AS boardContents, " +
        "B.board_image_url AS boardImageUrl, " +
        "B.board_view_count AS boardViewCount, " +
        "B.board_comment_count AS boardCommentCount, " +
        "B.board_favorite_count AS boardFavoriteCount, " +
        "B.board_write_datetime AS boardWriteDatetime, " +
        "B.board_writer_email AS boardWriterEmail, " +
        "U.user_nickname AS userNickname, " +
        "U.user_profile_image_url AS userProfileImageUrl " +
        "FROM board AS B " +
        "INNER JOIN user AS U " +
        "ON B.board_writer_email = U.user_email " +
        "ORDER BY B.board_favorite_count DESC " +
        "LIMIT ?1, 50",
        nativeQuery = true
    )
    List<BoardListResultSet> getBoardFavoriteList(Integer boardNumbers);

    // board : 게시물 조회수 리스트 불러오기 //
    @Query(
        value = 
        "SELECT " +
        "B.board_number AS boardNumber, " +
        "B.board_title AS boardTitle, " +
        "B.board_contents AS boardContents, " +
        "B.board_image_url AS boardImageUrl, " +
        "B.board_view_count AS boardViewCount, " +
        "B.board_comment_count AS boardCommentCount, " +
        "B.board_favorite_count AS boardFavoriteCount, " +
        "B.board_write_datetime AS boardWriteDatetime, " +
        "B.board_writer_email AS boardWriterEmail, " +
        "U.user_nickname AS userNickname, " +
        "U.user_profile_image_url AS userProfileImageUrl " +
        "FROM board AS B " +
        "INNER JOIN user AS U " +
        "ON B.board_writer_email = U.user_email " +
        "ORDER BY B.board_view_count DESC " +
        "LIMIT ?1, 50",
        nativeQuery = true
    )
    List<BoardListResultSet> getBoardViewList(Integer boardNumbers);

    // board : 게시물 댓글 리스트 불러오기 //
    @Query(
        value = 
        "SELECT " +
        "B.board_number AS boardNumber, " +
        "B.board_title AS boardTitle, " +
        "B.board_contents AS boardContents, " +
        "B.board_image_url AS boardImageUrl, " +
        "B.board_view_count AS boardViewCount, " +
        "B.board_comment_count AS boardCommentCount, " +
        "B.board_favorite_count AS boardFavoriteCount, " +
        "B.board_write_datetime AS boardWriteDatetime, " +
        "B.board_writer_email AS boardWriterEmail, " +
        "U.user_nickname AS userNickname, " +
        "U.user_profile_image_url AS userProfileImageUrl " +
        "FROM board AS B " +
        "INNER JOIN user AS U " +
        "ON B.board_comment_count = U.user_email " +
        "ORDER BY B.board_view_count DESC " +
        "LIMIT ?1, 50",
        nativeQuery = true
    )
    List<BoardListResultSet> getBoardCommentList(Integer boardNumbers);
}
