import Notecontext from "./Notecontext";
import { useState } from "react";

const Notestate=(props)=>{
  const initialnotes=[]
  const [notes, setnotes] = useState(initialnotes)

  // Fetch all notes
  const fetchnote=async()=>{
    const url=`http://localhost:5100/api/notes`
 const response=await fetch(url, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0MDA3MGMxYjRiMTkwMGIxYmNkY2FkIn0sImlhdCI6MTYzMTcxMTk4MH0.ddq9r_rQxTU5vEJSTkHz7oKhjWnATw8dxnRzVtgmi1w'
  },
})
   const get=await response.json();
   setnotes(get)
  }

  // Add the note       
      const addthenote=async (title,description)=>{
        const response=await fetch(`http://localhost:5100/api/notes/addnote`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
           'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0MDA3MGMxYjRiMTkwMGIxYmNkY2FkIn0sImlhdCI6MTYzMTcxMTk4MH0.ddq9r_rQxTU5vEJSTkHz7oKhjWnATw8dxnRzVtgmi1w'
         },
         body: JSON.stringify({title,description}),
       })
       const add=await response.json();
        setnotes(notes.concat(add));
      }

// Delete the note
const deletenote=async (id)=>{
  const url=`http://localhost:5100/api/notes/deletenote/${id}`
  await fetch(url, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
    'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0MDA3MGMxYjRiMTkwMGIxYmNkY2FkIn0sImlhdCI6MTYzMTcxMTk4MH0.ddq9r_rQxTU5vEJSTkHz7oKhjWnATw8dxnRzVtgmi1w'
  },
})
    setnotes(notes.filter((note)=>{return note._id!==id}))
}

// Update the note
const updatenote=async (id,title,description)=>{
  const url=`http://localhost:5100/api/notes/updatenote/${id}`
  await fetch(url, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0MDA3MGMxYjRiMTkwMGIxYmNkY2FkIn0sImlhdCI6MTYzMTcxMTk4MH0.ddq9r_rQxTU5vEJSTkHz7oKhjWnATw8dxnRzVtgmi1w'
  },
  body: JSON.stringify({id,title,description}),
})
let newnotes=JSON.parse(JSON.stringify(notes));
  for (const key in newnotes) {
    if(newnotes[key]._id===id)
    {
      newnotes[key].title=title;
      newnotes[key].description=description;
    }
    
  }
  setnotes(newnotes)

}

return (
    <Notecontext.Provider value={{notes,setnotes,addthenote,deletenote,updatenote,fetchnote}}>
        {props.children}
    </Notecontext.Provider>
)
}

export default Notestate;