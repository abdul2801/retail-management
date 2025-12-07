import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3} from "@prisma/adapter-better-sqlite3";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join("./prisma/dev.db");
console.log(dbPath)


const adapter = new PrismaBetterSqlite3({
    url: `file:${dbPath}`,
});

export const prisma = new PrismaClient({ adapter });
