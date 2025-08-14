import PDFDocument from "pdfkit";
import Product from "../models/Product.js";

export const generateQuote = async (req, res) => {
  try {
    const {
      client,
      paymentMethod,
      deliveryMethod,
      items: itemPayload = [],
      products = [],
    } = req.body;

    const items = itemPayload.length
      ? itemPayload.map((i) => ({
          name: i.name,
          price: i.unitPrice ?? i.price,
          quantity: i.quantity,
        }))
      : await Promise.all(
          products.map(async (p) => {
            const prod = await Product.findById(p.product);
            if (!prod) throw new Error("Producto no encontrado");
            return {
              name: prod.name,
              price: prod.price,
              quantity: p.quantity,
            };
          })
        );

    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const iva = subtotal * 0.16;
    const total = subtotal + iva;

    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=cotizacion.pdf");
    doc.pipe(res);

    const issueDate = new Date();
    const validUntil = new Date(issueDate);
    validUntil.setDate(issueDate.getDate() + 15);

    doc.fontSize(20).text("Cotización", { align: "center" });
    doc.moveDown();

    if (client) {
      if (client.name) doc.fontSize(12).text(`Cliente: ${client.name}`);
      if (client.company) doc.text(`Empresa: ${client.company}`);
      if (client.email) doc.text(`Email: ${client.email}`);
      if (client.phone) doc.text(`Teléfono: ${client.phone}`);
      if (client.address) doc.text(`Dirección: ${client.address}`);
      doc.moveDown();
    }

    items.forEach((item) => {
      doc
        .fontSize(12)
        .text(`${item.name} - ${item.quantity} x $${item.price.toFixed(2)}`);
    });

    doc.moveDown();
    doc.text(`Subtotal: $${subtotal.toFixed(2)}`);
    doc.text(`IVA (16%): $${iva.toFixed(2)}`);
    doc.text(`Total: $${total.toFixed(2)}`);
    doc.moveDown();
    if (paymentMethod) doc.text(`Método de pago: ${paymentMethod}`);
    if (deliveryMethod) doc.text(`Método de entrega: ${deliveryMethod}`);
    doc.moveDown();
    doc.text(`Fecha de emisión: ${issueDate.toLocaleDateString()}`);
    doc.text(`Vigencia: ${validUntil.toLocaleDateString()}`);

    doc.end();
  } catch (error) {
    res.status(500).json({
      message: "Error al generar la cotización",
      error: error.message,
    });
  }
};
