package com.goldshop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.goldshop.entity.Purchase;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PurchaseRepository
        extends JpaRepository<Purchase, Integer> {
   
	List<Purchase> findByBalanceAmountGreaterThan(Double amount);
	long countByBalanceAmountGreaterThan(Double amount);

	long countByBalanceAmountEquals(Double amount);
	
	List<Purchase> findByCustomerId(Integer customerId);
	
	@Query("""
			SELECT p
			FROM Purchase p
			WHERE p.customerId IN
			(
			SELECT c.customerId
			FROM Customer c
			WHERE LOWER(c.name)
			LIKE LOWER(CONCAT('%', :name, '%'))
			)
			""")
	List<Purchase> findByCustomerName(@Param("name") String name);

    @Query("SELECT SUM(p.totalCost) FROM Purchase p WHERE p.status != 'CANCELLED'")
    Double getTotalRevenue();

    @Query("SELECT SUM(p.totalCost) FROM Purchase p WHERE p.status != 'CANCELLED' AND p.purchaseDate LIKE CONCAT(:datePrefix, '%')")
    Double getTodaysSales(@Param("datePrefix") String datePrefix);
}

