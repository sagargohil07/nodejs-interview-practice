import { Request, Response } from "express";
import fs from "fs";
import csv from "csv-parser";
import { csvQueue } from "../helper/csv.queue";
import mongoose from "mongoose";

class FilesController {
  async cvsImporting(_req: Request, res: Response) {
    const filePath = "./customers.csv";
    const batchSize = 1000;

    await csvQueue.add("csvQueue", { filePath, batchSize });

    // let batch: any = [];
    // let totalInserted = 0;

    // const stream = fs.createReadStream(filePath, "utf-8").pipe(csv());

    // const customerModel = mongoose.connection.collection("customers");

    // stream.on("data", async (row) => {
    //   stream.pause();

    //   const customer = {
    //     //Index,Customer Id,First Name,Last Name,Company,City,Country,Phone 1,Phone 2,Email,Subscription Date,Website
    //     customerId: row["Customer Id"],
    //     firsName: row["First Name"],
    //     lastName: row["Last Name"],
    //     company: row["Company"],
    //     city: row["City"],
    //     country: row["Country"],
    //     phone1: row["Phone 1"],
    //     phone2: row["Phone 2"],
    //     email: row["Email"],
    //     subcriptionDate: row["Subscription Date"],
    //     website: row["Website"],
    //   };

    //   batch.push(customer);

    //   if (batch.length > batchSize) {
    //     await customerModel.insertMany(batch, { ordered: false });
    //     totalInserted += batch.length;
    //     batch = [];
    //   }

    //   stream.resume();
    // });
    // stream.on("end", async () => {
    //   if (batch.length > 0) {
    //     await customerModel.insertMany(batch, { ordered: false });
    //     totalInserted += batch.length;
    //   }

    //   res.json({ message: "records inserted ", totalInserted });
    // });

    // stream.on("error", (error) => {
    //   res.status(400).json({ message: "import error " });
    // });

    return res.status(200).json({ message: "csv importing stated now " });
  }
}

const fileController = new FilesController();

export default fileController;
