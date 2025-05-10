import { Users } from "../../App";
import { useSideBar } from "../sidebar";
import { useState } from "react";

interface PropsEmployee {
  users: Users[];
}

const Employees: React.FC<PropsEmployee> = ({ users }) => {
  const { isOpen } = useSideBar();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEmployees = users.filter((user) =>
    `${user.lastName} ${user.firstName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );
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
      className="d-flex justify-content-center align-items-center"
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
          backgroundColor: "#fff",
        }}
      >
    
        <h3 className="text-center mb-4">👔 Employees</h3>
        <div className="d-flex align-items-center justify-content-start  position-relative">
        <input type="text" 
        name="search" 
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="form-control m-4 position-absolute" 
        placeholder="Search Employee..." 
        style={{maxWidth:"300px",top:"-80px"}}/>
    </div>
        <div className="table-responsive">
          <table
            className="table align-middle text-center"
            style={{ borderCollapse: "collapse", border: "none" }}
          >
            <thead className="table-dark">
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>role</th>
                <th>City</th>
                <th>State</th>
                <th>Phone</th>
                <th>ID</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((user) => (
                <tr key={user.id}>
                  <td style={{ border: "none" }}>
                    <div className="d-flex flex-column align-items-center">
                      <img
                        src={user.image}
                        alt="employeeImage"
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          borderRadius: "50%",
                          marginBottom: "8px",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                        }}
                        className="img-fluid"
                      />
                      <strong style={{ fontSize: "16px" }}>
                        {user.lastName} {user.firstName}
                      </strong>
                      <small
                        style={{
                          fontSize: "12px",
                          color: "#6c757d",
                          marginTop: "2px",
                        }}
                      >
                        {user.email}
                      </small>
                    </div>
                  </td>

                  <td style={{ border: "none", fontSize: "14px", color: "#555" }}>
                    {user.company.department}
                  </td>

                  <td
                    style={{
                      border: "none",
                      fontSize: "14px",
                      color: "#555",
                      fontWeight: "bold",
                    }}
                  >
                    {user.company.title}
                  </td>

                  <td style={{ border: "none", fontSize: "14px", color: "#555" }}>
                    {user.address.city}
                  </td>

                  <td style={{ border: "none", fontSize: "14px", color: "#555" }}>
                    {user.address.state}
                  </td>

                  <td style={{ border: "none", fontSize: "14px", color: "#555" }}>
                    {user.phone}
                  </td>

                  <td style={{ border: "none", fontSize: "14px", color: "#555" }}>
                    {user.id}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  );
};

export default Employees;
