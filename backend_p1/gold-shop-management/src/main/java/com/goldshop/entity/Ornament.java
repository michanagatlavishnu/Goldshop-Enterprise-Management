package com.goldshop.entity;

import jakarta.persistence.Entity;

import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "ornaments")
public class Ornament {

    @Id
    private Integer ornamentId;

    private String ornamentName;

    private String category;

    private Double weight;

  

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

	public Double getWeight() {
		return weight;
	}

	public void setWeight(Double weight) {
		this.weight = weight;
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