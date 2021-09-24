import React from 'react'
import { useContext } from 'react'
import Notecontext from '../Context/Notecontext'

export default function Note(props) {
  const {note,updatethenote}=props;
  const style={
    width: "18rem"
  }
  const context=useContext(Notecontext);
  const {deletenote}=context;
  
 
  return (
        <div className="col-md-4 my-2">
        <div className="card" style={style}>
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i className="fas fa-trash-alt mx-2" onClick={()=>deletenote(note._id)}> </i>
          <i className="fas fa-pen-square" onClick={()=>updatethenote(note)}></i>
        </div>
      </div>
      </div>
    )
}
