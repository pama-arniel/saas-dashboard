import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const topbarTitleByPath = {
  "/overview": "Overview",
  "/people": "People",
};

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const topbarTitle = topbarTitleByPath[location.pathname] || "Overview";
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="screen shell-bg">
      <div className="surface dashboard-surface">
        {sidebarOpen && (
          <div className="sidebar-overlay" onClick={closeSidebar} />
        )}
        <aside className={`sidebar sidebar-light ${sidebarOpen ? "open" : ""}`}>
          <div className="brand-row">
            <div className="brand-badge">S</div>
            <div className="brand-name">Salezy</div>
          </div>

          <div className="side-section-title">Main Menu</div>
          <nav className="side-nav">
            <NavLink
              to="/overview"
              className={({ isActive }) =>
                isActive ? "side-item active" : "side-item"
              }
              onClick={closeSidebar}
            >
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
            <NavLink
              to="/people"
              className={({ isActive }) =>
                isActive ? "side-item active" : "side-item"
              }
              onClick={closeSidebar}
            >
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
          <header className="main-topbar">
            <div className="main-topbar-left">
              <button
                type="button"
                className="menu-toggle"
                aria-label="Toggle menu"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                ≡
              </button>

              <h2 className="main-topbar-title">{topbarTitle}</h2>
            </div>

            <div className="main-topbar-search-wrap">
              <div className="main-topbar-search">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M10 4a6 6 0 1 1 0 12 6 6 0 0 1 0-12zm0-2a8 8 0 1 0 4.9 14.3l4.4 4.4 1.4-1.4-4.4-4.4A8 8 0 0 0 10 2z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search orders, products, or customers..."
                />
                <span className="kbd-chip">K</span>
                <button type="button" className="search-clear">
                  x
                </button>
              </div>
            </div>

            <div className="main-topbar-right">
              <button type="button" className="icon-circle" aria-label="Help">
                ?
              </button>
              <button
                type="button"
                className="icon-circle"
                aria-label="Notifications"
              >
                o
              </button>
              <button type="button" className="avatar-btn" aria-label="Profile">
                SJ
              </button>
            </div>
          </header>

          <Outlet />
        </main>
      </div>
    </div>
  );
}
