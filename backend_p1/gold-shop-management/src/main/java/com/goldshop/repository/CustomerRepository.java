package com.goldshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.goldshop.entity.Customer;

import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
   
	Customer findByPhone(String phone);
	
	List<Customer> findByNameContainingIgnoreCase(String name);


}
