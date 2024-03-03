import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl as atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { FaClipboard, FaCheck, FaDrawPolygon,  FaPlayCircle } from "react-icons/fa";
import Mermaid from "./Mermaid";
export const programmingLanguages = {
  javascript: ".js",
  python: ".py",
  java: ".java",
  c: ".c",
  cpp: ".cpp",
  "c++": ".cpp",
  "c#": ".cs",
  ruby: ".rb",
  php: ".php",
  swift: ".swift",
  "objective-c": ".m",
  kotlin: ".kt",
  typescript: ".ts",
  go: ".go",
  perl: ".pl",
  rust: ".rs",
  scala: ".scala",
  haskell: ".hs",
  lua: ".lua",
  shell: ".sh",
  sql: ".sql",
  html: ".html",
  css: ".css",
  // add more file extensions here, make sure the key is same as language prop in CodeBlock.tsx component
};



const CodeBlock = ({ language, value, className }) => {
  const [isMermaid, setIsMermaid] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [output, setOutput] = useState("");

  const copyToClipboard = () => {
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      return;
    }

    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    });
  };
 
  const showDiagram = () => {
    setIsMermaid(!isMermaid);
  };

  const runCode = () => {
    let consoleLogs = [];

    // Capture console.log outputs
    const originalConsoleLog = console.log;
    console.log = (...args) => {
      consoleLogs.push(args.join(" "));
      originalConsoleLog.apply(console, args);
    };

    try {
      // eslint-disable-next-line no-eval
      const result = eval(value);
      setOutput({ result, consoleLogs });
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      console.log = originalConsoleLog;
    }
  };

  return (
    <div
      className={`codeblock bg-slate-950 m-2 p-1 relative font-sans text-[16px] text-zinc-600 ${className}`}
    >
      <div className="flex items-center justify-between py-1.5 px-4">
        <span className="text-xs lowercase text-gray-500 ">{language}</span>

        <div className="flex items-center gap-1">
          <button
            className="flex justify-center items-center text-gray-500 hover:text-black  h-6 w-6 rounded-full p-0.5 bg-gradient-to-br from-gray-800 to-gray-900  hover:bg-white cursor-pointer"
            onClick={copyToClipboard}
          >
            {isCopied ? <FaCheck size={14} title="copied"  /> : <FaClipboard size={14} title="copy" />}
          </button>

          {language === "javascript" && (
            <button
              className="flex justify-center items-center text-gray-500 hover:text-black h-6 w-6 rounded-full p-0.5 bg-gradient-to-br from-gray-800 to-gray-900  hover:bg-white cursor-pointer"
              onClick={runCode}
              title="Run Code" 
            >
              <FaPlayCircle size={14} title="run code" />
            </button>
          )}

          {language === "mermaid" && (
            <button
              className="flex justify-center items-center text-gray-500 hover:text-black  h-6 w-6 rounded-full p-0.5 bg-gradient-to-br from-gray-800 to-gray-900  hover:bg-white cursor-pointer "
              onClick={showDiagram}
              title="View In Mermaid " 
            >
              <FaDrawPolygon size={14}/>
            </button>
          )}
        </div>
      </div>
      {isMermaid ? (
        <Mermaid chart={value} />
      ) : (
        <SyntaxHighlighter
          language={language}
          style={atomDark}
          customStyle={{
            margin: 0,
            fontSize: "12px",
            backgroundColor: "black",
          }}
        >
          {value}
        </SyntaxHighlighter>
      )}

      {output && (
        <div className="text-xs p-2 text-green-500">
          {output.result && (
            <>Result: {output.result !== false && output.result}</>
          )}
          <br/>
          {output.consoleLogs && (
            <>Console: {output.consoleLogs && output.consoleLogs.join(", ")}</>
          )}
        </div>
      )}
    </div>
  );
};
export default CodeBlock;
