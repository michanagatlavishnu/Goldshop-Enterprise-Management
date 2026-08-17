package com.goldshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.goldshop.entity.GoldRate;

public interface GoldRateRepository
        extends JpaRepository<GoldRate, Integer> {

}