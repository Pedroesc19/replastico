// src/pages/AdminDashboard.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/AdminDashboard.css";
import { Button } from "../components/ui";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [summary, setSummary] = useState({ users: 0, orders: 0, totalSales: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const limit = 10;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const getOrders = () => {
    const params = new URLSearchParams({
      page: currentPage,
      limit,
    });
    if (statusFilter) {
      params.append("status", statusFilter);
    }
    if (startDate) {
      params.append("startDate", startDate);
    }
    if (endDate) {
      params.append("endDate", endDate);
    }
    fetch(`http://localhost:5000/api/orders?${params.toString()}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(Array.isArray(data.orders) ? data.orders : []);
        setTotalPages(data.totalPages || 1);
      })
      .catch((err) => console.error("Error fetching orders:", err));
  };

  useEffect(() => {
    getOrders();
  }, [token, currentPage, statusFilter, startDate, endDate]);

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/summary")
      .then((res) => res.json())
      .then((data) => setSummary(data))
      .catch((err) => console.error("Error fetching summary:", err));
  }, []);

  const handleDownloadExcel = () => {
    window.open("http://localhost:5000/api/orders/download", "_blank");
  };

  const handleStatusChange = (id, newStatus) => {
    const previous = [...orders];
    setOrders((curr) =>
      curr.map((o) => (o._id === id ? { ...o, status: newStatus } : o))
    );
    fetch(`http://localhost:5000/api/orders/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error actualizando el estado");
        }
        return res.json();
      })
      .catch((err) => {
        console.error("Error updating status:", err);
        setOrders(previous);
      });
  };

  return (
    <div className="admin-dashboard grid cols-1">
      <h1>Dashboard de Administrador</h1>
      <div className="summary-cards">
        <div className="summary-card">
          <h3>Usuarios</h3>
          <p>{summary.users}</p>
        </div>
        <div className="summary-card">
          <h3>Pedidos</h3>
          <p>{summary.orders}</p>
        </div>
        <div className="summary-card">
          <h3>Ventas</h3>
          <p>${summary.totalSales}</p>
        </div>
      </div>
      <Button onClick={handleDownloadExcel} className="download-button">
        Descargar Excel de Pedidos
      </Button>
      <div className="controls">
        <div className="filters">
          <input
            type="date"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              setCurrentPage(1);
            }}
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
              setCurrentPage(1);
            }}
          />
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">Todos</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Completado">Completado</option>
          </select>
        </div>
        <div className="pagination">
          <Button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Anterior
          </Button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <Button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </Button>
        </div>
      </div>
      <table className="orders-table">
        <thead>
          <tr>
            <th>ID Orden</th>
            <th>Usuario</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Dirección de Envío</th>
            <th>Teléfono</th>
            <th>Instrucciones</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.user || "N/A"}</td>
              <td>${order.totalPrice}</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="Completado">Completado</option>
                </select>
              </td>
              <td>{order.shippingAddress}</td>
              <td>{order.phone}</td>
              <td>{order.instructions}</td>
              <td>{new Date(order.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
