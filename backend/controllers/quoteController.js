import PDFDocument from "pdfkit";
import Product from "../models/Product.js";

export const generateQuote = async (req, res) => {
  try {
    const { products } = req.body;
    const items = await Promise.all(
      products.map(async (p) => {
        const prod = await Product.findById(p.product);
        if (!prod) throw new Error("Producto no encontrado");
        return { name: prod.name, price: prod.price, quantity: p.quantity };
      })
    );

    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=cotizacion.pdf"
    );
    doc.pipe(res);

    doc.fontSize(20).text("Cotización", { align: "center" });
    doc.moveDown();

    items.forEach((item) => {
      doc
        .fontSize(12)
        .text(`${item.name} - ${item.quantity} x $${item.price}`);
    });

    doc.moveDown();
    doc.fontSize(14).text(`Total: $${total}`);

    doc.end();
  } catch (error) {
    res.status(500).json({
      message: "Error al generar la cotización",
      error: error.message,
    });
  }
};
