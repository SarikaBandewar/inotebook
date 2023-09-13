import { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {
  const host = 'http://localhost:5000';

  const initialNotes = [];

  const [notes, setNotes] = useState(initialNotes);

  const getNotes = async () => {
    // API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmNDY3NTU1Y2RlMzBkM2VlYjE4OGZlIn0sImlhdCI6MTY5MzgyNjkyNH0.cI74AHiB9uY-STo4H_aYyfJ8A3Ln8_azZ0LMRuhDRqo',
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  // add a note
  const addNote = async (title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmNDY3NTU1Y2RlMzBkM2VlYjE4OGZlIn0sImlhdCI6MTY5MzgyNjkyNH0.cI74AHiB9uY-STo4H_aYyfJ8A3Ln8_azZ0LMRuhDRqo',
      },
      body: JSON.stringify({
        title: title,
        description: description,
        tag: tag,
      }),
    });
    const json = response.json();

    // console.log('adding a note');
    let note = {
      _id: '64fb08e3e46a5412c3410c2c',
      user: '64f467555cde30d3eeb188fe',
      title: title,
      description: description,
      tag: tag,
      date: '2023-09-08T11:43:31.972Z',
      __v: 0,
    };

    setNotes(notes.concat(note));
  };

  // delete a note
  const deleteNote = async (id) => {
    // console.log('deleting note ' + id);
    // API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmNDY3NTU1Y2RlMzBkM2VlYjE4OGZlIn0sImlhdCI6MTY5MzgyNjkyNH0.cI74AHiB9uY-STo4H_aYyfJ8A3Ln8_azZ0LMRuhDRqo',
      },
    });
    const json = response.json();
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // edit a note
  const editNote = async (id, title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmNDY3NTU1Y2RlMzBkM2VlYjE4OGZlIn0sImlhdCI6MTY5MzgyNjkyNH0.cI74AHiB9uY-STo4H_aYyfJ8A3Ln8_azZ0LMRuhDRqo',
      },
      body: JSON.stringify({
        title: title,
        description: description,
        tag: tag,
      }),
    });
    const json = response.json();

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
