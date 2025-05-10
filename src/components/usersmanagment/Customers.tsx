import { Users } from "../../App";
import { useSideBar } from "../sidebar";
import { useState, useEffect } from "react";

interface UsersProps {
  users: Users[];
}

const Customers: React.FC<UsersProps> = ({ users }) => {
  const { isOpen } = useSideBar();
  const [currentPage, setCurrentPage] = useState(1);
  const [on, setOn] = useState<{ [key: number]: boolean }>(() => {
    try {
      const saved = localStorage.getItem("customersCheckboxState");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const customersPerPage = 5;
  const totalPages = Math.ceil(users.length / customersPerPage);
  const startIndex = (currentPage - 1) * customersPerPage;
  const endIndex = startIndex + customersPerPage;
  const paginatedUsers = users.slice(startIndex, endIndex);

  useEffect(() => {
    try {
      localStorage.setItem("customersCheckboxState", JSON.stringify(on));
    } catch {
      console.warn("Failed to save checkbox state to localStorage.");
    }
  }, [on]);

  const handleCheckBox = (userId: number, checked: boolean) => {
    setOn((prev) => ({ ...prev, [userId]: checked }));
  };

  const handleAllCheckBoxes = (checked: boolean) => {
    const newAllOn: { [key: number]: boolean } = {};
    paginatedUsers.forEach((user) => {
      newAllOn[user.id] = checked;
    });
    setOn((prev) => ({ ...prev, ...newAllOn }));
  };

  return (
    <>
      <style>{`
        .dark .table,
        .dark .table thead,
        .dark .table tbody,
        .dark .table td,
        .dark .table th {
          background-color: #1e1e1e !important;
          color: white !important;
        }

        .dark .table-hover tbody tr:hover {
          background-color: #2a2a2a !important;
        }

        .dark .card {
          background-color: #1e1e1e !important;
          color: white !important;
        }

        .dark .text-muted {
          color: #ccc !important;
        }

        .dark .btn-outline-secondary {
          border-color: #777 !important;
          color: #ccc !important;
        }

        .dark .btn-dark {
          background-color: #fff !important;
          color: #000 !important;
        }

        .dark .badge.bg-info {
          background-color: #17a2b8 !important;
        }
      `}</style>

      <div
        className="d-flex justify-content-center align-items-center text-dark"
        style={{
          padding: "20px",
          minHeight: "100vh",
          marginLeft: isOpen ? "210px" : "0",
          transition: "0.5s ease all",
        }}
      >
        <div
          className="card shadow-lg w-100"
          style={{
            maxWidth: "1200px",
            borderRadius: "20px",
            padding: "20px",
          }}
        >
          <h3 className="text-center mb-4">👥 Customers</h3>

          <div className="table-responsive">
            <table className="table table-hover table-bordered text-center align-middle mb-0" style={{ border: "none" }}>
              <thead className="table-dark">
                <tr>
                  <th style={{border:"none"}}>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      onChange={(e) => handleAllCheckBoxes(e.target.checked)}
                      checked={paginatedUsers.every((u) => !!on[u.id])}
                    />
                  </th>
                  <th style={{border:"none"}}>Customer</th>
                  <th style={{border:"none"}}>Role</th>
                  <th style={{border:"none"}}>City</th>
                  <th style={{border:"none"}}>Phone</th>
                  <th style={{border:"none"}}>ID</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user) => (
                  <tr key={user.id} style={{border:"none"}}>
                    <td style={{ border: "none" }}>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        onChange={(e) => handleCheckBox(user.id, e.target.checked)}
                        checked={!!on[user.id]}
                      />
                    </td>
                    <td style={{ border: "none" }}>
                      <div className="d-flex flex-column align-items-center">
                        <img
                          src={user.image}
                          alt="userImg"
                          className="img-fluid rounded-circle mb-2"
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                          }}
                        />
                        <strong>{user.firstName} {user.lastName}</strong>
                        <small className="text-muted">{user.email}</small>
                      </div>
                    </td>
                    <td style={{ border: "none" }}>
                      <span className="badge bg-info text-white">{user.role}</span>
                    </td>
                    <td className="text-muted" style={{ border: "none" }}>{user.company.address.city}</td>
                    <td className="text-muted" style={{ border: "none" }}>{user.phone}</td>
                    <td className="text-muted" style={{ border: "none" }}>{user.id}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="d-flex justify-content-center gap-2 mt-4 flex-wrap">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`btn btn-sm ${
                    currentPage === index + 1
                      ? "btn-dark"
                      : "btn-outline-secondary"
                  }`}
                  style={{ minWidth: "40px", borderRadius: "8px" }}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Customers;
