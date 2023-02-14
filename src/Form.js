import React, { useRef, useState } from "react";

const Form = ({ notes, addNewText }) => {
  const [num, setNum] = useState(notes.length);
  const inputRef = useRef();

  const API_BASE_URL = "http://localhost:3001/";

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const receivedInput = inputRef.current.value;
    console.log(receivedInput);
    inputRef.current.value = "";

    addNewText({
      id: num + 1 || 1,
      text: receivedInput.toString(),
      timestamp: Date.now(),
    });
    const response = await fetch(`${API_BASE_URL}api/posts`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: receivedInput.toString(),
      }),
    });

    const json = await response.json();
    console.log(json);
  };
  return (
    <form onSubmit={formSubmitHandler}>
      <input type="text" ref={inputRef} />
      <button type="submit">Save</button>
    </form>
  );
};

export default Form;
