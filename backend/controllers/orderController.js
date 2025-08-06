// backend/controllers/orderController.js
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import path from "path";
import { saveOrderToExcel, exportOrdersToExcel } from "../services/excelService.js";

// Crea un pedido incluyendo información adicional (checkout)
export const createOrder = async (req, res) => {
  try {
    // Extrae de la solicitud el array de productos y los datos adicionales del checkout
    const {
      products,
      shippingAddress,
      phone,
      instructions,
      name,
      email,
      company,
      deliveryMethod,
      paymentStatus,
    } = req.body;

    // Recupera la información detallada de cada producto y calcula el total
    const detailedProducts = await Promise.all(
      products.map(async (item) => {
        const product = await Product.findById(item.product);
        if (!product) throw new Error("Producto no encontrado");
        return { product, quantity: item.quantity };
      })
    );

    const totalPrice = detailedProducts.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);

    // Verifica que la compra cumpla con el mínimo de 50 unidades
    const totalUnits = detailedProducts.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    if (totalUnits < 50) {
      return res
        .status(400)
        .json({ message: "La compra mínima es de 50 unidades" });
    }

    // Crea la orden incluyendo la información adicional del checkout
    const order = await Order.create({
      user: req.user ? req.user._id : null, // Si hay autenticación activa, asigna el ID del usuario
      products,
      totalPrice,
      shippingAddress,
      phone,
      instructions,
      contactName: name,
      email,
      company,
      deliveryMethod,
      paymentStatus: paymentStatus || "Pendiente",
      status: "Pendiente",
    });

    saveOrderToExcel(order);

    return res.status(201).json(order);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al crear el pedido", error: error.message });
  }
};

// Función para obtener todos los pedidos (incluyendo detalles de productos)
export const getOrders = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      startDate,
      endDate,
      deliveryMethod,
      paymentStatus,
    } = req.query;

    const query = {};

    if (status) {
      query.status = status;
    }
    if (deliveryMethod) {
      query.deliveryMethod = deliveryMethod;
    }
    if (paymentStatus) {
      query.paymentStatus = paymentStatus;
    }

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) {
        query.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        query.createdAt.$lte = new Date(endDate);
      }
    }

    const skip = (Number(page) - 1) * Number(limit);
    const totalOrders = await Order.countDocuments(query);

    const orders = await Order.find(query)
      .populate("products.product")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({
      orders,
      currentPage: Number(page),
      totalPages: Math.ceil(totalOrders / Number(limit)),
      totalOrders,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los pedidos", error: error.message });
  }
};

// Actualiza el estado de un pedido
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }
    return res.json(order);
  } catch (error) {
    return res.status(500).json({
      message: "Error al actualizar el estado del pedido",
      error: error.message,
    });
  }
};

// Actualiza el estado de pago de un pedido
export const updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentStatus } = req.body;
    const order = await Order.findByIdAndUpdate(
      id,
      { paymentStatus },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }
    return res.json(order);
  } catch (error) {
    return res.status(500).json({
      message: "Error al actualizar el estado de pago",
      error: error.message,
    });
  }
};

// Calcula una cotización para los productos
export const quoteOrder = async (req, res) => {
  try {
    const { products, deliveryMethod } = req.body;
    const detailed = await Promise.all(
      products.map(async (item) => {
        const product = await Product.findById(item.product);
        if (!product) throw new Error("Producto no encontrado");
        return { product, quantity: item.quantity };
      })
    );
    const subtotal = detailed.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const deliveryFee =
      deliveryMethod === "express" ? subtotal * 0.2 : subtotal * 0.1;
    const total = subtotal + deliveryFee;
    res.json({ subtotal, deliveryFee, total });
  } catch (error) {
    res.status(500).json({
      message: "Error al calcular la cotización",
      error: error.message,
    });
  }
};

// Función para descargar el archivo Excel de pedidos
export const downloadOrdersExcel = async (req, res) => {
  try {
    const { status, startDate, endDate, deliveryMethod, paymentStatus } =
      req.query;
    const query = {};
    if (status) {
      query.status = status;
    }
    if (deliveryMethod) {
      query.deliveryMethod = deliveryMethod;
    }
    if (paymentStatus) {
      query.paymentStatus = paymentStatus;
    }
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) {
        query.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        query.createdAt.$lte = new Date(endDate);
      }
    }

    const orders = await Order.find(query)
      .populate("products.product")
      .sort({ createdAt: -1 });

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const fileName = `pedidos_${timestamp}.xlsx`;
    const filePath = path.join(process.cwd(), "data", fileName);
    exportOrdersToExcel(orders, filePath);

    res.download(filePath, fileName, (err) => {
      if (err) {
        res.status(500).json({ message: "Error al descargar el archivo" });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al generar el archivo Excel",
      error: error.message,
    });
  }
};
