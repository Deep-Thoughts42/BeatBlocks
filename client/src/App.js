import logo from './images/logo.svg';
import './css/app.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import NavbarMain from './components/Navbar';
import PaymentForm from './components/Payment';
import SongList from './components/SongList';
import MusicMaker from './components/MusicMaker'
import { Button, Container, Row, Col } from 'react-bootstrap';
import {Route, Switch, withRouter} from 'react-router-dom';
import "./css/app.css"

import React from 'react';

function Content(){
  return (
    <div className="center">
      <SongList/>
    </div>
  )
}

function App() {
  const [press, setPress] = React.useState(false);

  return (
    <div >
      <NavbarMain />
        <Switch>
            <Route exact path="/" component={Content}/>
            <Route path="/editProduct" component={MusicMaker}/>
          </Switch>
    </div>
  );
}


export default App;
