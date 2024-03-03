import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/hf_transformers";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { JSONLoader } from "langchain/document_loaders/fs/json";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { CSVLoader } from "langchain/document_loaders/fs/csv";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

// const embeddings = new HuggingFaceTransformersEmbeddings({
//   modelName: "Xenova/all-MiniLM-L6-v2",
// });
const embeddings = new HuggingFaceTransformersEmbeddings({
  modelName: "nomic-ai/nomic-embed-text-v1",
});
// 8. Define a function to normalize the content of the documents
function normalizeDocuments(docs) {
  return docs.map((doc) => {
    if (typeof doc.pageContent === "string") {
      return doc.pageContent;
    } else if (Array.isArray(doc.pageContent)) {
      return doc.pageContent.join("\n");
    }
  });
}

export const createEmbeddings = async (folder) => {
  try {
    const loader = new DirectoryLoader(`./uploads/${folder}`, {
      ".json": (path) => new JSONLoader(path),
      ".txt": (path) => new TextLoader(path),
      ".csv": (path) => new CSVLoader(path),
      ".pdf": (path) => new PDFLoader(path),
    });

    const docs = await loader.load();

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
    });
    const normalizedDocs = normalizeDocuments(docs);
    const splitDocs = await textSplitter.createDocuments(normalizedDocs);
    const vectorStore = await FaissStore.fromDocuments(splitDocs, embeddings);
    await vectorStore.save(`./embeddings/${folder}`);
    return true;
  } catch (error) {
    return false;
  }
};

export const searchRecords = async (query, folder, topK = 5) => {};

export const createContext = async (query, folder, topK = 3) => {
  try {
    const vectorStore = await FaissStore.load(
      `./embeddings/${folder}`,
      embeddings
    );
    const records = await vectorStore.similaritySearch(query, topK);
    const context = records.map((item) => item.pageContent);

    return context.join("\n\n");
  } catch (error) {
    console.log(error);
  }
};
