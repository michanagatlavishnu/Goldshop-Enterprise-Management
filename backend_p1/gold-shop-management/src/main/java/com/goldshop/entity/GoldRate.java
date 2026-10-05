package com.goldshop.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "gold_rates")
public class GoldRate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Double gold22;
    private Double gold24;
    private Double gold18;
    private Double silver;
    private Double yesterdayGold22;
    
    private LocalDateTime lastUpdated;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Double getGold22() {
        return gold22;
    }

    public void setGold22(Double gold22) {
        this.gold22 = gold22;
    }

    public Double getGold24() {
        return gold24;
    }

    public void setGold24(Double gold24) {
        this.gold24 = gold24;
    }

    public Double getGold18() {
        return gold18;
    }

    public void setGold18(Double gold18) {
        this.gold18 = gold18;
    }

    public Double getSilver() {
        return silver;
    }

    public void setSilver(Double silver) {
        this.silver = silver;
    }

    public Double getYesterdayGold22() {
        return yesterdayGold22;
    }

    public void setYesterdayGold22(Double yesterdayGold22) {
        this.yesterdayGold22 = yesterdayGold22;
    }

    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(LocalDateTime lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
}
