	package com.goldshop.service;
	
	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.stereotype.Service;
	
	import com.goldshop.entity.DashboardSummary;
	
	import com.goldshop.repository.CustomerRepository;
	import com.goldshop.repository.OrnamentRepository;
	import com.goldshop.repository.PurchaseRepository;
	
	@Service
	public class DashboardService {
	
	    @Autowired
	    private CustomerRepository customerRepo;
	
	    @Autowired
	    private OrnamentRepository ornamentRepo;
	
	    @Autowired
	    private PurchaseRepository purchaseRepo;
	
	    public long getTotalCustomers() {
	        return customerRepo.count();
	    }
	
	    public long getTotalOrnaments() {
	        return ornamentRepo.count();
	    }
	
	    public long getTotalPurchases() {
	        return purchaseRepo.count();
	    }
	    public DashboardSummary getSummary() {
	
	        DashboardSummary summary = new DashboardSummary();
	
	        summary.setTotalCustomers(customerRepo.count());
	        summary.setTotalOrnaments(ornamentRepo.count());
	        summary.setPendingPayments(
	        	    purchaseRepo
	        	      .findByBalanceAmountGreaterThan(0.0)
	        	      .size()
	        	);
	        summary.setPendingPayments(
	        	    purchaseRepo
	        	      .countByBalanceAmountGreaterThan(0.0)
	        	);

	        	summary.setClearedPurchases(
	        	    purchaseRepo
	        	      .countByBalanceAmountEquals(0.0)
	        	);
	
	        return summary;
	        

	    }   	
	    
	}