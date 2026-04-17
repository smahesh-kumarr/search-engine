const client = require("prom-client");

// Create a registry
const register = new client.Registry();

// 📊 Metrics

const httpRequestsTotal = new client.Counter({
  name: "http_requests_total",
  help: "Total HTTP requests",
  labelNames: ["method", "route", "status"],
});

const httpRequestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "HTTP request duration",
  labelNames: ["method", "route", "status"],
  buckets: [0.1, 0.3, 0.5, 1, 2, 5],
});

const activeRequests = new client.Gauge({
  name: "http_active_requests",
  help: "Active requests",
});

const httpErrorsTotal = new client.Counter({
  name: "http_errors_total",
  help: "Total failed requests",
  labelNames: ["method", "route", "status"],
});

const httpSuccessTotal = new client.Counter({
  name: "http_success_total",
  help: "Total successful requests",
  labelNames: ["method", "route", "status"],
});

// Register metrics
register.registerMetric(httpRequestsTotal);
register.registerMetric(httpRequestDuration);
register.registerMetric(activeRequests);
register.registerMetric(httpErrorsTotal);
register.registerMetric(httpSuccessTotal);

module.exports = {
  register,
  httpRequestsTotal,
  httpRequestDuration,
  activeRequests,
  httpErrorsTotal,
  httpSuccessTotal,
};
