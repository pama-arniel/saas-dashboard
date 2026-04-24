import { useEffect, useState } from "react";

export default function Dashboard() {
  const [chartsLoaded, setChartsLoaded] = useState(false);
  const [revenueView, setRevenueView] = useState("yearly");

  useEffect(() => {
    const timer = window.setTimeout(() => setChartsLoaded(true), 80);
    return () => window.clearTimeout(timer);
  }, []);

  const metrics = [
    { label: "Total Orders", value: "2,500", delta: "+4.9%" },
    { label: "Total Customers", value: "1,340", delta: "+2.7%" },
    { label: "Total Revenue", value: "$5,567", delta: "+4.9%" },
    { label: "Returning Buyers", value: "865", delta: "+3.4%" },
  ];

  const monthlyRevenue = [
    { month: "Jan", value: 18 },
    { month: "Feb", value: 21 },
    { month: "Mar", value: 24 },
    { month: "Apr", value: 22 },
    { month: "May", value: 26 },
    { month: "Jun", value: 20 },
    { month: "Jul", value: 33, highlight: true },
    { month: "Aug", value: 19 },
    { month: "Sep", value: 23 },
    { month: "Oct", value: 17 },
    { month: "Nov", value: 25 },
    { month: "Dec", value: 29 },
  ];

  const yearlyRevenue = [
    { month: "2021", value: 14 },
    { month: "2022", value: 19 },
    { month: "2023", value: 23 },
    { month: "2024", value: 28 },
    { month: "2025", value: 31, highlight: true },
    { month: "2026", value: 33 },
  ];

  const revenueData = revenueView === "monthly" ? monthlyRevenue : yearlyRevenue;
  const revenueTotal = revenueView === "monthly" ? "$486.00" : "$5,567.00";

  const recentSales = [
    {
      id: "789901",
      date: "2 Dec 2026",
      customer: "Oliver John Brown",
      category: "Shoes, Shirt",
      status: "Pending",
      items: "2 Items",
      total: "$789.00",
    },
    {
      id: "789902",
      date: "1 Dec 2026",
      customer: "Noah James Smith",
      category: "Sneakers, T-shirt",
      status: "Completed",
      items: "3 Items",
      total: "$967.00",
    },
    {
      id: "789903",
      date: "28 Nov 2026",
      customer: "Amelia Victoria",
      category: "Bags, Jacket",
      status: "Shipped",
      items: "1 Item",
      total: "$349.00",
    },
  ];

  return (
    <>
      <section className="welcome-row">
        <h1>Welcome back, Sajibul!</h1>
        <p>Monday, 24 December 2026</p>
      </section>

      <section className="metrics-grid">
        {metrics.map((metric) => (
          <article key={metric.label} className="metric-card">
            <div className="metric-label">{metric.label}</div>
            <div className="metric-value">{metric.value}</div>
            <div className="metric-delta">{metric.delta} from the last month</div>
          </article>
        ))}
      </section>

      <section className="chart-grid">
        <article className="chart-card">
          <div className="chart-card-head">
            <div>
              <h3>Revenue Insights</h3>
              <div className="chart-big">{revenueTotal}</div>
            </div>
            <div className="chart-toggle">
              <button
                type="button"
                className={
                  revenueView === "monthly" ? "solid-button small" : "ghost-button"
                }
                onClick={() => setRevenueView("monthly")}
                aria-pressed={revenueView === "monthly"}
              >
                Monthly
              </button>
              <button
                type="button"
                className={
                  revenueView === "yearly" ? "solid-button small" : "ghost-button"
                }
                onClick={() => setRevenueView("yearly")}
                aria-pressed={revenueView === "yearly"}
              >
                Yearly
              </button>
            </div>
          </div>
          <div className="bars">
            {revenueData.map((bar, index) => (
              <div key={bar.month} className="bar-wrap">
                <div
                  className={`bar ${bar.highlight ? "highlight" : ""} ${chartsLoaded ? "bar-loaded" : ""}`}
                  style={{
                    height: `${bar.value * 4}px`,
                    animationDelay: `${index * 55}ms`,
                  }}
                />
                <span>{bar.month}</span>
              </div>
            ))}
          </div>
        </article>

        <article className={`chart-card gauge-card ${chartsLoaded ? "gauge-loaded" : ""}`}>
          <h3>Sales Overview</h3>
          <div className="gauge">
            <div className="gauge-arc" />
            <div className="gauge-value">70.8%</div>
            <div className="gauge-label">Sales Growth</div>
          </div>
          <div className="gauge-foot">
            <div>
              <span>Sales</span>
              <strong>$3,884.00</strong>
            </div>
            <div>
              <span>Target</span>
              <strong>$20,000.00</strong>
            </div>
          </div>
        </article>
      </section>

      <section className="table-card">
        <div className="table-head">
          <h3>Recent Sales</h3>
          <input type="text" placeholder="Search" />
        </div>
        <table>
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Category</th>
              <th>Status</th>
              <th>Items</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {recentSales.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.date}</td>
                <td>{row.customer}</td>
                <td>{row.category}</td>
                <td>
                  <span className={`status-chip ${row.status.toLowerCase()}`}>
                    {row.status}
                  </span>
                </td>
                <td>{row.items}</td>
                <td>{row.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
