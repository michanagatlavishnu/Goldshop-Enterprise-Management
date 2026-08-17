package com.goldshop.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.goldshop.entity.Customer;
import com.goldshop.repository.CustomerRepository;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository repo;

    public List<Customer> getAllCustomers() {
        return repo.findAll();
    }

    public Customer saveCustomer(Customer customer) {
        return repo.save(customer);
    }

    public Customer updateCustomer(Integer id, Customer customer) {
        customer.setCustomerId(id);
        return repo.save(customer);
    }
    public void deleteCustomer(Integer id) {
        repo.deleteById(id);
    }
    public Customer getCustomerById(Integer id) {
        return repo.findById(id).orElse(null);
    }
    public Customer getCustomerByPhone(String phone) {
        return repo.findByPhone(phone);
    }	
    public List<Customer> getCustomerByName(String name)
    {
        return repo.findByNameContainingIgnoreCase(name);
    }
}