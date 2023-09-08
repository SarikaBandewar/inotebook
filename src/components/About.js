import React, { useContext, useEffect } from 'react';
import noteContext from '../context/notes/NoteContext';

function About() {
  const a = useContext(noteContext);
  useEffect(() => {
    a.update();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <h2>
        This is about {a.state.name} and he is in class {a.state.class}
      </h2>
    </div>
  );
}

export default About;
