import { Worker, Job } from "bullmq";
import mongoose from "mongoose";
import fs from "fs";
import csv from "csv-parser";
import dotenv from "dotenv";
dotenv.config();

const worker = new Worker(
  "csvQueue",
  async (job: Job) => {
    console.log("🚀 ~ job.name:", job.name);
    if (job.name === "csvQueue") {
      const { filePath, batchSize } = job.data;

      console.log("🚀 ~ env.MONGO_URI:", process.env.MONGO_URI);
      mongoose
        .connect(process.env.MONGO_URI as string)
        .then(() => console.log("✅ MongoDB Connected"))
        .catch((err) => console.error("Mongo error:", err));

      const customerModel = mongoose.connection.collection("customers");

      let batch: any[] = [];
      let totalInserted = 0;

      return new Promise<void>((resolve, reject) => {
        const stream = fs.createReadStream(filePath).pipe(csv());

        stream.on("data", async (row) => {
          stream.pause();

          const customer = {
            customerId: row["Customer Id"],
            firstName: row["First Name"],
            lastName: row["Last Name"],
            company: row["Company"],
            city: row["City"],
            country: row["Country"],
            phone1: row["Phone 1"],
            phone2: row["Phone 2"],
            email: row["Email"],
            subscriptionDate: row["Subscription Date"],
            website: row["Website"],
          };

          batch.push(customer);

          if (batch.length >= batchSize) {
            try {
              await customerModel.insertMany(batch, { ordered: false });
              totalInserted += batch.length;
              batch = [];
            } catch (err: any) {
              console.error("Batch insert error:", err.message);
            }
          }

          stream.resume();
        });

        stream.on("end", async () => {
          if (batch.length > 0) {
            try {
              await customerModel.insertMany(batch, { ordered: false });
              totalInserted += batch.length;
            } catch (err: any) {
              console.error("Final batch insert error:", err.message);
            }
          }
          console.log(`CSV import finished. Total inserted: ${totalInserted}`);
          resolve();
        });

        stream.on("error", (err) => {
          console.error("CSV stream error:", err);
          reject(err);
        });
      });
    }
  },
  { connection: { host: "127.0.0.1", port: 6379 } },
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed: ${err}`);
});
