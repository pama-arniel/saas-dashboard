import { useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const topbarTitleByPath = {
  "/overview": "Overview",
  "/people": "People",
};

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="6" />
      <line x1="16.5" y1="16.5" x2="21" y2="21" />
    </svg>
  );
}

function HelpIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 16h.01" />
      <path d="M9.5 9a2.5 2.5 0 1 1 5 1c0 1.5-1 2-1.75 2.5" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18 16.5V11a6 6 0 0 0-12 0v5.5L4 18h16l-2-1.5Z" />
      <path d="M9 20a3 3 0 0 0 6 0" />
    </svg>
  );
}

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const topbarTitle = topbarTitleByPath[location.pathname] || "Overview";
  const closeSidebar = () => setSidebarOpen(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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
                <SearchIcon />
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
                <HelpIcon />
              </button>
              <button
                type="button"
                className="icon-circle"
                aria-label="Notifications"
              >
                <BellIcon />
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="logout-button"
                aria-label="Logout"
              >
                Logout
                <span aria-hidden="true">↩</span>
              </button>
            </div>
          </header>

          <Outlet />
        </main>
      </div>
    </div>
  );
}
