import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

export default function Login(props) {
    const [details, setdetails] = useState({ email: '', password: '' })
    const history=useHistory();

    const onsubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5100/api/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: details.email, password: details.password }),
        })
        const add = await response.json();
       
        if(add.error)
        {
            props.showalert(add.error,'danger');
        }
        if(add.success)
        {
            localStorage.setItem('token',add.token);
            props.showalert('Logged in successfully','success');
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
                    <label htmlfor="email" className="form-label">Email address</label>
                    <input type="email" name="email" className="form-control" id="email" value={details.email} onChange={onchange} aria-describedby="emailHelp" />
                    
                </div>
                <div className="mb-3">
                    <label htmlfor="password" className="form-label">Password</label>
                    <input type="password" value={details.password} onChange={onchange} name="password" className="form-control" id="password" />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}
