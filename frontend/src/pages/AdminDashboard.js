// src/pages/AdminDashboard.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/AdminDashboard.css";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [summary, setSummary] = useState({ users: 0, orders: 0, totalSales: 0 });
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:5000/api/orders", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Error fetching orders:", err));

    fetch("http://localhost:5000/api/admin/summary")
      .then((res) => res.json())
      .then((data) => setSummary(data))
      .catch((err) => console.error("Error fetching summary:", err));
  }, [token]);

  const handleDownloadExcel = () => {
    window.open("http://localhost:5000/api/orders/download", "_blank");
  };

  return (
    <div className="admin-dashboard">
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
      <button onClick={handleDownloadExcel} className="download-button">
        Descargar Excel de Pedidos
      </button>
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
              <td>{order.status}</td>
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
