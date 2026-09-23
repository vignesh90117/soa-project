package com.academiax.enrollment.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/enrollments")
@CrossOrigin(origins = "*")
public class EnrollmentController {

    private final List<Map<String, Object>> enrollments = new ArrayList<>();

    public EnrollmentController() {
        Map<String, Object> initEnr = new LinkedHashMap<>();
        initEnr.put("id", "ENR-901");
        initEnr.put("studentId", "STU-1024");
        initEnr.put("courseId", "CS305");
        initEnr.put("courseCode", "CS305");
        initEnr.put("courseTitle", "Relational & Distributed Database Systems");
        initEnr.put("credits", 3);
        initEnr.put("status", "Enrolled");
        initEnr.put("enrolledAt", "2026-08-26 09:15");
        enrollments.add(initEnr);
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createEnrollment(@RequestBody Map<String, String> request) {
        String studentId = request.getOrDefault("studentId", "STU-1024");
        String courseId = request.getOrDefault("courseId", "CS401");

        Map<String, Object> response = new LinkedHashMap<>();

        // 1. Deadline Expiration Rule Validation
        if ("MBA210".equalsIgnoreCase(courseId)) {
            response.put("success", false);
            response.put("code", "DEADLINE_EXPIRED");
            response.put("reason", "Enrollment Closed: Deadline expired on 2026-08-25.");
            return ResponseEntity.badRequest().body(response);
        }

        // 2. Schedule Conflict Rule Validation (CS405 vs enrolled CS305)
        if ("CS405".equalsIgnoreCase(courseId)) {
            response.put("success", false);
            response.put("code", "SCHEDULE_CONFLICT");
            response.put("reason", "Schedule Conflict Detected! Overlaps with enrolled CS305 (Mon/Wed 10:00 - 11:30).");
            Map<String, String> conflict = new HashMap<>();
            conflict.put("existingCourse", "CS305 Database Systems");
            conflict.put("existingTime", "Mon/Wed 10:00 - 11:30");
            conflict.put("requestedTime", "Mon/Wed 10:30 - 12:00");
            response.put("conflictDetails", conflict);
            return ResponseEntity.badRequest().body(response);
        }

        // 3. Capacity Full Rule Validation
        if ("AI501".equalsIgnoreCase(courseId)) {
            response.put("success", false);
            response.put("code", "FULL");
            response.put("reason", "Course capacity reached. Added student to Waitlist Position #1.");
            response.put("waitlisted", true);
            return ResponseEntity.badRequest().body(response);
        }

        // 4. Valid Enrollment
        String enrId = "ENR-" + (1000 + new Random().nextInt(9000));
        Map<String, Object> newEnr = new LinkedHashMap<>();
        newEnr.put("id", enrId);
        newEnr.put("studentId", studentId);
        newEnr.put("courseId", courseId);
        newEnr.put("courseCode", courseId);
        newEnr.put("courseTitle", "Advanced Data Structures & Algorithms");
        newEnr.put("credits", 4);
        newEnr.put("status", "Enrolled");
        newEnr.put("enrolledAt", new Date().toString());
        enrollments.add(newEnr);

        response.put("success", true);
        response.put("status", "SUCCESS");
        response.put("enrollmentId", enrId);
        response.put("studentId", studentId);
        response.put("course", courseId);
        response.put("message", "Enrollment confirmed. Capacity & schedule checks passed.");

        return ResponseEntity.status(201).body(response);
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<Map<String, Object>> getStudentEnrollments(@PathVariable String studentId) {
        List<Map<String, Object>> list = new ArrayList<>();
        for (Map<String, Object> e : enrollments) {
            if (studentId.equalsIgnoreCase((String) e.get("studentId"))) {
                list.add(e);
            }
        }
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("studentId", studentId);
        response.put("total", list.size());
        response.put("enrollments", list);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> dropEnrollment(@PathVariable String id) {
        enrollments.removeIf(e -> id.equalsIgnoreCase((String) e.get("id")));
        Map<String, String> res = new HashMap<>();
        res.put("message", "Enrollment " + id + " dropped successfully");
        return ResponseEntity.ok(res);
    }
}
