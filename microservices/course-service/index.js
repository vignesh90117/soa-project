const http = require("http");

const PORT = 8082;

let courses = [
  {
    id: "CS401",
    code: "CS401",
    title: "Advanced Data Structures & Algorithms",
    department: "Computer Science",
    credits: 4,
    instructor: "Dr. A. K. Rao",
    capacity: 40,
    enrolledCount: 35,
    availableSeats: 5,
    scheduleDays: ["Mon", "Wed"],
    scheduleTime: "09:00 - 10:30",
    startHour: 9.0,
    endHour: 10.5,
    location: "Science Block Room 302",
    deadline: "2026-08-30",
    prerequisites: ["CS201 Data Structures"],
    level: "Advanced",
  },
  {
    id: "CS305",
    code: "CS305",
    title: "Relational & Distributed Database Systems",
    department: "Computer Science",
    credits: 3,
    instructor: "Dr. S. Kumar",
    capacity: 35,
    enrolledCount: 27,
    availableSeats: 8,
    scheduleDays: ["Mon", "Wed"],
    scheduleTime: "10:00 - 11:30",
    startHour: 10.0,
    endHour: 11.5,
    location: "IT Building Lab 4",
    deadline: "2026-08-30",
    prerequisites: ["CS101 Intro Programming"],
    level: "Intermediate",
  },
  {
    id: "AI501",
    code: "AI501",
    title: "Artificial Intelligence & Machine Learning",
    department: "Artificial Intelligence",
    credits: 4,
    instructor: "Dr. P. Sharma",
    capacity: 30,
    enrolledCount: 30,
    availableSeats: 0,
    scheduleDays: ["Tue", "Thu"],
    scheduleTime: "14:00 - 15:30",
    startHour: 14.0,
    endHour: 15.5,
    location: "AI Center Hall B",
    deadline: "2026-08-30",
    prerequisites: ["CS401 Data Structures"],
    level: "Advanced",
  },
  {
    id: "CS405",
    code: "CS405",
    title: "Cloud Computing Architecture & Microservices",
    department: "Computer Science",
    credits: 4,
    instructor: "Dr. M. Patel",
    capacity: 40,
    enrolledCount: 38,
    availableSeats: 2,
    scheduleDays: ["Mon", "Wed"],
    scheduleTime: "10:30 - 12:00",
    startHour: 10.5,
    endHour: 12.0,
    location: "Engineering Hall 101",
    deadline: "2026-08-30",
    prerequisites: ["CS305 Database Systems"],
    level: "Advanced",
  },
  {
    id: "MBA210",
    code: "MBA210",
    title: "Enterprise Business Analytics & Metrics",
    department: "Business School",
    credits: 3,
    instructor: "Prof. R. Mehta",
    capacity: 50,
    enrolledCount: 50,
    availableSeats: 0,
    scheduleDays: ["Fri"],
    scheduleTime: "11:00 - 14:00",
    startHour: 11.0,
    endHour: 14.0,
    location: "Management Block 204",
    deadline: "2026-08-25",
    isDeadlineExpired: true,
    prerequisites: ["MATH101 Statistics"],
    level: "Intermediate",
  },
];

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS");
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

    if ((url === "/api/courses" || url === "/api/courses/") && req.method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ total: courses.length, courses }, null, 2));
    } else if (url.startsWith("/api/courses/") && req.method === "GET") {
      const id = url.split("/")[3];
      const course = courses.find((c) => c.id === id || c.code === id);
      if (course) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ course }, null, 2));
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: `Course ${id} not found` }));
      }
    } else if (url === "/api/courses" && req.method === "POST") {
      const newCourse = {
        id: parsed.code || `CS${Math.floor(500 + Math.random() * 500)}`,
        code: parsed.code || "CS505",
        title: parsed.title || "New Microservices Course",
        department: parsed.department || "Computer Science",
        credits: parsed.credits || 4,
        instructor: parsed.instructor || "Dr. Instructor",
        capacity: parsed.capacity || 40,
        enrolledCount: 0,
        availableSeats: parsed.capacity || 40,
        scheduleDays: parsed.scheduleDays || ["Tue", "Thu"],
        scheduleTime: parsed.scheduleTime || "11:00 - 12:30",
        startHour: 11.0,
        endHour: 12.5,
        location: "Lab 101",
        deadline: parsed.deadline || "2026-09-30",
        prerequisites: parsed.prerequisites || [],
        level: "Advanced",
      };

      courses.push(newCourse);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Course created successfully", course: newCourse }, null, 2));
    } else if (url.includes("/capacity") && req.method === "PUT") {
      const id = url.split("/")[3];
      const course = courses.find((c) => c.id === id || c.code === id);
      if (course) {
        course.capacity = parsed.capacity || course.capacity + 10;
        course.availableSeats = Math.max(0, course.capacity - course.enrolledCount);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Capacity updated", course }, null, 2));
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: `Course ${id} not found` }));
      }
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Endpoint not found" }));
    }
  });
});

server.listen(PORT, () => {
  console.log(`[COURSE MICROSERVICE] Listening on http://localhost:${PORT}`);
});
