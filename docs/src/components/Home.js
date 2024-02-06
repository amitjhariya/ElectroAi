import React from "react";
import { FaWindows } from "react-icons/fa";

function Chat() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-gradient-to-r from-gray-800 via-zinc-900 to-slate-900">
      <section className="w-[90%] flex  justify-center mt-10 h-[70vh] items-center bg-opacity-50 bg-gradient-to-r from-green-700 to-blue-800">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl">
                Welcome to Electro AI
              </h1>
              <p className="mx-auto max-w-[700px] text-white text-md">
              Uncover, download, and execute local Language Model Machines (LLMs) seamlessly.
              </p>
              <p className="mx-auto max-w-[700px] text-white text-xs">
                Explore the full potential of Retrieval Augmented Generation
                with internet search capability on your PC or laptop through our
                platform. Download models and enjoy seamless communication with
                our Open Source language mode. .
              </p>
            </div>
            <div className="space-x-4">
              
              <a
                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-700 px-8 text-sm font-medium text-gray-200 shadow transition-colors hover:bg-gray-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                href="/"
                alt="test"
              >
                <FaWindows size={14} className="mx-2" />
                Download Windows App
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full flex  justify-center  py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter text-gray-200 sm:text-5xl">
                In-App Chat UI
              </h2>
              <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Experience seamless interaction with our in-app chat UI. Enjoy
                real-time communication powered by state-of-the-art language
                models.
              </p>
            </div>
            <div className="w-full max-w-2xl">
              <img
                src="https://generated.vusercontent.net/placeholder.svg"
                width={800}
                height={600}
                alt="Chat UI"
                className="aspect-[4/3] overflow-hidden rounded-xl object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full flex  justify-center  py-12 md:py-24 lg:py-32 bg-gradient-to-r from-purple-700 to-red-800">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl">
              Chat with documents With RAG
              </h2>
              <p className="max-w-[900px] text-white md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Unlock the potential of AI-powered document analysis with our platform. Simplify complex PDFs and summarize lengthy documents effortlessly. Dive into PDFs like never before, with all features available for free. Let AI do the heavy lifting: summarize long documents, explain complex concepts, and find key information in seconds.
              </p>
            </div>
            <a
              className="inline-flex h-10 items-center justify-center rounded-md bg-gray-700 px-8 text-sm font-medium text-gray-200 shadow transition-colors hover:bg-gray-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
              href="/"
              alt="test"
            >
              Explore Now
            </a>
          </div>
        </div>
      </section>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center justify-center px-4 md:px-6 border-t border-gray-700">
        <p className="text-xs text-gray-400">
          © 2024 Electro AI
        </p>
        
      </footer>
    </div>
  );
}

export default Chat;
