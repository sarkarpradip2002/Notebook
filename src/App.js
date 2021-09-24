import './App.css';
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Notestate from './Context/Notestate';
import Login from './components/Login';
import Signup from './components/Signup'
import Alert from './components/Alert';
import { useState } from 'react';

function App() {
  const [alert, setalert] = useState(null)
  const [color, setcolor] = useState(null)
  const showalert = (message,newcolor) => {
   setalert(message);
   setcolor(newcolor)
  }
  return (
    <Notestate>
    <Router>
    <Navbar showalert={showalert}/>
    <Alert alert={alert} color={color} showalert={showalert}/>
    <Switch><Route exact path='/'>
        <Home showalert={showalert}/>
      </Route>
      <Route exact path='/about'>
        <About/>
      </Route>
      <Route exact path='/login'>
        <Login showalert={showalert}/>
      </Route>
      <Route exact  path='/signup'>
        <Signup showalert={showalert}/>
      </Route>
    </Switch>
    </Router>
    </Notestate>
  );
}

export default App;
