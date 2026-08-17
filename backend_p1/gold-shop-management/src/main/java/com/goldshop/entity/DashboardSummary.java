package com.goldshop.entity;

public class DashboardSummary {

    private long totalCustomers;
    private long totalOrnaments;
    private long pendingPayments;
    private long clearedPurchases;

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
}