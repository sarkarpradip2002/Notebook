import React from 'react'
import { useContext } from 'react'
import { useState } from 'react';
import Notecontext from '../Context/Notecontext'

export default function Addnote(props) {
    const context=useContext(Notecontext);
    const [title, settitle] = useState(" ")
    const [description, setdescription] = useState(" ")
    const addnote=(e)=>{
        e.preventDefault();
        context.addthenote(title,description);
        props.showalert("Note added successfully",'success');
        settitle('');
        setdescription('');
    }
    const onchangevalue=(event)=>{
        settitle(event.target.value)
    }
    const onchangedes=(event)=>{
        setdescription(event.target.value)
    }
    const style={
        textAlign :'center',
        backgroundColor: '#8989e0',
        color :'white',
        padding :'10px',
        borderRadius:'500px',
    }
    return (
        <div>
        <h1 className="container my-2" style={style}>Add a Note</h1>
            <form className="container">
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title"aria-describedby="emailHelp" placeholder="Enter a title..." value={title} onChange={onchangevalue}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" placeholder='Enter a description...' value={description} onChange={onchangedes}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={addnote}>Add Note</button>
                </form>

           </div>
    )
}
