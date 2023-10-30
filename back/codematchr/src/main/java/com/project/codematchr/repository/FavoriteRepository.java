package com.project.codematchr.repository;
import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.project.codematchr.entity.FavoriteEntity;
import com.project.codematchr.entity.pk.FavoritePk;

@Repository
public interface FavoriteRepository extends JpaRepository<FavoriteEntity, FavoritePk> {
  
  boolean existsByFavoriteUserEmailAndFavoriteBoardNumber(String FavoriteUserEmail, Integer FavoriteBoardNumber);

  @Transactional
  void deleteByFavoriteBoardNumber(Integer FavoriteBoardNumber);

}
