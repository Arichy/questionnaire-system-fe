const isProduction = process.env.NODE_ENV.toLowerCase() === "production";

export const HOST = isProduction
  ? "http://60.205.179.88:7001"
  : "http://127.0.0.1:7001";
