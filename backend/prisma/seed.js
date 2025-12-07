// import "dotenv/config";
// import fs from "fs";
// import csv from "csv-parser";
// // Prisma client (CommonJS export)
// import prismaPkg from "@prisma/client";
// const { PrismaClient } = prismaPkg;

// // Adapter also requires namespace import
// import * as adapterPkg from "@prisma/adapter-better-sqlite3";
// const { PrismaBetterSqlite3 } = adapterPkg;
// const adapter = new PrismaBetterSqlite3({
//   url: process.env.SQLITE_PATH || process.env.DATABASE_URL, // depending on your config
// });

// const prisma = new PrismaClient({ adapter });

// const BATCH_SIZE = 10000; // safe balance (adjust if needed)

// async function processBatch(batch) {
//   if (batch.length === 0) return;

//   const queries = batch.flatMap((row) => [
//     prisma.customer.upsert({
//       where: { customerId: row["Customer ID"] },
//       update: {},
//       create: {
//         customerId: row["Customer ID"],
//         customerName: row["Customer Name"],
//         phoneNumber: row["Phone Number"],
//         gender: row["Gender"],
//         age: Number(row["Age"]),
//         customerRegion: row["Customer Region"],
//         customerType: row["Customer Type"],
//       },
//     }),

//     prisma.product.upsert({
//       where: { productId: row["Product ID"] },
//       update: {},
//       create: {
//         productId: row["Product ID"],
//         productName: row["Product Name"],
//         brand: row["Brand"],
//         productCategory: row["Product Category"],
//         tags: row["Tags"],
//       },
//     }),

//     prisma.store.upsert({
//       where: { storeId: row["Store ID"] },
//       update: {},
//       create: {
//         storeId: row["Store ID"],
//         storeLocation: row["Store Location"],
//       },
//     }),

//     prisma.employee.upsert({
//       where: { salespersonId: row["Salesperson ID"] },
//       update: {},
//       create: {
//         salespersonId: row["Salesperson ID"],
//         employeeName: row["Employee Name"],
//       },
//     }),

//     prisma.sale.create({
//       data: {
//         transactionId: Number(row["Transaction ID"]),
//         date: new Date(row["Date"]),
//         quantity: Number(row["Quantity"]),
//         pricePerUnit: Number(row["Price per Unit"]),
//         discountPercentage: Number(row["Discount Percentage"]),
//         totalAmount: Number(row["Total Amount"]),
//         finalAmount: Number(row["Final Amount"]),
//         paymentMethod: row["Payment Method"],
//         orderStatus: row["Order Status"],
//         deliveryType: row["Delivery Type"],
//         customerId: row["Customer ID"],
//         productId: row["Product ID"],
//         storeId: row["Store ID"],
//         salespersonId: row["Salesperson ID"],
//       },
//     }),
//   ]);

//   await prisma.$transaction(queries);
// }

// async function seed() {
//   console.log("📦 Streaming CSV...");

//   let batch = [];
//   let total = 0;

//   const stream = fs.createReadStream("./prisma/data.csv").pipe(csv());

//   for await (const row of stream) {
//     batch.push(row);

//     if (batch.length >= BATCH_SIZE) {
//       await processBatch(batch);
//       total += batch.length;
//       batch = [];
//       console.log(`→ Inserted ${total} rows...`);
//     }
//   }

//   // process leftover rows
//   if (batch.length > 0) {
//     await processBatch(batch);
//     total += batch.length;
//   }

//   console.log(`🎉 DONE — Imported ${total} rows.`);
//   await prisma.$disconnect();
// }

// seed().catch((err) => {
//   console.error("❌ Error:", err);
//   prisma.$disconnect();
// });
