package com.goldshop.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.goldshop.entity.Ornament;
import com.goldshop.service.OrnamentService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;

@CrossOrigin(origins = "${FRONTEND_URL:http://localhost:5173}")

@RestController
@RequestMapping("/ornaments")
public class OrnamentController {

    @Autowired
    private OrnamentService service;

    @GetMapping
    public List<Ornament> getAllOrnaments() {
        return service.getAllOrnaments();
    }
    @GetMapping("/{id}")
    public Ornament getOrnamentById(@PathVariable Integer id) {
        return service.getOrnamentById(id);
    }
    @GetMapping("/category/{category}")
    public List<Ornament> getOrnamentsByCategory(@PathVariable String category) {
        return service.getOrnamentsByCategory(category);
    }
    @GetMapping("/low-stock")
    public List<Ornament> getLowStockOrnaments() {
        return service.getLowStockOrnaments();
    }
    @PutMapping("/{id}")
    public Ornament updateOrnament(
            @PathVariable Integer id,
            @RequestBody Ornament ornament) {

        return service.updateOrnament(id, ornament);
    }

    @PostMapping
    public Ornament saveOrnament(@RequestBody Ornament ornament) {
        return service.saveOrnament(ornament);
    }
    @DeleteMapping("/{id}")
    public String deleteOrnament(@PathVariable Integer id) {
        service.deleteOrnament(id);
        return "Ornament Deleted Successfully";
    }
}
