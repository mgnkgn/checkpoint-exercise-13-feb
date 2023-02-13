import React, { useRef, useState } from "react";

const Form = ({ notes }) => {
  const [num, setNum] = useState(notes.length);
  const inputRef = useRef();

  const API_BASE_URL = "http://localhost:3001/";

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const receivedInput = inputRef.current.value;
    console.log(receivedInput);
    inputRef.current.value = "";

    const response = await fetch(API_BASE_URL + "api/posts", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: num + 1 || 1,
        text: receivedInput,
        timestamp: Date.now(),
      }),
    });

    return response.json();
  };
  return (
    <form onSubmit={formSubmitHandler}>
      <input type="text" ref={inputRef} />
      <button type="submit">Save</button>
    </form>
  );
};

export default Form;
