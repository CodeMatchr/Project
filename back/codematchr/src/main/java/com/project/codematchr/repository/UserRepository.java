package com.project.codematchr.repository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.project.codematchr.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, String> {
    
    boolean existsByUserEmail(String userEmail);
    
    boolean existsByUserNickname(String userNickname);
    
    boolean existsByUserPassword(String userPassword);
    
    boolean existsByUserTelnumber(String userTelnumber);
    
    UserEntity findByUserEmail(String userEmail);

    @Query(value = 
    "SELECT  * " +
    "from user AS U " +
    "INNER join favorite AS F " +
    "on U.user_email = F.favorite_user_email " +
    "WHERE favorite_board_number = ?1 ",
    nativeQuery = true
  ) 
  List<UserEntity> getFavoriteList(Integer boardNumber);

  @Query(value = 
  "SELECT " +
	"user_email, " +
	"user_nickname, " +
	"user_state_message, " +
	"user_profile_image_url " +
	"FROM `user` " +
	"WHERE user_email IN ( " +
    "SELECT friend_email " +
    "FROM friend " +
    ") ",
    nativeQuery = true
  )
  List<UserEntity> getFriendTltalList(String friendMyEmail);
  
}
