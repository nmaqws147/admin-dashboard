import { useState } from "react";
import { useSideBar } from "../sidebar";
import { Products } from "../../App";

interface PropsProducts {
  products: Products[];
}

const Orders: React.FC<PropsProducts> = ({ products }) => {
  const { isOpen } = useSideBar();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);
  const totalPages = Math.ceil(products.length / itemsPerPage);
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
      className="d-flex justify-content-center align-items-start"
      style={{
        marginLeft: isOpen ? "240px" : "0",
        transition: "0.5s ease all",
        padding: "20px",
        minHeight: "100vh",
      }}
    >
      <div
        className="card shadow-lg w-100 bg-[#fafafa] text-black dark:bg-[#1e1e1e] dark:text-white"
        style={{
          maxWidth: "1200px",
          borderRadius: "20px",
          padding: "20px",
        }}
      >
        <h3 className="text-center mb-4">🛒 Orders</h3>

        <div className="table-responsive bg-[#fafafa] text-black dark:bg-[#1e1e1e] dark:text-white">
          <table className="table table-bordered  align-middle text-center">
            <thead className="table-dark">
              <tr>
                <th style={{border:"none"}}>Image</th>
                <th style={{border:"none"}}>Title</th>
                <th style={{border:"none"}}>Price</th>
                <th style={{border:"none"}}>Rating</th>
                <th style={{border:"none"}}>Brand</th>
                <th style={{border:"none"}}>Shipping</th>
              </tr>
            </thead>
            <tbody style={{border:"none"}}>
              {currentProducts.map((product) => (
                <tr key={product.id} style={{border:"none"}}>
                  <td style={{border:"none"}}>
                    <img
                      src={product.images[0]}
                      alt="OrderImg"
                      style={{
                        width: "70px",
                        height: "90px",
                        borderRadius: "10px",
                      }}
                      className="img-fluid shadow-sm"
                    />
                  </td>
                  <td style={{border:"none"}}>{product.title}</td>
                  <td style={{border:"none"}}>
                    <span className="badge bg-info text-light">${product.price}</span>
                  </td>
                  <td style={{border:"none"}}>
                  {
                    product.rating < 3 ? (
                      <span className="badge bg-danger text-light">{product.rating}★</span>
                    ) : product.rating < 4.5? (
                      <span className="badge bg-warning text-light">{product.rating}★</span>
                    ) : (
                      <span className="badge bg-success text-light">{product.rating}★</span>
                    )
                  }
                  </td>
                  <td style={{border:"none"}}>{product.brand}</td>
                  <td style={{border:"none"}}>{product.shippingInformation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-center gap-2 mt-4 flex-wrap">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`btn btn-sm ${
                currentPage === index + 1
                  ? "btn-dark"
                  : "btn-outline-secondary"
              }`}
              onClick={() => setCurrentPage(index + 1)}
              style={{ minWidth: "40px", borderRadius: "8px" }}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default Orders;
