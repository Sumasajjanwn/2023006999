const Log = require("../logging_middleware/logger");

async function run() {

  await Log(
    "backend",
    "info",
    "service",
    "Notification service started"
  );

  await Log(
    "backend",
    "debug",
    "handler",
    "Processing notification request"
  );

  await Log(
    "backend",
    "warn",
    "middleware",
    "Rate limit nearing threshold"
  );

  await Log(
    "backend",
    "error",
    "handler",
    "Invalid email address received"
  );

}

run();