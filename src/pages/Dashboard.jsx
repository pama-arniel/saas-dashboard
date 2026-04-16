import MainLayout from "../layout/MainLayout";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../services/api";
import { useState } from "react";

export default function Dashboard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const [sortOrder, setSortOrder] = useState("asc");

  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const [search, setSearch] = useState("");

  const filteredData = (data || []).filter((user) =>
    `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const sortedData = [...(filteredData || [])].sort((a, b) => {
    const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
    const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();

    if (sortOrder === "asc") return nameA.localeCompare(nameB);
    return nameB.localeCompare(nameA);
  });

  const start = (page - 1) * rowsPerPage;
  const paginatedData = (sortedData || []).slice(start, start + rowsPerPage);

  return (
    <MainLayout>
      <h1 style={{ marginBottom: "10px" }}>Users</h1>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading data</p>}

      <input
        placeholder="Search user..."
        style={{ marginBottom: "10px", padding: "5px" }}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      {data && (
        <div
          style={{
            background: "#fff",
            padding: "10px",
            borderRadius: "5px",
            maxWidth: "800px",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{ borderBottom: "1px solid #ccc", textAlign: "left" }}
                  onClick={() =>
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                  }
                >
                  Name
                </th>
                <th
                  style={{ borderBottom: "1px solid #ccc", textAlign: "left" }}
                >
                  Email
                </th>
              </tr>
            </thead>

            <tbody>
              {paginatedData.map((user) => (
                <tr key={user.id}>
                  <td style={{ padding: "8px 0" }}>
                    {user.firstName} {user.lastName}
                  </td>
                  <td style={{ padding: "8px 0" }}>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div style={{ marginTop: "10px" }}>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>Page {page}</span>

        <button
          onClick={() => setPage(page + 1)}
          disabled={start + rowsPerPage >= (filteredData || []).length}
        >
          Next
        </button>
      </div>
    </MainLayout>
  );
}
