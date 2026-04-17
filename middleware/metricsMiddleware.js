const {
  httpRequestsTotal,
  httpRequestDuration,
  activeRequests,
  httpErrorsTotal,
  httpSuccessTotal,
} = require("../metrics");

module.exports = (req, res, next) => {
  const start = Date.now();

  activeRequests.inc(); // increment active requests

  res.on("finish", () => {
    const duration = (Date.now() - start) / 1000;

    const labels = {
      method: req.method,
      route: req.route ? req.route.path : req.originalUrl,
      status: res.statusCode,
    };

    // total requests
    httpRequestsTotal.inc(labels);

    // duration
    httpRequestDuration.observe(labels, duration);

    // success / error
    if (res.statusCode >= 200 && res.statusCode < 400) {
      httpSuccessTotal.inc(labels);
    } else {
      httpErrorsTotal.inc(labels);
    }

    activeRequests.dec(); // decrement active
  });

  next();
};
