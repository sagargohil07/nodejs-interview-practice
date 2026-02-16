import express, { Application } from "express";
import { connectDB } from "./config/db";
import dotenv from "dotenv";
import status from "express-status-monitor";
import authRoutes from "./routes/auth.routes";
import fs from "fs";
import fileRoutes from "./routes/file.routes";

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(status());

app.get("/", (req, res) => {
  res.send("app is running");
});

app.use("/api/auth", authRoutes);

app.use("/file", fileRoutes);

//Batch Processing
app.use("/insert-records", (req, res) => {
  res.send("runing");
});

// //Streams demo
// app.use("/records", (req, res) => {
//   const stream = fs.createReadStream("./customers.csv", "utf-8");
//   stream.on("data", (chunk) => {
//     res.write(chunk);
//   });
//   stream.on("end", () => {
//     res.send();
//   });
//   // , (error, result) => {
//   //   let data;
//   //   if (error) {
//   //     console.log("error while file handlign :", error.message);
//   //     res.send({ message: ` error while file handlign : ${error.message}` });
//   //   } else {
//   //     data = result;
//   //   }
//   //   res.json(JSON.stringify(data, null, 2));
//   // }
// });

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("failed to start server ", error);
    process.exit(1);
  }
};

startServer();

export default app;
