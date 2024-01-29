import React, { useState } from "react";

const Ai = () => {
  const [message, setMessage] = useState("");

  const onChangeHandler = () => {};

  return (
    <div className="flex flex-col h-screen items-center bg-gradient-to-r from-green-400 to-blue-500 dark:from-gray-800 dark:to-gray-900">
      <input name={"message"} value={message} onChange={onChangeHandler} />
    </div>
  );
};

export default Ai;
