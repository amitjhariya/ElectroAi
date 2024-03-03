import React, { useState } from "react";
import useDocsService from "../../services/useDocsService.js";

import { FaSpinner } from "react-icons/fa";
import toast from "react-hot-toast";
const DocsLoader = ({ refetch, documents ,handleContext,context}) => {
  const { loadDocuments, deleteDocuments } = useDocsService();
  const [isLoading, setIsLoading] = useState(false);

  const handleDocument = async (context) => {
    setIsLoading(true);
    try {
      const res = await loadDocuments({ context });
      if (res.message === "success") {
        toast("Document Loaded");
        refetch();
      }
    } catch (error) {
      console.log(error)
      toast("Something Went Wrong");
    }
    setIsLoading(false);
  };

  const handleDocumentDelete = async (context) => {
    setIsLoading(true);
    try {
      const res = await deleteDocuments(context);
    if (res.message === "success") {
      toast("Document Deleted");
      refetch();
    }
    } catch (error) {
      console.log(error)
      toast("Something Went Wrong");
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full flex justify-center items-center p-6 ">
      <div className="absolute">
        {isLoading && (
          <FaSpinner
            className="animate-spin text-center  text-black"
            size={18}
          />
        )}
      </div>

      <table className="mt-2 w-full border-collapse border  border-gray-700 text-gray-400 text-left">
        <thead className="bg-slate-950">
          <tr>
            <th className="p-2">Context</th>
            <th className="p-2 text-right">Status</th>
            <th className="p-2 text-right">Action</th>
            <th className="p-2 text-right">Is Use</th>
          </tr>
        </thead>
        <tbody>
          {documents?.folders?.map((doc, docIndex) => {
            const isIndexed = documents?.embeddings?.includes(doc);

            return (
              <tr
                key={docIndex}
                className={ `text-xs ${docIndex % 2 === 0 ? "bg-slate-900" : "bg-slate-800"}`}
              >
                <td className="p-2 capitalize">{doc}</td>
                <td className="p-2 text-right">
                  {isIndexed ? (
                    <p>Loaded</p>
                  ) : (
                    <button
                      onClick={() => {
                        handleDocument(doc);
                      }}
                      className="bg-slate-900 py-1 px-2 rounded-md"
                    >
                      Load
                    </button>
                  )}
                </td>
                <td className="p-2 text-right">
                  <button
                    onClick={() => {
                      handleDocumentDelete(doc);
                    }}
                    className="bg-slate-900 py-1 px-2 rounded-md"
                  >
                    Delete
                  </button>
                </td>
                <td className="p-2 text-right">
                {isIndexed && <button
                    onClick={() => {
                      handleContext(doc);
                    }}
                    className="bg-slate-900 py-1 px-2 rounded-md"
                  >
                    {context!==doc ? "Activate" :"Deactivate"}
                  </button>}
                
                  
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DocsLoader;
