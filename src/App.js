import React, { useEffect, useState, useRef } from "react";

import "./App.css";
import Form from "./Form.js";

const API_BASE_URL = "http://localhost:3001/";

function App() {
  const newInputRef = useRef();
  const [notes, setNotes] = useState([]);
  const [followEdit, setFollowEdit] = useState(false);
  const [editText, setEditText] = useState();
  useEffect(() => {
    const getNotes = async () => {
      const result = await fetch(`${API_BASE_URL}api/posts`);
      const data = await result.json();
      console.log(data);
      setNotes(data);
    };
    getNotes();
  }, []);

  useEffect(() => {}, [notes]);

  const addNewText = (newText) => {
    setNotes((notes) => {
      return [...notes, newText];
    });
  };

  const deleteHandler = async (el) => {
    const newNotes = notes.filter((text) => text.id !== el.id);
    setNotes(newNotes);
    if (!el.id) {
      return;
    }
    const response = await fetch(`${API_BASE_URL}api/posts/${el.id}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const handleChange = (event) => {
    const receivedInput = event.target.value;
    setEditText(receivedInput);
  };

  const updateHandler = (key) => {
    setFollowEdit(true);
  };

  const editSubmitHandler = async (key) => {
    setNotes(
      notes.map((note) =>
        note.id === key ? { ...note, text: editText } : note
      )
    );

    setFollowEdit(false);
    const response = await fetch(`${API_BASE_URL}api/posts/${key}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: editText.toString(),
      }),
    });

    const json = await response.json();
    console.log(json);
  };
  return (
    <div className="main-content">
      <Form notes={notes} addNewText={addNewText} />
      <div>
        {notes.map((el, i) => {
          return (
            <div key={`${i}-${el}`} id={`${i + 1}`}>
              {el.text}
              <button
                onClick={() => {
                  deleteHandler(el);
                }}
              >
                Delete
              </button>
              {!followEdit ? (
                <button
                  onClick={() => {
                    updateHandler(el.id);
                  }}
                >
                  Update
                </button>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    editSubmitHandler(el.id);
                  }}
                >
                  <input type="text" onChange={handleChange} />
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
