import express from "express";
import cors from "cors";
import salesRoutes from "./routes/sales.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/sales", salesRoutes);


app.listen(3000, "0.0.0.0", () =>
  console.log(`API running on http://0.0.0.0:3000`)
);
