import logo from './images/logo.svg';
import './css/app.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import NavbarMain from './components/Navbar';
import PaymentForm from './components/Payment';
import SongList from './components/SongList';
import MusicMaker from './components/MusicMaker'
import { Button, Container, Row, Col } from 'react-bootstrap';

import React from 'react';

function App() {

 

  const [press, setPress] = React.useState(false);

  return (
    <div >
      <NavbarMain />

      <Container fluid='lg'>
        <div className="mt-8"/>
        
        <h1 className="mb-2">Welcome to BeatBlocks!</h1>
        
        <SongList/>
        <button onClick={()=>{setPress(true)}}>
        Play
        </button>      
        {press && <MusicMaker />}
  
      </Container>
    </div>
  );
}


export default App;
