package com.goldshop.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "ornaments")
public class Ornament {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ornamentId;

    private String ornamentName;
    private String category;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    private String purity; // e.g. 24K, 22K, 18K
    private Double weight; // in grams
    private Double makingCharge; // per gram or fixed
    private Double price; // calculated or fixed price
    private Integer stockAvailable;
    
    @Column(name = "image_url", columnDefinition = "LONGTEXT")
    private String imageUrl;

    public Integer getOrnamentId() {
        return ornamentId;
    }

    public void setOrnamentId(Integer ornamentId) {
        this.ornamentId = ornamentId;
    }

    public String getOrnamentName() {
        return ornamentName;
    }

    public void setOrnamentName(String ornamentName) {
        this.ornamentName = ornamentName;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPurity() {
        return purity;
    }

    public void setPurity(String purity) {
        this.purity = purity;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public Double getMakingCharge() {
        return makingCharge;
    }

    public void setMakingCharge(Double makingCharge) {
        this.makingCharge = makingCharge;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getStockAvailable() {
        return stockAvailable;
    }

    public void setStockAvailable(Integer stockAvailable) {
        this.stockAvailable = stockAvailable;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}