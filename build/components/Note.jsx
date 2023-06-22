import React from 'react'

const Note = ({ note, toggleImportance }) => {
  const label= note.important
    return (
      <li className='note'>
        {note.content}
        <button onClick={toggleImportance}> {label ? "important" : "not important"}</button>
      </li>
    )
  }

export default Note