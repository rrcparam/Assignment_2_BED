import express, { Request, Response } from "express";
import morgan from "morgan";
import employeeRoutes from "./api/v1/routes/employeeRoutes";
import branchRoutes from "./api/v1/routes/branchRoutes";


const app = express();

app.use(express.json());
app.use(morgan("combined"));
app.use("/api/v1/employees", employeeRoutes);
app.use("/api/v1/branches", branchRoutes);

// Health check route
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).send("Server is healthy");
});

export default app;
