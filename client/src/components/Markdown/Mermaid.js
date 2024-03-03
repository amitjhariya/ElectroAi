import React, { useEffect } from "react";
import mermaid from "mermaid";
import toast from "react-hot-toast";
import { GiMermaid } from "react-icons/gi";
mermaid.initialize({
  startOnLoad: true,
  theme: "natural",
  securityLevel: "loose",  
  fontFamily: "Fira Code",
  fontSize: "10px",
  
});
const MermaidChart = ({ chart }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const parser = await mermaid.parse(chart);
        if (parser) {
          mermaid.contentLoaded();
        }
      } catch {
        mermaid.setParseErrorHandler((error) => {
          toast.custom((t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } max-w-md w-full bg-black shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
              <div className="flex-1 w-0 p-2">
                <div className="flex items-start">
                  <div className="ml-3 flex flex-col items-center">
                    <GiMermaid className="h-10 w-10 text-white-600 bg-red-300 rounded-full" />
                    <p className="text-sm font-medium text-red-600">
                      Mermaid Chart
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      {error.message}
                    </p>
                    <button
                      onClick={() => toast.dismiss(t.id)}
                      className="mx-auto w-max text-gray-400 text-sm font-bold py-2 px-4 mt-2 rounded-md hover:from-gray-800 hover:from-to-900 bg-gradient-to-br from-gray-900 to-gray-950 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ));
        });
      }
    };
    fetchData();
  }, [chart]);

  return <div className="mermaid">{chart}</div>;
};

export default MermaidChart;
