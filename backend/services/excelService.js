// backend/services/excelService.js
import XLSX from "xlsx";
import fs from "fs";
import path from "path";

// Ruta al archivo Excel, p.ej. en la carpeta "data" del proyecto
const EXCEL_FILE_PATH = path.join(process.cwd(), "data", "pedidos.xlsx");

export function saveOrderToExcel(order) {
  // order: { _id, products, totalPrice, user, etc. }

  // 1. Leer o crear workbook
  let workbook;
  let worksheet;
  if (fs.existsSync(EXCEL_FILE_PATH)) {
    // Si el archivo existe, leerlo
    const fileBuffer = fs.readFileSync(EXCEL_FILE_PATH);
    workbook = XLSX.read(fileBuffer, { type: "buffer" });
    worksheet = workbook.Sheets[workbook.SheetNames[0]];
  } else {
    // Crear un libro y hoja nuevos
    workbook = XLSX.utils.book_new();
    worksheet = XLSX.utils.aoa_to_sheet([
      ["OrderID", "UserID", "Products", "TotalPrice", "Status", "Date"],
    ]);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Pedidos");
  }

  // 2. Averiguar el número de filas ya existentes
  const range = XLSX.utils.decode_range(worksheet["!ref"]);
  const nextRow = range.e.r + 1; // e.r es "end row"

  // 3. Insertar datos del pedido
  const orderId = order._id.toString();
  const userId = order.user ? order.user.toString() : "N/A";
  const productsStr = order.products
    .map((p) => `(${p.product}, cant: ${p.quantity})`)
    .join(", ");
  const totalPrice = order.totalPrice;
  const status = order.status || "Pendiente";
  const date = new Date().toLocaleString();

  // Escribir las celdas
  const rowValues = [orderId, userId, productsStr, totalPrice, status, date];
  rowValues.forEach((val, colIndex) => {
    const cellAddress = XLSX.utils.encode_cell({ r: nextRow, c: colIndex });
    worksheet[cellAddress] = { t: "s", v: val.toString() };
  });

  // Actualizar el rango "!ref" con la nueva fila
  if (nextRow > range.e.r) {
    range.e.r = nextRow;
    worksheet["!ref"] = XLSX.utils.encode_range(range.s, range.e);
  }

  // 4. Guardar de nuevo
  const wbOut = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
  fs.writeFileSync(EXCEL_FILE_PATH, wbOut);
}
