const http = require("http");

const PORT = 8080;

const routes = {
  "/api/auth": "http://localhost:8081",
  "/api/courses": "http://localhost:8082",
  "/api/enrollments": "http://localhost:8083",
  "/api/payments": "http://localhost:8084",
  "/eureka": "http://localhost:8761",
};

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = req.url;
  let targetService = null;
  let targetPort = null;

  if (url.startsWith("/api/auth")) {
    targetService = "AUTH-SERVICE";
    targetPort = 8081;
  } else if (url.startsWith("/api/courses")) {
    targetService = "COURSE-SERVICE";
    targetPort = 8082;
  } else if (url.startsWith("/api/enrollments")) {
    targetService = "ENROLLMENT-SERVICE";
    targetPort = 8083;
  } else if (url.startsWith("/api/payments")) {
    targetService = "PAYMENT-SERVICE";
    targetPort = 8084;
  } else if (url.startsWith("/eureka")) {
    targetService = "EUREKA-SERVER";
    targetPort = 8761;
  }

  if (!targetPort) {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "API Gateway: No route rule matched request path", path: url }));
  }

  const options = {
    hostname: "localhost",
    port: targetPort,
    path: url,
    method: req.method,
    headers: {
      ...req.headers,
      "X-Forwarded-Host": "localhost:8080",
      "X-Gateway-Trace-Id": `gw-trace-${Date.now()}`,
    },
  };

  const startTime = Date.now();

  const proxyReq = http.request(options, (proxyRes) => {
    const gatewayLatency = Date.now() - startTime;
    res.setHeader("X-Gateway-Latency-Ms", gatewayLatency.toString());
    res.setHeader("X-Gateway-Routed-To", `${targetService}:${targetPort}`);
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res);
  });

  proxyReq.on("error", (err) => {
    res.writeHead(503, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        error: `API Gateway Error: Target service ${targetService} on port ${targetPort} unreachable`,
        message: err.message,
      }, null, 2)
    );
  });

  req.pipe(proxyReq);
});

server.listen(PORT, () => {
  console.log(`[API GATEWAY ROUTER] Listening on http://localhost:${PORT}`);
  console.log(`[API GATEWAY ROUTER] Routing rules:`);
  console.log(`  - /api/auth       ➔ AUTH-SERVICE (8081)`);
  console.log(`  - /api/courses    ➔ COURSE-SERVICE (8082)`);
  console.log(`  - /api/enrollments ➔ ENROLLMENT-SERVICE (8083)`);
  console.log(`  - /api/payments   ➔ PAYMENT-SERVICE (8084)`);
  console.log(`  - /eureka         ➔ EUREKA-SERVER (8761)`);
});
