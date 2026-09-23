const http = require("http");

const PORT = 8081;

const demoUsers = {
  "student@academiax.demo": {
    studentId: "STU-1024",
    name: "Rahul Kumar",
    email: "student@academiax.demo",
    role: "student",
    title: "Senior CS Student",
    gpa: 3.84,
  },
  "instructor@academiax.demo": {
    studentId: "INS-4010",
    name: "Dr. A. K. Rao",
    email: "instructor@academiax.demo",
    role: "instructor",
    title: "Professor of CS",
    gpa: 4.0,
  },
  "admin@academiax.demo": {
    studentId: "ADM-0001",
    name: "System Admin (Marcus)",
    email: "admin@academiax.demo",
    role: "admin",
    title: "Enterprise Systems Administrator",
    gpa: 4.0,
  },
};

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
    let parsedBody = {};
    try {
      if (body) parsedBody = JSON.parse(body);
    } catch (e) {}

    const url = req.url;

    if (url === "/api/auth/login" && req.method === "POST") {
      const email = parsedBody.email || "student@academiax.demo";
      const role = parsedBody.role || "student";

      const user = demoUsers[email] || {
        studentId: "STU-1024",
        name: "Rahul Kumar",
        email,
        role,
        title: "Authenticated User",
      };

      const token = `jwt_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${Buffer.from(
        JSON.stringify({ sub: user.studentId, role: user.role, email: user.email, iat: Date.now() })
      ).toString("base64")}.sig_${Math.floor(100000 + Math.random() * 900000)}`;

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          success: true,
          message: "JWT Authentication successful",
          token,
          user,
          tokenType: "Bearer",
          expiresIn: 3600,
        }, null, 2)
      );
    } else if (url === "/api/auth/verify" && req.method === "POST") {
      const token = parsedBody.token || req.headers.authorization?.replace("Bearer ", "");
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          valid: true,
          status: "ACTIVE",
          token,
          session: "SECURE",
          issuer: "AcademiaX Auth Microservice",
        }, null, 2)
      );
    } else if (url === "/api/auth/me" && req.method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ user: demoUsers["student@academiax.demo"] }, null, 2));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Auth Endpoint Not Found" }));
    }
  });
});

server.listen(PORT, () => {
  console.log(`[AUTH MICROSERVICE] Listening on http://localhost:${PORT}`);
});
