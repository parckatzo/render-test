
import Note from './components/Note'
import { useEffect, useState } from 'react'
import noteService from './services/notes'
import Notification from './components/Notification'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2022</em>
    </div>
  )
}

const AppNotes = () => {
  const [notes, setNotes] = useState(null) // notes es un array 
  const [newNote, setNewNote] = useState("new note...")
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        setNotes(response)
      })
  }, [])
  
  if (!notes){
    return null
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote).then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const addNote = (event) =>{
    event.preventDefault() //IMPORTANTE PARA QUE NO SE REINICIE LA PAGINA
    const noteObject = {
      content: newNote,  //nueva nota = input de form
      important: Math.random() < 0.5, //50% de ser importante
    }
    noteService
      .create(noteObject)
      .then(response => {
        setNotes(notes.concat(response))
        setNewNote('')
      })
      .catch(error =>{
        console('ERROR')
      })
  }
  const handleNoteChange = (event) =>{
    setNewNote(event.target.value)// setNueva nota = input de form
    }



  const notesToShow = showAll // si showAll is true ? mostrara todas las notas : si es falso filtrara las notas  
    ? notes
    : notes.filter(note => note.important === true)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note 
          key={note.id}
          note={note}
          toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
          <input 
          value={newNote}
          onChange={handleNoteChange}/>
          <button type='submit'> save</button>
      </form>
      <Footer/>
    </div>
  )
}


export default AppNotes
