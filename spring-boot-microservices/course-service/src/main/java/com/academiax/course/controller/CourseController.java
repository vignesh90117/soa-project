package com.academiax.course.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "*")
public class CourseController {

    private final List<Map<String, Object>> courseList = new ArrayList<>();

    public CourseController() {
        courseList.add(createCourse("CS401", "Advanced Data Structures & Algorithms", "Computer Science", 4, "Dr. A. K. Rao", 40, 35, 5, "Mon/Wed 09:00-10:30", "Science Block 302", "2026-08-30"));
        courseList.add(createCourse("CS305", "Relational & Distributed Database Systems", "Computer Science", 3, "Dr. S. Kumar", 35, 27, 8, "Mon/Wed 10:00-11:30", "IT Building Lab 4", "2026-08-30"));
        courseList.add(createCourse("AI501", "Artificial Intelligence & Machine Learning", "Artificial Intelligence", 4, "Dr. P. Sharma", 30, 30, 0, "Tue/Thu 14:00-15:30", "AI Center Hall B", "2026-08-30"));
        courseList.add(createCourse("CS405", "Cloud Computing Architecture & Microservices", "Computer Science", 4, "Dr. M. Patel", 40, 38, 2, "Mon/Wed 10:30-12:00", "Engineering Hall 101", "2026-08-30"));
        courseList.add(createCourse("MBA210", "Enterprise Business Analytics & Metrics", "Business School", 3, "Prof. R. Mehta", 50, 50, 0, "Fri 11:00-14:00", "Management Block 204", "2026-08-25"));
    }

    private Map<String, Object> createCourse(String code, String title, String dept, int credits, String instructor, int capacity, int enrolled, int available, String schedule, String location, String deadline) {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("id", code);
        map.put("code", code);
        map.put("title", title);
        map.put("department", dept);
        map.put("credits", credits);
        map.put("instructor", instructor);
        map.put("capacity", capacity);
        map.put("enrolledCount", enrolled);
        map.put("availableSeats", available);
        map.put("scheduleTime", schedule);
        map.put("location", location);
        map.put("deadline", deadline);
        return map;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllCourses() {
        Map<String, Object> res = new LinkedHashMap<>();
        res.put("total", courseList.size());
        res.put("courses", courseList);
        return ResponseEntity.ok(res);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getCourseById(@PathVariable String id) {
        for (Map<String, Object> c : courseList) {
            if (id.equalsIgnoreCase((String) c.get("id")) || id.equalsIgnoreCase((String) c.get("code"))) {
                Map<String, Object> res = new HashMap<>();
                res.put("course", c);
                return ResponseEntity.ok(res);
            }
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}/capacity")
    public ResponseEntity<Map<String, Object>> updateCapacity(@PathVariable String id, @RequestBody Map<String, Integer> req) {
        int newCap = req.getOrDefault("capacity", 50);
        for (Map<String, Object> c : courseList) {
            if (id.equalsIgnoreCase((String) c.get("id"))) {
                c.put("capacity", newCap);
                int enrolled = (int) c.get("enrolledCount");
                c.put("availableSeats", Math.max(0, newCap - enrolled));
                Map<String, Object> res = new HashMap<>();
                res.put("message", "Capacity updated successfully");
                res.put("course", c);
                return ResponseEntity.ok(res);
            }
        }
        return ResponseEntity.notFound().build();
    }
}
