package com.goldshop.entity;

public class DashboardSummary {

    private long totalCustomers;
    private long totalOrnaments;
    private long pendingPayments; // or pendingPurchases
    private long clearedPurchases;
    private long totalUsers;
    private long totalPurchases;
    private double todaysSales;
    private double totalRevenue;

    public long getTotalCustomers() {
        return totalCustomers;
    }

    public void setTotalCustomers(long totalCustomers) {
        this.totalCustomers = totalCustomers;
    }

    public long getClearedPurchases() {
		return clearedPurchases;
	}

	public void setClearedPurchases(long clearedPurchases) {
		this.clearedPurchases = clearedPurchases;
	}

	public long getTotalOrnaments() {
        return totalOrnaments;
    }

    public void setTotalOrnaments(long totalOrnaments) {
        this.totalOrnaments = totalOrnaments;
    }

    public long getPendingPayments() {
        return pendingPayments;
    }

    public void setPendingPayments(long pendingPayments) {
        this.pendingPayments = pendingPayments;
    }

    public long getTotalUsers() { return totalUsers; }
    public void setTotalUsers(long totalUsers) { this.totalUsers = totalUsers; }

    public long getTotalPurchases() { return totalPurchases; }
    public void setTotalPurchases(long totalPurchases) { this.totalPurchases = totalPurchases; }

    public double getTodaysSales() { return todaysSales; }
    public void setTodaysSales(double todaysSales) { this.todaysSales = todaysSales; }

    public double getTotalRevenue() { return totalRevenue; }
    public void setTotalRevenue(double totalRevenue) { this.totalRevenue = totalRevenue; }
}