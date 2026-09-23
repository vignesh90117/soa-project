const { spawn } = require("child_process");
const path = require("path");

const services = [
  { name: "EUREKA-SERVER", path: "./eureka-server/index.js", port: 8761 },
  { name: "AUTH-SERVICE", path: "./auth-service/index.js", port: 8081 },
  { name: "COURSE-SERVICE", path: "./course-service/index.js", port: 8082 },
  { name: "ENROLLMENT-SERVICE", path: "./enrollment-service/index.js", port: 8083 },
  { name: "PAYMENT-SERVICE", path: "./payment-service/index.js", port: 8084 },
  { name: "API-GATEWAY", path: "./api-gateway/index.js", port: 8080 },
];

console.log("==========================================================");
console.log("🚀 STARTING ACADEMIAX MICROSERVICES SYSTEM CLUSTER...");
console.log("==========================================================");

const children = [];

services.forEach((svc) => {
  const child = spawn("node", [path.join(__dirname, svc.path)], {
    stdio: "pipe",
    env: process.env,
  });

  child.stdout.on("data", (data) => {
    console.log(`[${svc.name}:${svc.port}] ${data.toString().trim()}`);
  });

  child.stderr.on("data", (data) => {
    console.error(`[${svc.name}:${svc.port}] ERROR: ${data.toString().trim()}`);
  });

  children.push(child);
});

process.on("SIGINT", () => {
  console.log("\nShutting down all AcademiaX microservice nodes...");
  children.forEach((c) => c.kill());
  process.exit(0);
});
