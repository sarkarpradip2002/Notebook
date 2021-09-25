import {React,useContext} from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router'
import Notecontext from '../Context/Notecontext';

export default function Navbar(props) {
  const context=useContext(Notecontext);
  const {fetchnote}=context;
  
  const location=useLocation();
  const token=localStorage.getItem('token');

  const deletetoken=async()=>{
    props.showalert('You logged out!!','warning');
    localStorage.removeItem('token');
    await fetchnote();
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Navbar</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${(location.pathname===`/` ? 'active' : ' ')}`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${(location.pathname===`/about` ? 'active' : ' ')}`} to="/about">About</Link>
            </li>
          </ul>
          {!token ?
          <>
          <Link class="btn btn-primary mx-1" to="/login" role="button">Login</Link>
          <Link class="btn btn-primary mx-1" to="/signup" role="button">Signup</Link></> :<><Link class="btn btn-primary mx-1" role="button" to='/' onClick={deletetoken}>Logout</Link></> }
        </div>
      </div>
    </nav>
  )
}

