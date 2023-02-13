import React, { useEffect, useState, useRef } from "react";

import "./App.css";
import Form from "./Form.js";

const API_BASE_URL = "http://localhost:3001/";

function App() {
  const newInputRef = useRef();
  const [notes, setNotes] = useState([]);
  const [followEdit, setFollowEdit] = useState(false);
  useEffect(() => {
    const getNotes = async () => {
      const result = await fetch(`${API_BASE_URL}api/posts`);
      const data = await result.json();
      console.log(data);
      setNotes(data);
    };
    getNotes();
  }, []);

  const deleteHandler = (el) => {
    const newNotes = notes.filter((text) => text.id !== el.id);
    setNotes(newNotes);
  };

  const updateHandler = (el) => {
    setFollowEdit(true);
    const incomingText = newInputRef.current.value;
    const textForChange = notes.find((text) => text.id === el.id);
    textForChange.text = incomingText;

    setFollowEdit(false);
  };

  return (
    <div className="main-content">
      <Form notes={notes} />
      <div>
        {notes.map((el, i) => {
          return (
            <div key={`${i}-${el}`}>
              {el.text}
              <button
                onClick={() => {
                  deleteHandler(el);
                }}
              >
                Delete
              </button>
              <button
                onClick={() => {
                  updateHandler(el);
                }}
              >
                Update
              </button>
              {followEdit && (
                <form>
                  <input type="text" ref={newInputRef} />
                  <button onClick={updateHandler}>Edit</button>
                </form>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
