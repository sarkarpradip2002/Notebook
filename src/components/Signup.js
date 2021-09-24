import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

export default function Signup(props) {
    const [details, setdetails] = useState({ name: '', email: '', password: '' })
    const history=useHistory();

    const onsubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5100/api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: details.name, email: details.email, password: details.password }),
        })
        const add = await response.json();
        console.log(add);
        if(add.error)
        {
           props.showalert(add.error,'danger');
            
        }
        if(add.success)
        {
            localStorage.setItem('token',add.token);
            props.showalert('Success!! Created your new account','success');
            history.push('/');
        }
    }

    const onchange = (event) => {
        setdetails({ ...details, [event.target.name]: event.target.value })
    }
    return (
        <div className="container my-4">
            <form onSubmit={onsubmit}>
                <div className="mb-3">
                    <label htmlfor="name" className="form-label">Name</label>
                    <input type="text" name="name" value={details.name} onChange={onchange} className="form-control" id="name" minLength={3}  required />
                </div>
                <div className="mb-3">
                    <label htmlfor="email" className="form-label">Email address</label>
                    <input type="email" name="email" className="form-control" value={details.email} onChange={onchange} id="email" aria-describedby="emailHelp" required />
                </div>
                <div className="mb-3">
                    <label htmlfor="password" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" value={details.password} onChange={onchange} id="password" minLength={5} required />
                </div>
                <button type="submit" className="btn btn-primary">Sign up</button>
            </form>
        </div>
    )
}
