package com.academiax.payment.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "*")
public class PaymentController {

    private final List<Map<String, Object>> receipts = new ArrayList<>();
    private int tuitionPaid = 50000;
    private final int tuitionTotal = 85000;

    public PaymentController() {
        Map<String, Object> initReceipt = new LinkedHashMap<>();
        initReceipt.put("txnId", "TXN-20260824-10492");
        initReceipt.put("invoiceId", "INV-2026-00388");
        initReceipt.put("studentName", "Rahul Kumar");
        initReceipt.put("studentId", "STU-1024");
        initReceipt.put("amount", 50000);
        initReceipt.put("method", "UPI (Google Pay)");
        initReceipt.put("date", "24 Aug 2026");
        initReceipt.put("status", "PAID");
        receipts.add(initReceipt);
    }

    @PostMapping("/process")
    public ResponseEntity<Map<String, Object>> processPayment(@RequestBody Map<String, Object> request) {
        int amount = (int) request.getOrDefault("amount", 35000);
        String method = (String) request.getOrDefault("method", "UPI");
        String studentId = (String) request.getOrDefault("studentId", "STU-1024");

        tuitionPaid += amount;
        String txnId = "TXN-" + new Random().nextInt(900000);

        Map<String, Object> newReceipt = new LinkedHashMap<>();
        newReceipt.put("txnId", txnId);
        newReceipt.put("invoiceId", "INV-2026-00421");
        newReceipt.put("studentName", "Rahul Kumar");
        newReceipt.put("studentId", studentId);
        newReceipt.put("amount", amount);
        newReceipt.put("method", method);
        newReceipt.put("date", new Date().toString());
        newReceipt.put("status", "PAID");
        receipts.add(newReceipt);

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("success", true);
        response.put("status", "PAID");
        response.put("transactionId", txnId);
        response.put("invoiceId", "INV-2026-00421");
        response.put("amount", amount);
        response.put("method", method);
        response.put("receipt", newReceipt);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/statement/{studentId}")
    public ResponseEntity<Map<String, Object>> getStatement(@PathVariable String studentId) {
        Map<String, Object> statement = new LinkedHashMap<>();
        statement.put("studentId", studentId);
        statement.put("tuitionTotal", tuitionTotal);
        statement.put("tuitionPaid", tuitionPaid);
        statement.put("tuitionPending", tuitionTotal - tuitionPaid);
        statement.put("deadline", "15 Sep 2026");

        List<Map<String, Object>> breakdown = new ArrayList<>();
        breakdown.add(createFeeItem("Instructional Tuition Fee", 70000));
        breakdown.add(createFeeItem("Technology & Lab Infrastructure Fee", 5000));
        breakdown.add(createFeeItem("Digital Library Access Fee", 3000));
        breakdown.add(createFeeItem("Student Services & Campus Activities", 7000));
        statement.put("feeBreakdown", breakdown);

        return ResponseEntity.ok(statement);
    }

    private Map<String, Object> createFeeItem(String label, int amount) {
        Map<String, Object> map = new HashMap<>();
        map.put("label", label);
        map.put("amount", amount);
        return map;
    }

    @GetMapping("/receipt/{txnId}")
    public ResponseEntity<Map<String, Object>> getReceipt(@PathVariable String txnId) {
        for (Map<String, Object> r : receipts) {
            if (txnId.equalsIgnoreCase((String) r.get("txnId"))) {
                Map<String, Object> res = new HashMap<>();
                res.put("receipt", r);
                return ResponseEntity.ok(res);
            }
        }
        Map<String, Object> res = new HashMap<>();
        res.put("receipt", receipts.get(0));
        return ResponseEntity.ok(res);
    }
}
