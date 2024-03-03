import mongoose from "mongoose"
const DB_NAME ="electro_ai"
export const connectToDb = () => {

    if (mongoose.connection.readyState) { console.log("connected++"); return} 
  mongoose.set('strictQuery', true);
  mongoose.connect("mongodb+srv://electroai:Kp25VVlYN6OhCh04@cluster0.cwod5.mongodb.net", {
    dbName: DB_NAME
  });

  const connection = mongoose.connection;

  connection.on("connected", () => {
    console.log(`Connected to MongoDB cluster & Using DB : ${DB_NAME}`);
  });

  connection.on("error", (err) => {
    console.error(`Error connecting to MongoDB: ${err}`);
  });
};
