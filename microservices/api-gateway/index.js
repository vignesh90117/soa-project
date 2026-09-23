const http = require("http");
const crypto = require("crypto");

const PORT = 8080;
const JWT_SECRET = "academiax_super_secret_jwt_key_2026_ps035";

// Verification Helper for API Gateway Security Layer
function verifyGatewayJwt(token) {
  try {
    if (!token) return { valid: false, error: "Missing Bearer Authorization Header" };
    const cleanToken = token.replace("Bearer ", "").trim();
    const parts = cleanToken.split(".");
    if (parts.length !== 3) return { valid: false, error: "Malformed JWT Token Structure" };

    const [b64Header, b64Payload, signature] = parts;
    const expectedSignature = crypto
      .createHmac("sha256", JWT_SECRET)
      .update(`${b64Header}.${b64Payload}`)
      .digest("base64url");

    if (signature !== expectedSignature) {
      return { valid: false, error: "Invalid HMAC-SHA256 Token Signature" };
    }

    const payload = JSON.parse(Buffer.from(b64Payload, "base64url").toString("utf8"));
    const nowSec = Math.floor(Date.now() / 1000);
    if (payload.exp && nowSec > payload.exp) {
      return { valid: false, error: "JWT Token Expired" };
    }

    return { valid: true, payload };
  } catch (e) {
    return { valid: false, error: e.message };
  }
}

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
  const method = req.method;

  // 1. Identify Target Microservice Port
  let targetService = null;
  let targetPort = null;
  let isProtected = false;

  if (url.startsWith("/api/auth")) {
    targetService = "AUTH-SERVICE";
    targetPort = 8081;
  } else if (url.startsWith("/api/courses")) {
    targetService = "COURSE-SERVICE";
    targetPort = 8082;
    if (method === "POST" || method === "PUT" || method === "DELETE") isProtected = true;
  } else if (url.startsWith("/api/enrollments")) {
    targetService = "ENROLLMENT-SERVICE";
    targetPort = 8083;
    if (method === "POST" || method === "DELETE") isProtected = true;
  } else if (url.startsWith("/api/payments")) {
    targetService = "PAYMENT-SERVICE";
    targetPort = 8084;
    if (method === "POST") isProtected = true;
  } else if (url.startsWith("/eureka")) {
    targetService = "EUREKA-SERVER";
    targetPort = 8761;
  }

  if (!targetPort) {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "API Gateway: No routing rule matched path", path: url }));
  }

  // 2. Gateway Security Interceptor: Verify Authorization Bearer JWT Token for protected routes
  if (isProtected) {
    const authHeader = req.headers.authorization;
    const authResult = verifyGatewayJwt(authHeader);

    if (!authResult.valid) {
      res.writeHead(401, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify(
          {
            status: 401,
            error: "Unauthorized: JWT Authentication Required",
            path: url,
            reason: authResult.error,
            gatewayMessage: "API Gateway blocked request because valid Authorization Bearer token was missing or invalid.",
          },
          null,
          2
        )
      );
    }
  }

  // 3. Dispatch to Target Microservice Node
  const startTime = Date.now();
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

  const proxyReq = http.request(options, (proxyRes) => {
    const gatewayLatency = Date.now() - startTime;
    res.setHeader("X-Gateway-Latency-Ms", gatewayLatency.toString());
    res.setHeader("X-Gateway-Routed-To", `${targetService}:${targetPort}`);
    res.setHeader("X-JWT-Authorization", isProtected ? "VERIFIED_ACTIVE" : "PUBLIC");
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res);
  });

  proxyReq.on("error", (err) => {
    res.writeHead(503, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify(
        {
          error: `API Gateway Error: Target service ${targetService} on port ${targetPort} unreachable`,
          message: err.message,
        },
        null,
        2
      )
    );
  });

  req.pipe(proxyReq);
});

server.listen(PORT, () => {
  console.log(`[API GATEWAY ROUTER] JWT Security Layer active listening on http://localhost:${PORT}`);
});
