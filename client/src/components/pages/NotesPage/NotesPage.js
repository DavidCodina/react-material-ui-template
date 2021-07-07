import React, { useEffect, useState } from 'react'
import Typography     from '@material-ui/core/Typography';
import Divider        from '@material-ui/core/Divider';
import Container      from '@material-ui/core/Container';
import NoteCard       from '../../shared/NoteCard';
import Masonry        from 'react-masonry-css'; // npm i react-masonry-css


function reverseArray(array){
  const reversedArray = [];
  for (let i = array.length-1; i >= 0; i--){
    reversedArray.push(array[i]);
  }
  return reversedArray;
}


/* =======================================================================

======================================================================= */


export function NotesPage(props){
  const [notes, setNotes] = useState([]);
  // These are not currently matched to the same as Material UI.
  // They seem to be using max-width.
  const breakpoints = { default: 3, 1100: 2, 700: 1 };


  useEffect(() => {
    fetch('http://localhost:5000/notes')
      .then(res => res.json())
      .then(data => {
        const reversedArray = reverseArray(data);
        setNotes(reversedArray);
      })
      .catch(err => console.error(err));
  }, []);


  // handleDelete is passed in from the outside, so we can filter out the deleted item.
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/notes/${id}`, { method: 'DELETE' });
      const newNotes = notes.filter(note => note.id !== id);
      setNotes(newNotes);
    } catch(err){
      console.error(err);
    }
  };


  return (
    <React.Fragment>
      <Typography 
        variant="h3"
        component="h1" 
        align="center"
        my={3} 
        className="text-3d" 
        style={{ margin: '0 auto 25px auto', fontWeight: 600 }}
      >Notes</Typography>


      <Divider style={{ margin: '25px auto', height: 2, borderRadius: '50%' }} />


      <Container disableGutters>
        <Masonry
          breakpointCols={breakpoints}
          className="masonry-grid"
          columnClassName="masonry-grid-column">
          {
            notes.map(note => (
              <div key={note.id}>
                <NoteCard note={note} handleDelete={handleDelete} />
              </div>
            ))
          }
        </Masonry>
        
      </Container>
    </React.Fragment>     
  );
}

