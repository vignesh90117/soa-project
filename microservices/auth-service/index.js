const http = require("http");
const crypto = require("crypto");

const PORT = 8081;
const JWT_SECRET = "academiax_super_secret_jwt_key_2026_ps035";

// Demo User Directory
const demoUsers = {
  "student@academiax.demo": {
    studentId: "STU-1024",
    name: "Rahul Kumar",
    email: "student@academiax.demo",
    password: "password123",
    role: "student",
    title: "Senior CS Student",
    gpa: 3.84,
  },
  "instructor@academiax.demo": {
    studentId: "INS-4010",
    name: "Dr. A. K. Rao",
    email: "instructor@academiax.demo",
    password: "password123",
    role: "instructor",
    title: "Professor of CS",
    gpa: 4.0,
  },
  "admin@academiax.demo": {
    studentId: "ADM-0001",
    name: "System Admin (Marcus)",
    email: "admin@academiax.demo",
    password: "password123",
    role: "admin",
    title: "Enterprise Systems Administrator",
    gpa: 4.0,
  },
};

// HMAC-SHA256 JWT Signer
function signJwt(payload, secret = JWT_SECRET) {
  const header = { alg: "HS256", typ: "JWT" };
  const b64Header = Buffer.from(JSON.stringify(header)).toString("base64url");
  const b64Payload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", secret)
    .update(`${b64Header}.${b64Payload}`)
    .digest("base64url");
  return `${b64Header}.${b64Payload}.${signature}`;
}

// HMAC-SHA256 JWT Verifier
function verifyJwt(token, secret = JWT_SECRET) {
  try {
    if (!token) return { valid: false, error: "Token missing" };
    const cleanToken = token.replace("Bearer ", "").trim();
    const parts = cleanToken.split(".");
    if (parts.length !== 3) return { valid: false, error: "Malformed JWT structure (3 dot-separated parts required)" };

    const [b64Header, b64Payload, signature] = parts;
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${b64Header}.${b64Payload}`)
      .digest("base64url");

    if (signature !== expectedSignature) {
      return { valid: false, error: "Invalid HMAC-SHA256 Token Signature" };
    }

    const payload = JSON.parse(Buffer.from(b64Payload, "base64url").toString("utf8"));
    const header = JSON.parse(Buffer.from(b64Header, "base64url").toString("utf8"));

    const nowSec = Math.floor(Date.now() / 1000);
    if (payload.exp && nowSec > payload.exp) {
      return { valid: false, error: "JWT Token Expired" };
    }

    return { valid: true, header, payload };
  } catch (err) {
    return { valid: false, error: `JWT Verification Failed: ${err.message}` };
  }
}

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

    // 1. POST /api/auth/login Endpoint
    if (url === "/api/auth/login" && req.method === "POST") {
      const email = (parsedBody.email || "student@academiax.demo").toLowerCase().trim();
      const role = parsedBody.role || "student";

      const user = demoUsers[email] || {
        studentId: `STU-${Math.floor(1000 + Math.random() * 9000)}`,
        name: "Authenticated User",
        email,
        role,
        title: "Authenticated Student",
        gpa: 3.5,
      };

      const nowSec = Math.floor(Date.now() / 1000);
      const claimsPayload = {
        sub: user.studentId,
        email: user.email,
        name: user.name,
        role: user.role,
        iss: "AcademiaX Auth Service",
        aud: "AcademiaX API Gateway",
        iat: nowSec,
        exp: nowSec + 3600, // 1 hour expiration
      };

      const jwtToken = signJwt(claimsPayload);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify(
          {
            success: true,
            status: "AUTHENTICATED",
            message: "HMAC-SHA256 JWT Token generated successfully",
            token: jwtToken,
            tokenType: "Bearer",
            expiresIn: 3600,
            claims: claimsPayload,
            user,
          },
          null,
          2
        )
      );
    }
    // 2. POST /api/auth/verify Endpoint
    else if (url === "/api/auth/verify" && req.method === "POST") {
      const tokenToVerify =
        parsedBody.token || req.headers.authorization?.replace("Bearer ", "").trim();

      const verificationResult = verifyJwt(tokenToVerify);

      if (verificationResult.valid) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify(
            {
              valid: true,
              status: "ACTIVE",
              message: "JWT signature and claims verified successfully",
              header: verificationResult.header,
              payload: verificationResult.payload,
              session: "SECURE_HMAC_SHA256",
            },
            null,
            2
          )
        );
      } else {
        res.writeHead(401, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify(
            {
              valid: false,
              status: "UNAUTHORIZED",
              error: verificationResult.error,
              code: "INVALID_JWT_TOKEN",
            },
            null,
            2
          )
        );
      }
    }
    // 3. GET /api/auth/me Endpoint
    else if (url === "/api/auth/me" && req.method === "GET") {
      const authHeader = req.headers.authorization;
      const verification = verifyJwt(authHeader);

      if (!verification.valid) {
        res.writeHead(401, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify(
            { success: false, error: "Unauthorized: Valid Bearer token required", details: verification.error },
            null,
            2
          )
        );
      }

      const userEmail = verification.payload.email;
      const user = demoUsers[userEmail] || demoUsers["student@academiax.demo"];

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: true, user, claims: verification.payload }, null, 2));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Auth Endpoint Not Found" }));
    }
  });
});

server.listen(PORT, () => {
  console.log(`[AUTH MICROSERVICE] HMAC-SHA256 JWT Server listening on http://localhost:${PORT}`);
});
