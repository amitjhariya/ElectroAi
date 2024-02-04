import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark  } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { FaClipboard, FaDownload, FaCheck } from "react-icons/fa";

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

const generateRandomString = (length, lowercase = false) => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXY3456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return lowercase ? result.toLowerCase() : result;
};

const CodeBlock = ({ language, value, className }) => {
  const [isCopied, setIsCopied] = useState(false);

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
  const downloadAsFile = () => {
    const fileExtension = programmingLanguages[language] || ".file";
    const suggestedFileName = `file-${generateRandomString(
      3,
      true
    )}${fileExtension}`;

    const fileName = window.prompt("Enter file name" || "", suggestedFileName);

    if (!fileName) {
      // user pressed cancel on prompt
      return;
    }

    const blob = new Blob([value], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = fileName;
    link.href = url;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`codeblock bg-zinc-900 m-2 p-1 relative font-sans text-[16px] text-zinc-600 ${className}`}>
      <div className="flex items-center justify-between py-1.5 px-4">
        <span className="text-xs lowercase text-gray-500 ">{language}</span>

        <div className="flex items-center gap-1">
          <button
            className="flex gap-1.5 items-center rounded bg-none p-1 text-xs text-zinc-600  border border-slate-600"
            onClick={copyToClipboard}
          >
            {isCopied ? <FaCheck size={12} /> : <FaClipboard size={12} />}
          </button>
          <button
            className="flex items-center rounded bg-none p-1 text-xs text-zinc-600 border border-slate-600"
            onClick={downloadAsFile}
          >
            <FaDownload size={12} />
          </button>
        </div>
      </div>

      <SyntaxHighlighter
        language={language}
        style={atomDark }
        customStyle={{ margin: 0 }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
};
export default CodeBlock;
