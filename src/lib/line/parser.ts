export interface ParsedStockEntry {
  productName: string;
  quantity: number;
  unit: string;
  status: "OK" | "LOW" | "OUT";
  notes: string;
}

export interface ParsedShiftKPI {
  shiftType: "MORNING" | "AFTERNOON" | "NIGHT" | "GENERAL";
  staffName: string;
  totalSales: number;
  customerCount: number;
  topProducts: string;
  notes: string;
}

// Detects !register stock or !register kpi
export function parseRegisterCommand(text: string): "STOCK_CHECK" | "KPI_SHIFT" | null {
  const t = text.trim().toLowerCase();
  if (t === "!register stock" || t === "!ลงทะเบียน stock") return "STOCK_CHECK";
  if (t === "!register kpi" || t === "!ลงทะเบียน kpi") return "KPI_SHIFT";
  return null;
}

export function isSummaryCommand(text: string): boolean {
  const t = text.trim().toLowerCase();
  return [
    "!summary", "!สรุป", "!stocksummary", "!สรุปสต็อก",
    "!kpi", "!kpisummary", "!สรุปกะ", "!สรุป kpi",
  ].includes(t);
}

export function isHelpCommand(text: string): boolean {
  return ["!help", "!ช่วยเหลือ", "!คำสั่ง"].includes(text.trim().toLowerCase());
}

// Parse stock check messages
// Supported formats:
//   stock [product] [qty] [unit?] [status?]
//   สต็อก [product] [qty]
//   [product]: [qty] [unit?]
//   out: [product]
//   low: [product] [qty]
export function parseStockMessage(text: string): ParsedStockEntry | null {
  const t = text.trim();

  // "out: ProductName" — zero stock
  const outMatch = t.match(/^(?:out|หมด)[:\s]+(.+)/i);
  if (outMatch) {
    return {
      productName: outMatch[1].trim(),
      quantity: 0,
      unit: "units",
      status: "OUT",
      notes: "",
    };
  }

  // "low: ProductName qty unit"
  const lowMatch = t.match(/^(?:low|น้อย)[:\s]+(.+?)\s+(\d+)\s*(\w*)/i);
  if (lowMatch) {
    return {
      productName: lowMatch[1].trim(),
      quantity: parseInt(lowMatch[2]),
      unit: lowMatch[3] || "units",
      status: "LOW",
      notes: "",
    };
  }

  // "stock ProductName qty unit" or "สต็อก ProductName qty"
  const stockMatch = t.match(/^(?:stock|สต็อก|ตรวจสต็อก)[:\s]+(.+?)\s+(\d+)\s*(\w*)/i);
  if (stockMatch) {
    const qty = parseInt(stockMatch[2]);
    return {
      productName: stockMatch[1].trim(),
      quantity: qty,
      unit: stockMatch[3] || "units",
      status: qty === 0 ? "OUT" : qty <= 5 ? "LOW" : "OK",
      notes: "",
    };
  }

  // "ProductName: qty unit"
  const colonMatch = t.match(/^(.+?):\s*(\d+)\s*(\w*)/);
  if (colonMatch) {
    const qty = parseInt(colonMatch[2]);
    return {
      productName: colonMatch[1].trim(),
      quantity: qty,
      unit: colonMatch[3] || "units",
      status: qty === 0 ? "OUT" : qty <= 5 ? "LOW" : "OK",
      notes: "",
    };
  }

  return null;
}

// Parse KPI / shift messages
// Supported formats:
//   กะเช้า / กะบ่าย / กะดึก [staffName]
//   ยอดขาย [amount] (บาท)
//   ลูกค้า [count] (คน)
//   สินค้าขายดี: [products]
//   kpi [shiftType] [staffName] sales:[amount] customers:[count]
export function parseKPIMessage(text: string): Partial<ParsedShiftKPI> | null {
  const t = text.trim();
  const result: Partial<ParsedShiftKPI> = {};
  let matched = false;

  // Shift type + staff "กะเช้า @staff" or "morning @staff"
  const shiftMatch = t.match(
    /^(?:กะ)?(เช้า|morning|บ่าย|afternoon|ดึก|night|evening)\s*(.*)/i
  );
  if (shiftMatch) {
    const shiftWord = shiftMatch[1].toLowerCase();
    result.shiftType =
      ["เช้า", "morning"].includes(shiftWord)
        ? "MORNING"
        : ["บ่าย", "afternoon"].includes(shiftWord)
        ? "AFTERNOON"
        : "NIGHT";
    result.staffName = shiftMatch[2].replace(/^[@]/,"").trim() || "ไม่ระบุ";
    matched = true;
  }

  // Sales "ยอดขาย 5000" or "sales 5000" or "ยอด: 5000"
  const salesMatch = t.match(/(?:ยอดขาย|ยอด|sales)[:\s]+([0-9,]+)/i);
  if (salesMatch) {
    result.totalSales = parseFloat(salesMatch[1].replace(/,/g, ""));
    matched = true;
  }

  // Customer count "ลูกค้า 12 คน" or "customers 12"
  const custMatch = t.match(/(?:ลูกค้า|customers?)[:\s]+(\d+)/i);
  if (custMatch) {
    result.customerCount = parseInt(custMatch[1]);
    matched = true;
  }

  // Top products "สินค้าขายดี: OG Kush, Blue Dream"
  const topMatch = t.match(/(?:สินค้าขายดี|ขายดี|top product)[:\s]+(.+)/i);
  if (topMatch) {
    result.topProducts = topMatch[1].trim();
    matched = true;
  }

  // One-liner KPI "kpi morning @Staff sales:5000 customers:12 top:OG Kush"
  const kpiLine = t.match(
    /^kpi\s+(\w+)\s+[@]?(\S+)\s+sales[:\s]([0-9,]+)\s+customers[:\s](\d+)(?:\s+top[:\s](.+))?/i
  );
  if (kpiLine) {
    const shiftWord = kpiLine[1].toLowerCase();
    result.shiftType =
      ["morning", "เช้า"].includes(shiftWord)
        ? "MORNING"
        : ["afternoon", "บ่าย"].includes(shiftWord)
        ? "AFTERNOON"
        : ["night", "ดึก", "evening"].includes(shiftWord)
        ? "NIGHT"
        : "GENERAL";
    result.staffName = kpiLine[2];
    result.totalSales = parseFloat(kpiLine[3].replace(/,/g, ""));
    result.customerCount = parseInt(kpiLine[4]);
    if (kpiLine[5]) result.topProducts = kpiLine[5].trim();
    matched = true;
  }

  return matched ? result : null;
}

export function shiftTypeLabel(type: string): string {
  return (
    { MORNING: "🌅 กะเช้า", AFTERNOON: "🌞 กะบ่าย", NIGHT: "🌙 กะดึก", GENERAL: "📋 ทั่วไป" }[type] ?? type
  );
}
