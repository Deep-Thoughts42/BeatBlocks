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

import React from 'react';

function Content(){
  return (
    <>
      <PaymentForm />
      <SongList/>
      <PaymentForm />
      <SongList/>
      <a href="/editProduct">
        <Button>Thing</Button>
      </a>
    </>
  )
}

function App() {
  const [press, setPress] = React.useState(false);

  return (
    <div >
      <NavbarMain />
      <Container fluid='lg'>
        <Switch>
            <Route exact path="/" component={Content}/>
            <Route path="/editProduct" component={MusicMaker}/>
          </Switch>
      </Container>
    </div>
  );
}


export default App;
