package com.project.codematchr.repository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.project.codematchr.entity.CompareEntity;

public interface CompareRepository extends JpaRepository<CompareEntity, Integer> {

    List<CompareEntity> findByCompareUserEmailOrderByCompareDatetime(String compareUserEmail);
    
}
