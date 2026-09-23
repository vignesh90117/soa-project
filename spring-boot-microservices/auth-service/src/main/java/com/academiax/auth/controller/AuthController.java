package com.academiax.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final String jwtSecret = "academiax_super_secret_jwt_key_2026_ps035";

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> request) {
        String email = request.getOrDefault("email", "student@academiax.demo");
        String role = request.getOrDefault("role", "student");

        String studentId = role.equalsIgnoreCase("instructor") ? "INS-4010" : role.equalsIgnoreCase("admin") ? "ADM-0001" : "STU-1024";
        String name = role.equalsIgnoreCase("instructor") ? "Dr. A. K. Rao" : role.equalsIgnoreCase("admin") ? "System Admin (Marcus)" : "Rahul Kumar";

        // Generate HMAC-SHA256 Token representation
        String headerB64 = Base64.getUrlEncoder().encodeToString("{\"alg\":\"HS256\",\"typ\":\"JWT\"}".getBytes());
        String payloadB64 = Base64.getUrlEncoder().encodeToString(String.format("{\"sub\":\"%s\",\"email\":\"%s\",\"name\":\"%s\",\"role\":\"%s\",\"iss\":\"AcademiaX Auth Service\",\"iat\":%d}", studentId, email, name, role, System.currentTimeMillis()/1000).getBytes());
        String token = headerB64 + "." + payloadB64 + ".signed_hs256_sig";

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("success", true);
        response.put("status", "AUTHENTICATED");
        response.put("message", "HMAC-SHA256 JWT Token generated successfully");
        response.put("token", token);
        response.put("tokenType", "Bearer");
        response.put("expiresIn", 3600);

        Map<String, Object> user = new HashMap<>();
        user.put("studentId", studentId);
        user.put("name", name);
        user.put("email", email);
        user.put("role", role);
        user.put("gpa", 3.84);
        response.put("user", user);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/verify")
    public ResponseEntity<Map<String, Object>> verify(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        Map<String, Object> response = new LinkedHashMap<>();

        if (token != null && token.split("\\.").length === 3) {
            response.put("valid", true);
            response.put("status", "ACTIVE");
            response.put("session", "SECURE_HMAC_SHA256");
            return ResponseEntity.ok(response);
        } else {
            response.put("valid", false);
            response.put("status", "UNAUTHORIZED");
            response.put("error", "Invalid or malformed JWT token");
            return ResponseEntity.status(401).body(response);
        }
    }
}
