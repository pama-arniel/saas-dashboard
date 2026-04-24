import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../services/api";

const PAGE_SIZE = 10;

const SORT_OPTIONS = [
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
  { value: "email-asc", label: "Email (A-Z)" },
  { value: "email-desc", label: "Email (Z-A)" },
];

function initials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function mapUserToPerson(user) {
  const fullName = `${user.firstName} ${user.lastName}`;

  return {
    id: user.id,
    name: fullName,
    email: user.email,
    members: user.gender === "female" ? "Sister" : "Brother",
    phone: user.phone,
    tags: [
      user.company?.department,
      user.company?.title,
      user.university,
    ].filter(Boolean),
    membership: user.company?.department ? "Family" : "Individual",
    avatar: user.image,
  };
}

function sortPeople(people, sortValue) {
  const [field, direction] = sortValue.split("-");
  const multiplier = direction === "desc" ? -1 : 1;

  return [...people].sort((a, b) => {
    const aValue = (a[field] ?? "").toString().toLowerCase();
    const bValue = (b[field] ?? "").toString().toLowerCase();

    if (aValue < bValue) {
      return -1 * multiplier;
    }

    if (aValue > bValue) {
      return 1 * multiplier;
    }

    return 0;
  });
}

export default function People() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name-asc");
  const [page, setPage] = useState(1);

  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["people"],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5,
  });

  const people = useMemo(() => data.map(mapUserToPerson), [data]);

  const filteredAndSortedPeople = useMemo(() => {
    const trimmed = searchQuery.trim().toLowerCase();
    const filtered = trimmed
      ? people.filter((person) => {
          const joinedTags = person.tags.join(" ").toLowerCase();
          return (
            person.name.toLowerCase().includes(trimmed) ||
            person.email.toLowerCase().includes(trimmed) ||
            person.phone.toLowerCase().includes(trimmed) ||
            joinedTags.includes(trimmed)
          );
        })
      : people;

    return sortPeople(filtered, sortBy);
  }, [people, searchQuery, sortBy]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredAndSortedPeople.length / PAGE_SIZE),
  );

  const paginatedPeople = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredAndSortedPeople.slice(start, start + PAGE_SIZE);
  }, [filteredAndSortedPeople, page]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(1);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setPage(1);
  };

  const goToPreviousPage = () => {
    setPage((currentPage) => Math.max(1, currentPage - 1));
  };

  const goToNextPage = () => {
    setPage((currentPage) => Math.min(totalPages, currentPage + 1));
  };

  const visibleResults = paginatedPeople.length;

  return (
    <>
      <header className="people-header">
        <div>
          <h1>People</h1>
          <p>Manage members, contacts, and tags in one place.</p>
        </div>
        <div className="people-actions">
          <input
            type="text"
            placeholder="Search people by name, email, phone, or tag..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <select
            className="people-sort-select"
            value={sortBy}
            onChange={handleSortChange}
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button type="button" className="solid-button">
            Add People
          </button>
        </div>
      </header>

      <section className="table-card people-table-wrap">
        <div className="table-head">
          <h3>People Directory</h3>
          <div className="tab-row">
            <button type="button" className="tab active">
              People
            </button>
            <button type="button" className="tab">
              Membership
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="people-state">Loading people...</div>
        ) : null}

        {isError ? (
          <div className="people-state people-error">
            Failed to load people: {error?.message || "Unknown error"}
          </div>
        ) : null}

        {!isLoading && !isError ? (
          <>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email Address</th>
                  <th>Members</th>
                  <th>Phone Number</th>
                  <th>Tag</th>
                  <th>Membership</th>
                </tr>
              </thead>
              <tbody>
                {paginatedPeople.length === 0 ? (
                  <tr>
                    <td colSpan="6">
                      <div className="people-state">
                        No people matched your search.
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedPeople.map((person) => (
                    <tr key={person.id}>
                      <td>
                        <div className="name-cell">
                          {person.avatar ? (
                            <img
                              src={person.avatar}
                              alt={person.name}
                              className="avatar-image"
                              loading="lazy"
                            />
                          ) : (
                            <div className="avatar">
                              {initials(person.name)}
                            </div>
                          )}
                          <span>{person.name}</span>
                        </div>
                      </td>
                      <td>{person.email}</td>
                      <td>{person.members}</td>
                      <td>{person.phone}</td>
                      <td>
                        <div className="tag-list">
                          {person.tags.map((tag) => (
                            <span
                              key={`${person.id}-${tag}`}
                              className="tag-chip"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td>{person.membership}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            <div className="people-mobile-list">
              {paginatedPeople.length === 0 ? (
                <div className="people-state">
                  No people matched your search.
                </div>
              ) : (
                paginatedPeople.map((person) => (
                  <article
                    key={`mobile-${person.id}`}
                    className="people-mobile-card"
                  >
                    <div className="name-cell">
                      {person.avatar ? (
                        <img
                          src={person.avatar}
                          alt={person.name}
                          className="avatar-image"
                          loading="lazy"
                        />
                      ) : (
                        <div className="avatar">{initials(person.name)}</div>
                      )}
                      <div>
                        <strong>{person.name}</strong>
                        <p>{person.email}</p>
                      </div>
                    </div>
                    <div className="people-mobile-meta">
                      <span>{person.phone}</span>
                      <span>{person.membership}</span>
                    </div>
                    <div className="tag-list">
                      {person.tags.map((tag) => (
                        <span
                          key={`mobile-${person.id}-${tag}`}
                          className="tag-chip"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                ))
              )}
            </div>
          </>
        ) : null}
      </section>

      <footer className="people-footer">
        <span>
          Showing {visibleResults} of {filteredAndSortedPeople.length} results
        </span>
        <div className="pager">
          <button
            type="button"
            className="ghost-button"
            onClick={goToPreviousPage}
            disabled={page === 1}
          >
            Prev
          </button>
          <span className="page-status">
            Page {page} of {totalPages}
          </span>
          <button
            type="button"
            className="ghost-button"
            onClick={goToNextPage}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </footer>
    </>
  );
}
