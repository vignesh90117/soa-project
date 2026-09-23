const http = require("http");

const PORT = 8084;

let receipts = [
  {
    txnId: "TXN-20260824-10492",
    invoiceId: "INV-2026-00388",
    studentName: "Rahul Kumar",
    studentId: "STU-1024",
    amount: 50000,
    method: "UPI (Google Pay)",
    date: "24 Aug 2026",
    status: "PAID",
  },
];

let tuitionPaid = 50000;
const tuitionTotal = 85000;

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  let body = "";
  req.on("data", (chunk) => (body += chunk));

  req.on("end", () => {
    let parsed = {};
    try {
      if (body) parsed = JSON.parse(body);
    } catch (e) {}

    const url = req.url;

    if (url === "/api/payments/process" && req.method === "POST") {
      const amount = parsed.amount || 35000;
      const method = parsed.method || "UPI";

      tuitionPaid += amount;

      const newReceipt = {
        txnId: `TXN-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.floor(10000 + Math.random() * 90000)}`,
        invoiceId: "INV-2026-00421",
        studentName: "Rahul Kumar",
        studentId: parsed.studentId || "STU-1024",
        amount,
        method,
        date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
        status: "PAID",
      };

      receipts.push(newReceipt);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          success: true,
          status: "PAID",
          transactionId: newReceipt.txnId,
          invoiceId: newReceipt.invoiceId,
          amount,
          method,
          receipt: newReceipt,
        }, null, 2)
      );
    } else if (url.startsWith("/api/payments/statement/") && req.method === "GET") {
      const studentId = url.split("/")[4];
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          studentId,
          tuitionTotal,
          tuitionPaid,
          tuitionPending: tuitionTotal - tuitionPaid,
          deadline: "15 Sep 2026",
          feeBreakdown: [
            { label: "Instructional Tuition Fee", amount: 70000 },
            { label: "Technology & Lab Fee", amount: 5000 },
            { label: "Digital Library Access Fee", amount: 3000 },
            { label: "Student Services", amount: 7000 },
          ],
        }, null, 2)
      );
    } else if (url.startsWith("/api/payments/receipt/") && req.method === "GET") {
      const txnId = url.split("/")[4];
      const receipt = receipts.find((r) => r.txnId === txnId) || receipts[0];
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ receipt }, null, 2));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Payment Endpoint Not Found" }));
    }
  });
});

server.listen(PORT, () => {
  console.log(`[PAYMENT MICROSERVICE] Listening on http://localhost:${PORT}`);
});
