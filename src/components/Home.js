import React from 'react'
import Notelist from './Notelist'
import Addnote from './Addnote'

export default function Home(props) {
    
    const style={
        textAlign :'center',
        backgroundColor: '#8989e0',
        color :'white',
        padding :'10px',
        borderRadius:'500px',
        marginTop:'30px',
    }
    return (
        <>
        <Addnote showalert={props.showalert}/>
        <div className="container">
                <h1 style={style}>Your notes</h1>
            <Notelist showalert={props.showalert}/>
            </div>
        </>
    )
}
