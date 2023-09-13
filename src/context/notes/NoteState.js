import { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {
  const initialNotes = [
    {
      _id: '64fb08d7e46a5412c3410c2a',
      user: '64f467555cde30d3eeb188fe',
      title: 'Note1',
      description: 'First Note',
      tag: 'personal',
      date: '2023-09-08T11:43:19.616Z',
      __v: 0,
    },
    {
      _id: '64fb08e3e46a5412c3410c2c',
      user: '64f467555cde30d3eeb188fe',
      title: 'Note2',
      description: 'Must Add',
      tag: 'personal',
      date: '2023-09-08T11:43:31.972Z',
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(initialNotes);

  // add a note
  const addNote = (title, description, tag) => {
    console.log('adding a note');
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
  const deleteNote = (id) => {
    console.log('deleting note ' + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // edit a note
  const editNote = () => {};

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
