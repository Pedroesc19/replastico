// src/pages/AdminDashboard.js
import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../css/AdminDashboard.css";
import { Button } from "../components/ui";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [summary, setSummary] = useState({ users: 0, orders: 0, totalSales: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [deliveryMethodFilter, setDeliveryMethodFilter] = useState("");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [ordersError, setOrdersError] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [summaryError, setSummaryError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const getOrders = () => {
    setLoadingOrders(true);
    setOrdersError("");
    const params = new URLSearchParams({
      page: currentPage,
      limit: pageSize,
    });
    if (statusFilter) {
      params.append("status", statusFilter);
    }
    if (deliveryMethodFilter) {
      params.append("deliveryMethod", deliveryMethodFilter);
    }
    if (paymentStatusFilter) {
      params.append("paymentStatus", paymentStatusFilter);
    }
    if (startDate) {
      params.append("startDate", startDate);
    }
    if (endDate) {
      params.append("endDate", endDate);
    }
    if (searchTerm) {
      params.append("search", searchTerm);
    }
    fetch(`http://localhost:5000/api/orders?${params.toString()}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        let fetched = Array.isArray(data.orders) ? data.orders : [];
        if (searchTerm) {
          const lowered = searchTerm.toLowerCase();
          fetched = fetched.filter(
            (o) =>
              o._id.toLowerCase().includes(lowered) ||
              (o.user && o.user.toLowerCase().includes(lowered)) ||
              (o.contactName && o.contactName.toLowerCase().includes(lowered)) ||
              (o.email && o.email.toLowerCase().includes(lowered)) ||
              (o.company && o.company.toLowerCase().includes(lowered))
          );
        }
        setOrders(fetched);
        setTotalPages(data.totalPages || 1);
      })
      .catch(() => setOrdersError("Error fetching orders"))
      .finally(() => setLoadingOrders(false));
  };

  useEffect(() => {
    getOrders();
  }, [
    token,
    currentPage,
    statusFilter,
    deliveryMethodFilter,
    paymentStatusFilter,
    startDate,
    endDate,
    pageSize,
    searchTerm,
  ]);

  useEffect(() => {
    setLoadingSummary(true);
    fetch("http://localhost:5000/api/admin/summary")
      .then((res) => res.json())
      .then((data) => setSummary(data))
      .catch(() => setSummaryError("Error fetching summary"))
      .finally(() => setLoadingSummary(false));
  }, []);

  const handleDownloadExcel = () => {
    const params = new URLSearchParams();
    if (statusFilter) {
      params.append("status", statusFilter);
    }
    if (deliveryMethodFilter) {
      params.append("deliveryMethod", deliveryMethodFilter);
    }
    if (paymentStatusFilter) {
      params.append("paymentStatus", paymentStatusFilter);
    }
    if (startDate) {
      params.append("startDate", startDate);
    }
    if (endDate) {
      params.append("endDate", endDate);
    }
    const query = params.toString();
    const url = `http://localhost:5000/api/orders/download${
      query ? `?${query}` : ""
    }`;
    window.open(url, "_blank");
  };

  const handleDownloadCSV = () => {
    const headers = [
      "ID Orden",
      "Usuario",
      "Nombre",
      "Email",
      "Compañía",
      "Total",
      "Estado",
      "Estado de Pago",
      "Método de Entrega",
      "Dirección de Envío",
      "Teléfono",
      "Instrucciones",
      "Fecha",
    ];
    const rows = sortedOrders.map((o) => [
      o._id,
      o.user || "N/A",
      o.contactName,
      o.email,
      o.company,
      o.totalPrice,
      o.status,
      o.paymentStatus,
      o.deliveryMethod,
      o.shippingAddress,
      o.phone,
      o.instructions,
      new Date(o.createdAt).toLocaleString(),
    ]);
    const summaryRow = [
      "Totales",
      "",
      "",
      "",
      "",
      totals.totalSales,
      "",
      "",
      "",
      "",
      "",
      "",
      `Pedidos: ${totals.count}`,
    ];
    const csv = [headers, ...rows, summaryRow]
      .map((row) => row.map((f) => `"${String(f).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute(
      "download",
      `orders_${new Date().toISOString().replace(/[:.]/g, "-")}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
      .then(() => {
        alert("Estado actualizado");
      })
      .catch((err) => {
        console.error("Error updating status:", err);
        setOrders(previous);
        alert("Error actualizando el estado");
      });
  };

  const handlePaymentStatusChange = (id, newStatus) => {
    const previous = [...orders];
    setOrders((curr) =>
      curr.map((o) => (o._id === id ? { ...o, paymentStatus: newStatus } : o))
    );
    fetch(`http://localhost:5000/api/orders/${id}/payment`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ paymentStatus: newStatus }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error actualizando estado de pago");
        }
        return res.json();
      })
      .then(() => {
        alert("Estado de pago actualizado");
      })
      .catch((err) => {
        console.error("Error updating payment status:", err);
        setOrders(previous);
        alert("Error actualizando estado de pago");
      });
  };

  const handleSendQuote = async (order) => {
    try {
      const payload = {
        products: order.products.map((p) => ({
          product: p.product._id || p.product,
          quantity: p.quantity,
        })),
        deliveryMethod: order.deliveryMethod,
      };
      const res = await fetch("http://localhost:5000/api/orders/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      alert(
        `Subtotal: $${data.subtotal}\nEnvío: $${data.deliveryFee}\nTotal: $${data.total}`
      );
    } catch (err) {
      console.error("Error fetching quote:", err);
      alert("Error generando cotización");
    }
  };

  const handleSort = (key) => {
    setSortConfig((prev) => {
      const direction =
        prev.key === key && prev.direction === "asc" ? "desc" : "asc";
      return { key, direction };
    });
  };

  const sortedOrders = useMemo(() => {
    const sortable = [...orders];
    if (sortConfig.key) {
      sortable.sort((a, b) => {
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];
        if (sortConfig.key === "createdAt") {
          aVal = new Date(aVal).getTime();
          bVal = new Date(bVal).getTime();
        } else if (typeof aVal === "number" && typeof bVal === "number") {
          // keep as numbers
        } else {
          aVal = aVal ? aVal.toString().toLowerCase() : "";
          bVal = bVal ? bVal.toString().toLowerCase() : "";
        }
        if (aVal < bVal) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aVal > bVal) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortable;
  }, [orders, sortConfig]);

  const totals = useMemo(() => {
    const totalSales = sortedOrders.reduce(
      (sum, o) => sum + o.totalPrice,
      0
    );
    return { totalSales, count: sortedOrders.length };
  }, [sortedOrders]);

  return (
    <div className="admin-dashboard grid cols-1">
      <h1>Dashboard de Administrador</h1>
      {loadingSummary ? (
        <div className="spinner">Cargando resumen...</div>
      ) : summaryError ? (
        <div className="error-message">{summaryError}</div>
      ) : (
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
      )}
      <Button onClick={handleDownloadExcel} className="download-button">
        Descargar Excel de Pedidos
      </Button>
      <Button onClick={handleDownloadCSV} className="download-button">
        Exportar CSV
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
          <input
            type="text"
            placeholder="Buscar por usuario o ID"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
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
          <select
            value={deliveryMethodFilter}
            onChange={(e) => {
              setDeliveryMethodFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">Entrega</option>
            <option value="standard">Standard</option>
            <option value="express">Express</option>
          </select>
          <select
            value={paymentStatusFilter}
            onChange={(e) => {
              setPaymentStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">Pago</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Pagado">Pagado</option>
          </select>
        </div>
        <div className="pagination">
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
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
      {loadingOrders ? (
        <div className="spinner">Cargando pedidos...</div>
      ) : ordersError ? (
        <div className="error-message">{ordersError}</div>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th
                className={`sortable ${
                  sortConfig.key === "_id" ? sortConfig.direction : ""
                }`}
                onClick={() => handleSort("_id")}
              >
                ID Orden
              </th>
              <th
                className={`sortable ${
                  sortConfig.key === "user" ? sortConfig.direction : ""
                }`}
                onClick={() => handleSort("user")}
              >
                Usuario
              </th>
              <th>Contacto</th>
              <th>Email</th>
              <th>Compañía</th>
              <th
                className={`sortable ${
                  sortConfig.key === "totalPrice" ? sortConfig.direction : ""
                }`}
                onClick={() => handleSort("totalPrice")}
              >
                Total
              </th>
              <th
                className={`sortable ${
                  sortConfig.key === "status" ? sortConfig.direction : ""
                }`}
                onClick={() => handleSort("status")}
              >
                Estado
              </th>
              <th
                className={`sortable ${
                  sortConfig.key === "paymentStatus" ? sortConfig.direction : ""
                }`}
                onClick={() => handleSort("paymentStatus")}
              >
                Pago
              </th>
              <th>Método de Entrega</th>
              <th>Dirección de Envío</th>
              <th>Teléfono</th>
              <th>Instrucciones</th>
              <th
                className={`sortable ${
                  sortConfig.key === "createdAt" ? sortConfig.direction : ""
                }`}
                onClick={() => handleSort("createdAt")}
              >
                Fecha
              </th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sortedOrders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user || "N/A"}</td>
                <td>{order.contactName}</td>
                <td>{order.email}</td>
                <td>{order.company}</td>
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
                <td>
                  <select
                    value={order.paymentStatus}
                    onChange={(e) =>
                      handlePaymentStatusChange(order._id, e.target.value)
                    }
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="Pagado">Pagado</option>
                  </select>
                </td>
                <td>{order.deliveryMethod}</td>
                <td>{order.shippingAddress}</td>
                <td>{order.phone}</td>
                <td>{order.instructions}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td>
                  <Button onClick={() => handleSendQuote(order)}>
                    Enviar Cotización
                  </Button>
                </td>
              </tr>
            ))}
            <tr className="summary-row">
              <td colSpan={5}>Totales</td>
              <td>${totals.totalSales}</td>
              <td colSpan={8}>Pedidos: {totals.count}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
