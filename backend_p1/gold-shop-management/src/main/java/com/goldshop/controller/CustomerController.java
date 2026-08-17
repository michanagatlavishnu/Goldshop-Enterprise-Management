package com.goldshop.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.goldshop.entity.Customer;
import com.goldshop.service.CustomerService;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "*")

@RestController
@RequestMapping("/customers")
public class CustomerController {

    @Autowired
    private CustomerService service;

    @GetMapping
    public List<Customer> getAllCustomers() {
        return service.getAllCustomers();
    }
    @GetMapping("/{id}")
    public Customer getCustomerById(@PathVariable Integer id) {
        return service.getCustomerById(id);
    }
    @GetMapping("/phone/{phone}")
    public Customer getCustomerByPhone(@PathVariable String phone) {
        return service.getCustomerByPhone(phone);
    }
    @GetMapping("/name/{name}")
    public List<Customer> getCustomerByName(
            @PathVariable String name)
    {
        return service.getCustomerByName(name);
    }

    @PostMapping
    public Customer saveCustomer(@RequestBody Customer customer) {
        return service.saveCustomer(customer);
    }

    @PutMapping("/{id}")
    public Customer updateCustomer(@PathVariable Integer id,
                                   @RequestBody Customer customer) {
        return service.updateCustomer(id, customer);
    }

    @DeleteMapping("/{id}")
    public String deleteCustomer(@PathVariable Integer id) {
        service.deleteCustomer(id);
        return "Customer Deleted Successfully";
    }
}