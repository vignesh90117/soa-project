const http = require("http");

const PORT = 8761;

const registeredApps = [
  {
    name: "API-GATEWAY",
    instances: [
      { instanceId: "gateway-1", host: "localhost", port: 8080, status: "UP" },
      { instanceId: "gateway-2", host: "localhost", port: 8089, status: "UP" },
    ],
  },
  {
    name: "AUTH-SERVICE",
    instances: [
      { instanceId: "auth-1", host: "localhost", port: 8081, status: "UP" },
      { instanceId: "auth-2", host: "localhost", port: 8091, status: "UP" },
    ],
  },
  {
    name: "COURSE-SERVICE",
    instances: [
      { instanceId: "course-1", host: "localhost", port: 8082, status: "UP" },
      { instanceId: "course-2", host: "localhost", port: 8092, status: "UP" },
      { instanceId: "course-3", host: "localhost", port: 8102, status: "UP" },
    ],
  },
  {
    name: "ENROLLMENT-SERVICE",
    instances: [
      { instanceId: "enrollment-1", host: "localhost", port: 8083, status: "UP" },
      { instanceId: "enrollment-2", host: "localhost", port: 8093, status: "UP" },
      { instanceId: "enrollment-3", host: "localhost", port: 8103, status: "UP" },
    ],
  },
  {
    name: "PAYMENT-SERVICE",
    instances: [
      { instanceId: "payment-1", host: "localhost", port: 8084, status: "UP" },
      { instanceId: "payment-2", host: "localhost", port: 8094, status: "UP" },
    ],
  },
];

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = req.url;

  if (url === "/eureka/apps" || url === "/eureka/apps/") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ eurekaServer: "UP", port: PORT, applications: registeredApps }, null, 2));
  } else if (url === "/eureka/health" || url === "/eureka/health/") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "UP", totalRegisteredApps: registeredApps.length, uptimeSeconds: process.uptime() }, null, 2));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Endpoint not found on Eureka Server" }));
  }
});

server.listen(PORT, () => {
  console.log(`[EUREKA DISCOVERY SERVER] Listening on http://localhost:${PORT}`);
});
