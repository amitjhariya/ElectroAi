import { MongoClient } from "mongodb";
import { DB_NAME ,MONGODB_URI} from "./index.js";

export const client = new MongoClient(MONGODB_URI);
const db = client.db(DB_NAME);
export default db;
