import { useEffect, useState } from "react";
import axios from '../api';
import "./ReportsPage.css";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

function ReportsPage() {

  const [summary, setSummary] = useState({
    totalCustomers: 0,
    totalOrnaments: 0,
    pendingPayments: 0,
    clearedPurchases: 0
  });

  const [lowStockCount, setLowStockCount] =
    useState(0);

  useEffect(() => {

    axios
      .get(`/dashboard/summary`)
      .then((response) => {
        setSummary(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`/ornaments/low-stock`)
      .then((response) => {
        setLowStockCount(response.data.length);
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  return (

    <div className="reports-page">

      <h1 className="reports-title">
        📊 Business Reports
      </h1>

      <div className="report-cards">

        <div className="report-card">
          <h5>Total Customers</h5>
          <h2>{summary.totalCustomers}</h2>
        </div>

        <div className="report-card">
          <h5>Total Ornaments</h5>
          <h2>{summary.totalOrnaments}</h2>
        </div>

        <div className="report-card">
          <h5>Pending Payments</h5>
          <h2>{summary.pendingPayments}</h2>
        </div>

        <div className="report-card">
          <h5>Low Stock Items</h5>
          <h2>{lowStockCount}</h2>
        </div>

      </div>

      <div className="chart-card">

        <h3 className="chart-title">
          📈 Business Overview
        </h3>

        <ResponsiveContainer
          width="100%"
          height={350}
        >

          <BarChart
            data={[
              {
                name: "Customers",
                value: summary.totalCustomers
              },
              {
                name: "Ornaments",
                value: summary.totalOrnaments
              },
              {
                name: "Pending",
                value: summary.pendingPayments
              },
              {
                name: "Low Stock",
                value: lowStockCount
              }
            ]}
          >

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="value"
              fill="#AD8330"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

      <div className="chart-card">

        <h3 className="chart-title">
          🥧 Pending vs Cleared Purchases
        </h3>

        <ResponsiveContainer
          width="100%"
          height={350}
        >

          <PieChart>

            <Pie
              data={[
                {
                  name: "Pending",
                  value:
                    summary.pendingPayments
                },
                {
                  name: "Cleared",
                  value:
                    summary.clearedPurchases
                }
              ]}
              cx="50%"
              cy="50%"
              outerRadius={120}
              dataKey="value"
              label
            >

              <Cell fill="#5d1E21" />

              <Cell fill="#154230" />

            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

      <div className="summary-card">

        <h3>
          📋 Detailed Summary
        </h3>

        <div className="summary-row">
          <span>Total Customers</span>
          <strong>
            {summary.totalCustomers}
          </strong>
        </div>

        <div className="summary-row">
          <span>Total Ornaments</span>
          <strong>
            {summary.totalOrnaments}
          </strong>
        </div>

        <div className="summary-row">
          <span>Pending Payments</span>
          <strong>
            {summary.pendingPayments}
          </strong>
        </div>

        <div className="summary-row">
          <span>Cleared Purchases</span>
          <strong>
            {summary.clearedPurchases}
          </strong>
        </div>

        <div className="summary-row">
          <span>Low Stock Items</span>
          <strong>
            {lowStockCount}
          </strong>
        </div>

      </div>

    </div>

  );

}

export default ReportsPage;
