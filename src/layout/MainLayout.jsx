export default function MainLayout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <aside style={{ width: "200px", background: "#222", color: "#fff" }}>
        Sidebar
      </aside>

      <main style={{ padding: "20px", flex: 1 }}>{children}</main>
    </div>
  );
}
