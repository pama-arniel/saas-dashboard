const people = [
  {
    name: "Junaid Ansari",
    email: "shayan.ali@gmail.com",
    members: "-",
    phone: "+1 (925) 589-2845",
    tags: ["Imam", "Muazzin", "Khateeb"],
    membership: "Individual",
  },
  {
    name: "Faisal Khan",
    email: "faisal.khan@gmail.com",
    members: "-",
    phone: "+1 (925) 589-2485",
    tags: ["Hafiz", "Alim", "Qari"],
    membership: "Individual",
  },
  {
    name: "Ayaan Khan",
    email: "ayaan.khan@gmail.com",
    members: "Brother",
    phone: "+1 (408) 555-0123",
    tags: ["Scholar", "Teacher", "Volunteer"],
    membership: "Family",
  },
  {
    name: "Fatima Zahra",
    email: "kamran.ali@gmail.com",
    members: "Sister",
    phone: "+1 (202) 555-0190",
    tags: ["Student", "Staff", "Visitor"],
    membership: "Family",
  },
  {
    name: "Nasir Sheikh",
    email: "nasir.sheikh@gmail.com",
    members: "-",
    phone: "+1 (512) 555-0167",
    tags: ["Khateeb", "Donor"],
    membership: "Individual",
  },
  {
    name: "Adnan Syed",
    email: "adnan.syed@gmail.com",
    members: "Brother",
    phone: "+1 (617) 555-0145",
    tags: ["Sadaqah Donor", "Sponsor"],
    membership: "Family",
  },
  {
    name: "Hassan Raza",
    email: "hassan.raza@gmail.com",
    members: "-",
    phone: "+1 (415) 555-0186",
    tags: ["Event Organizer", "Elder"],
    membership: "Individual",
  },
  {
    name: "Aisha Hassan",
    email: "saif.rahman@gmail.com",
    members: "Sister",
    phone: "+1 (321) 555-0105",
    tags: ["New Muslim", "Revert", "Youth"],
    membership: "Family",
  },
];

function initials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function People() {
  return (
    <>
      <header className="people-header">
        <div>
          <h1>People</h1>
          <p>Manage members, contacts, and tags in one place.</p>
        </div>
        <div className="people-actions">
          <input type="text" placeholder="Search people..." />
          <button type="button" className="ghost-button">
            Filter
          </button>
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
            {people.map((person) => (
              <tr key={`${person.email}-${person.phone}`}>
                <td>
                  <div className="name-cell">
                    <div className="avatar">{initials(person.name)}</div>
                    <span>{person.name}</span>
                  </div>
                </td>
                <td>{person.email}</td>
                <td>{person.members}</td>
                <td>{person.phone}</td>
                <td>
                  <div className="tag-list">
                    {person.tags.map((tag) => (
                      <span key={`${person.email}-${tag}`} className="tag-chip">
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td>{person.membership}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <footer className="people-footer">
        <span>Show Results:</span>
        <button type="button" className="ghost-button">
          15
        </button>
        <div className="pager">
          <button type="button" className="ghost-button">
            1
          </button>
          <button type="button" className="ghost-button">
            2
          </button>
          <button type="button" className="ghost-button">
            3
          </button>
        </div>
      </footer>
    </>
  );
}
