const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const metricsMiddleware = require("./middleware/metricsMiddleware");
const { register } = require("./metrics");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(express.json());

// ✅ CORS
const allowedOrigins = process.env.FRONTEND_URL.split(",");
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  }),
);

// ✅ Metrics endpoint (not tracked)
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

// ✅ Metrics middleware
app.use(metricsMiddleware);

app.get("/", (req, res) => {
  res.send("Auth Service is running");
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/search", require("./routes/searchRoutes"));

const PORT = process.env.PORT || 5000;

// ✅ Start server after DB connection
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();
