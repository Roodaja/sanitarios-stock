// ══════════════════════════════════════════════════════════════
//  SANITARIOS & MATERIALES — Google Apps Script
//  Pegá este código completo en Apps Script de tu Google Sheets
//  Extensiones → Apps Script → borrar todo → pegar → guardar
// ══════════════════════════════════════════════════════════════

const SHEET_NAME = "📦 STOCK";  // Nombre exacto de la hoja de stock

function doGet(e) {
  const callback = e.parameter.callback;
  const action = e.parameter.action || "getStock";
  
  // Para escritura via GET (JSONP no soporta POST)
  let body = {};
  if (e.parameter.data) {
    try { body = JSON.parse(e.parameter.data); } catch(err) {}
  }

  let result;
  try {
    switch(action) {
      case "getStock":     result = getStock();           break;
      case "updateProduct":result = updateProduct(body);  break;
      case "addProduct":   result = addProduct(body);     break;
      case "deleteProduct":result = deleteProduct(body);  break;
      case "updateStock":  result = updateStock(body);    break;
      default:             result = { error: "Acción no reconocida: " + action };
    }
  } catch(err) {
    result = { error: err.toString() };
  }

  const json = JSON.stringify(result);
  if (callback) {
    return ContentService
      .createTextOutput(`${callback}(${json})`)
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService
    .createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  let body = {};
  try { body = JSON.parse(e.postData.contents); } catch(err) {}
  const action = body.action || e.parameter.action;
  let result;
  try {
    switch(action) {
      case "updateProduct":result = updateProduct(body);  break;
      case "addProduct":   result = addProduct(body);     break;
      case "deleteProduct":result = deleteProduct(body);  break;
      case "updateStock":  result = updateStock(body);    break;
      default:             result = { error: "Acción no reconocida" };
    }
  } catch(err) {
    result = { error: err.toString() };
  }
  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}

function getStock() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) return { error: `No se encontró la hoja "${SHEET_NAME}"` };

  const data = sheet.getDataRange().getValues();
  const productos = [];

  // Los datos empiezan en la fila 4 (índice 3): filas 1-2 = título, fila 3 = encabezados
  for (let i = 3; i < data.length; i++) {
    const row = data[i];
    if (!row[0] && !row[1]) continue; // saltar filas completamente vacías
    productos.push({
      cod:  String(row[0] || ""),
      desc: String(row[1] || ""),
      cat:  String(row[2] || ""),
      uni:  String(row[3] || "unidad"),
      stk:  Number(row[4]) || 0,
      min:  Number(row[5]) || 5,
      pc:   Number(row[7]) || 0,   // columna H = precio compra
      pv:   Number(row[8]) || 0,   // columna I = precio venta
      prov: String(row[10] || ""), // columna K = proveedor
      row:  i + 1                  // número de fila en Sheets (base 1)
    });
  }
  return { ok: true, productos, total: productos.length };
}

function updateProduct(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) return { error: `No se encontró la hoja "${SHEET_NAME}"` };
  if (!data.row) return { error: "Falta el número de fila" };

  const r = parseInt(data.row);
  sheet.getRange(r, 1).setValue(data.cod  || "");
  sheet.getRange(r, 2).setValue(data.desc || "");
  sheet.getRange(r, 3).setValue(data.cat  || "");
  sheet.getRange(r, 4).setValue(data.uni  || "unidad");
  sheet.getRange(r, 5).setValue(data.stk  || 0);
  sheet.getRange(r, 6).setValue(data.min  || 5);
  sheet.getRange(r, 8).setValue(data.pc   || 0);
  sheet.getRange(r, 9).setValue(data.pv   || 0);
  sheet.getRange(r, 11).setValue(data.prov || "");

  return { ok: true, row: r };
}

function addProduct(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) return { error: `No se encontró la hoja "${SHEET_NAME}"` };

  const lastRow = sheet.getLastRow() + 1;
  sheet.getRange(lastRow, 1).setValue(data.cod  || "");
  sheet.getRange(lastRow, 2).setValue(data.desc || "");
  sheet.getRange(lastRow, 3).setValue(data.cat  || "");
  sheet.getRange(lastRow, 4).setValue(data.uni  || "unidad");
  sheet.getRange(lastRow, 5).setValue(data.stk  || 0);
  sheet.getRange(lastRow, 6).setValue(data.min  || 5);
  sheet.getRange(lastRow, 8).setValue(data.pc   || 0);
  sheet.getRange(lastRow, 9).setValue(data.pv   || 0);
  sheet.getRange(lastRow, 11).setValue(data.prov || "");

  return { ok: true, row: lastRow };
}

function deleteProduct(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) return { error: `No se encontró la hoja "${SHEET_NAME}"` };
  if (!data.row) return { error: "Falta el número de fila" };

  sheet.deleteRow(parseInt(data.row));
  return { ok: true };
}

function updateStock(data) {
  // Actualiza solo el stock de una fila (columna E)
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) return { error: `No se encontró la hoja "${SHEET_NAME}"` };

  sheet.getRange(parseInt(data.row), 5).setValue(data.stk || 0);
  return { ok: true };
}
