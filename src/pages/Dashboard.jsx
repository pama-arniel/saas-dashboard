import { NavLink } from "react-router-dom";

export default function Dashboard() {
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
    <div className="screen shell-bg">
      <div className="surface dashboard-surface">
        <aside className="sidebar sidebar-light">
          <div className="brand-row">
            <div className="brand-badge">S</div>
            <div className="brand-name">Salezy</div>
          </div>

          <div className="side-section-title">Main Menu</div>
          <nav className="side-nav">
            <NavLink to="/overview" className="side-item active">
              Dashboard
            </NavLink>
            <a className="side-item" href="#orders">
              Orders
            </a>
            <a className="side-item" href="#message">
              Message
            </a>
            <a className="side-item" href="#products">
              Products
            </a>
            <a className="side-item" href="#reports">
              Reports
            </a>
            <a className="side-item" href="#marketplace">
              Marketplace
            </a>
          </nav>

          <div className="side-section-title">Tools</div>
          <nav className="side-nav">
            <a className="side-item" href="#hubspot">
              HubSpot Sales Hub
            </a>
            <a className="side-item" href="#zoho">
              Zoho CRM
            </a>
            <a className="side-item" href="#zendesk">
              Zendesk Sell
            </a>
            <NavLink to="/people" className="side-item">
              People Screen
            </NavLink>
          </nav>

          <div className="upgrade-card">
            <h4>Boost with AI</h4>
            <p>Get smart alerts and ready-made sales insights.</p>
            <button type="button">Upgrade to Pro</button>
          </div>
        </aside>

        <main className="content">
          <header className="topbar">
            <div className="topbar-search">
              Search orders, products, or customers...
            </div>
            <div className="topbar-right">
              <button type="button" className="ghost-button">
                This Month
              </button>
              <button type="button" className="solid-button">
                Export
              </button>
            </div>
          </header>

          <section className="welcome-row">
            <h1>Welcome back, Sajibul!</h1>
            <p>Monday, 24 December 2026</p>
          </section>

          <section className="metrics-grid">
            {metrics.map((metric) => (
              <article key={metric.label} className="metric-card">
                <div className="metric-label">{metric.label}</div>
                <div className="metric-value">{metric.value}</div>
                <div className="metric-delta">
                  {metric.delta} from the last month
                </div>
              </article>
            ))}
          </section>

          <section className="chart-grid">
            <article className="chart-card">
              <div className="chart-card-head">
                <div>
                  <h3>Revenue Insights</h3>
                  <div className="chart-big">$5,567.00</div>
                </div>
                <div className="chart-toggle">
                  <button type="button" className="ghost-button">
                    Monthly
                  </button>
                  <button type="button" className="solid-button small">
                    Yearly
                  </button>
                </div>
              </div>
              <div className="bars">
                {monthlyRevenue.map((bar) => (
                  <div key={bar.month} className="bar-wrap">
                    <div
                      className={`bar ${bar.highlight ? "highlight" : ""}`}
                      style={{ height: `${bar.value * 4}px` }}
                    />
                    <span>{bar.month}</span>
                  </div>
                ))}
              </div>
            </article>

            <article className="chart-card gauge-card">
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
                      <span
                        className={`status-chip ${row.status.toLowerCase()}`}
                      >
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
        </main>
      </div>
    </div>
  );
}
