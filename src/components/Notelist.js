import React, { useRef } from 'react'
import Notecontext from '../Context/Notecontext'
import Note from './Note';
import { useContext, useEffect,useState } from 'react'

export default function Notelist(props) {
    const context = useContext(Notecontext);
    const { notes, fetchnote ,updatenote} = context;
    useEffect(() => {
        fetchnote();
    }, [])
    const style={
        textAlign:'center',
        fontSize:'20px',
    }
    const ref=useRef(null);
    const[note, setnote]=useState({_id:"",title:"",description:""})
    
    const updatethenote =(currentnote) => {
        setnote({_id:currentnote._id,title:currentnote.title,description:currentnote.description});
      ref.current.click();

    }
    const handletitlechange=(event)=>{
   setnote({title:event.target.value,description:note.description,_id:note._id})
    }
    const handledescriptionchange=(event)=>{
        setnote({title:note.title,description:event.target.value,_id:note._id})
         }

         const updateit=(e)=>{
           e.preventDefault();
            updatenote(note._id,note.title,note.description)
            props.showalert('Note updated successfully!!!','success');
         }
         const token=localStorage.getItem('token');
    return (
        <>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label" >Title</label>
                    <input type="text" className="form-control" id="title" name="title"aria-describedby="emailHelp" placeholder="Enter the updated title..." value={note.title} onChange={handletitlechange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" placeholder='Enter the updatd description...' value={note.description} onChange={handledescriptionchange} />
                </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={updateit}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
            {!token?<div className="container" style={style}><strong>Please login to see your notes</strong></div>:
            <div className="container row">
                
                {notes.map((note) => {
                    return <Note key={note._id} note={note} showalert={props.showalert} updatethenote={updatethenote} />
                })}
                
            </div>
}
        </>
    )
}
