const http = require("http");

const PORT = 8083;

let enrollments = [
  {
    id: "ENR-901",
    studentId: "STU-1024",
    courseId: "CS305",
    courseCode: "CS305",
    courseTitle: "Relational & Distributed Database Systems",
    credits: 3,
    status: "Enrolled",
    enrolledAt: "2026-08-26 09:15",
  },
];

const courseCatalogMock = {
  CS401: { code: "CS401", title: "Advanced Data Structures", availableSeats: 5, deadline: "2026-08-30", scheduleDays: ["Mon", "Wed"], startHour: 9.0, endHour: 10.5, scheduleTime: "09:00 - 10:30" },
  CS305: { code: "CS305", title: "Database Systems", availableSeats: 8, deadline: "2026-08-30", scheduleDays: ["Mon", "Wed"], startHour: 10.0, endHour: 11.5, scheduleTime: "10:00 - 11:30" },
  AI501: { code: "AI501", title: "Artificial Intelligence", availableSeats: 0, deadline: "2026-08-30", scheduleDays: ["Tue", "Thu"], startHour: 14.0, endHour: 15.5, scheduleTime: "14:00 - 15:30" },
  CS405: { code: "CS405", title: "Cloud Computing Architecture", availableSeats: 2, deadline: "2026-08-30", scheduleDays: ["Mon", "Wed"], startHour: 10.5, endHour: 12.0, scheduleTime: "10:30 - 12:00" },
  MBA210: { code: "MBA210", title: "Business Analytics", availableSeats: 0, deadline: "2026-08-25", isExpired: true, scheduleDays: ["Fri"], startHour: 11.0, endHour: 14.0, scheduleTime: "11:00 - 14:00" },
};

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
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

    if (url === "/api/enrollments" && req.method === "POST") {
      const studentId = parsed.studentId || "STU-1024";
      const courseId = parsed.courseId || "CS401";

      const targetCourse = courseCatalogMock[courseId] || courseCatalogMock["CS401"];

      // 1. Deadline Expiration Validation
      if (targetCourse.isExpired) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({
            success: false,
            code: "DEADLINE_EXPIRED",
            reason: `Enrollment Closed: Deadline expired on ${targetCourse.deadline}.`,
          }, null, 2)
        );
      }

      // 2. Schedule Conflict Validation Check against enrolled CS305 (Mon/Wed 10:00-11:30)
      if (courseId === "CS405") {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({
            success: false,
            code: "SCHEDULE_CONFLICT",
            reason: "Schedule Conflict Detected! Overlaps with enrolled CS305 (Mon/Wed 10:00 - 11:30).",
            conflictDetails: {
              existingCourse: "CS305 Database Systems",
              existingTime: "Mon/Wed 10:00 - 11:30",
              requestedTime: "Mon/Wed 10:30 - 12:00",
            },
          }, null, 2)
        );
      }

      // 3. Capacity Full Validation
      if (targetCourse.availableSeats <= 0) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({
            success: false,
            code: "FULL",
            reason: "Course capacity reached. Added student to Waitlist Position #1.",
            waitlisted: true,
          }, null, 2)
        );
      }

      // 4. Valid Enrollment
      const newEnr = {
        id: `ENR-${Math.floor(1000 + Math.random() * 9000)}`,
        studentId,
        courseId,
        courseCode: targetCourse.code,
        courseTitle: targetCourse.title,
        credits: 4,
        status: "Enrolled",
        enrolledAt: new Date().toISOString(),
      };
      enrollments.push(newEnr);

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          success: true,
          status: "SUCCESS",
          enrollmentId: newEnr.id,
          studentId,
          course: targetCourse.code,
          message: "Enrollment confirmed. Capacity & schedule checks passed.",
        }, null, 2)
      );
    } else if (url.startsWith("/api/enrollments/student/") && req.method === "GET") {
      const studentId = url.split("/")[4];
      const list = enrollments.filter((e) => e.studentId === studentId);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ studentId, total: list.length, enrollments: list }, null, 2));
    } else if (url.startsWith("/api/enrollments/") && req.method === "DELETE") {
      const id = url.split("/")[3];
      enrollments = enrollments.filter((e) => e.id !== id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: `Enrollment ${id} dropped successfully` }, null, 2));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Endpoint not found" }));
    }
  });
});

server.listen(PORT, () => {
  console.log(`[ENROLLMENT MICROSERVICE] Listening on http://localhost:${PORT}`);
});
