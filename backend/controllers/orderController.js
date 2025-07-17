// backend/controllers/orderController.js
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import path from "path";
import fs from "fs";

// Crea un pedido incluyendo información adicional (checkout)
export const createOrder = async (req, res) => {
  try {
    // Extrae de la solicitud el array de productos y los datos adicionales del checkout
    const { products, shippingAddress, phone, instructions } = req.body;

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
      status: "Pendiente",
    });

    // Aquí podrías llamar a un servicio para almacenar la orden en un archivo Excel

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
    const orders = await Order.find().populate("products.product");
    res.json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los pedidos", error: error.message });
  }
};

// Función para descargar el archivo Excel de pedidos
export const downloadOrdersExcel = (req, res) => {
  const filePath = path.join(process.cwd(), "data", "pedidos.xlsx");
  if (fs.existsSync(filePath)) {
    res.download(filePath, "pedidos.xlsx", (err) => {
      if (err) {
        res.status(500).json({ message: "Error al descargar el archivo" });
      }
    });
  } else {
    res.status(404).json({ message: "No se encontró el archivo Excel" });
  }
};
