package com.goldshop.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.goldshop.entity.Ornament;
import com.goldshop.repository.OrnamentRepository;

@Service
public class OrnamentService {

    @Autowired
    private OrnamentRepository repo;

    public List<Ornament> getAllOrnaments() {
        return repo.findAll();
    }

    public Ornament saveOrnament(Ornament ornament) {
        return repo.save(ornament);
    }
    public Ornament getOrnamentById(Integer id) {
        return repo.findById(id).orElse(null);
    }
    public List<Ornament> getOrnamentsByCategory(String category) {
        return repo.findByCategory(category);
    }
    public List<Ornament> getLowStockOrnaments() {
        return repo.findByStockAvailableLessThan(3);
    }
    public void deleteOrnament(Integer id) {
        repo.deleteById(id);
    }
    public Ornament updateOrnament(
            Integer id,
            Ornament ornament) {

        ornament.setOrnamentId(id);

        return repo.save(ornament);
    }
}
