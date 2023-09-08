import { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {
  const s1 = {
    name: 'Sarika',
    class: '10B',
  };

  const [state, setState] = useState(s1);

  const update = () => {
    setTimeout(() => {
      setState({
        name: 'Nidhi',
        class: '10A',
      });
    }, 1000);
  };

  return (
    <NoteContext.Provider value={{ state, update }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
