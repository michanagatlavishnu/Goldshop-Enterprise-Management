package com.goldshop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.goldshop.entity.Ornament;

public interface OrnamentRepository
        extends JpaRepository<Ornament, Integer> {
           
	List<Ornament> findByCategory(String category);
	List<Ornament> findByStockAvailableLessThan(Integer stock);
}