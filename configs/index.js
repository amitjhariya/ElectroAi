
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";
const options = {
    title : "Custom title bar", 
    defaultPath : "Desktop",
    buttonLabel : "Custom button",
    filters :[
     {name: 'Custom File Type', extensions: ['gguf']},
    ],
    properties: ['openFile','multiSelections']
   }

export { PORT, NODE_ENV,options };
