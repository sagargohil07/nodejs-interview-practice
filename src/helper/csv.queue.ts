import { Queue } from "bullmq";

export const csvQueue = new Queue("csvQueue", {
  connection: { host: "127.0.0.1", port: 6379 },
});

export const csvImportProcess = async (filePath: string, batchSize: 1000) => {
  return await csvQueue.add("csvQueue", { filePath, batchSize });
};

// new Worker(
//   "csvQueue",
//   async (job) => {
//     const filePath = "./customers.csv";
//     const batchSize = 1000;

//     let batch: any = [];
//     let totalInserted = 0;
//     const customerModel = mongoose.connection.collection("customers");

//     return new Promise<void>((resolve, reject) => {
//       const stream = fs.createReadStream(filePath, "utf-8").pipe(csv());

//       stream.on("data", async (row) => {
//         stream.pause();

//         const customer = {
//           //Index,Customer Id,First Name,Last Name,Company,City,Country,Phone 1,Phone 2,Email,Subscription Date,Website
//           customerId: row["Customer Id"],
//           firsName: row["First Name"],
//           lastName: row["Last Name"],
//           company: row["Company"],
//           city: row["City"],
//           country: row["Country"],
//           phone1: row["Phone 1"],
//           phone2: row["Phone 2"],
//           email: row["Email"],
//           subcriptionDate: row["Subscription Date"],
//           website: row["Website"],
//         };

//         batch.push(customer);

//         if (batch.length > batchSize) {
//           await customerModel.insertMany(batch, { ordered: false });
//           totalInserted += batch.length;
//           batch = [];
//         }

//         stream.resume();
//       });
//       stream.on("end", async () => {
//         if (batch.length > 0) {
//           await customerModel.insertMany(batch, { ordered: false });
//           totalInserted += batch.length;
//         }

//         // res.json({ message: "records inserted ", totalInserted });
//         console.log(`CSV import finished. Total inserted: ${totalInserted}`);
//         resolve();
//       });

//       stream.on("error", (error) => {
//         // res.status(400).json({ message: "import error " });
//         console.error("CSV stream error:", error);
//         reject(error);
//       });
//     });
//   },
//   {
//     connection: { host: "127.0.0.1", port: 6379 },
//   },
// );
