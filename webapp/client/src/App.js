import logo from './images/logo.svg';
import './css/app.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import NavbarMain from './components/Navbar';
import {Button, Container, Row, Col  } from 'react-bootstrap';
function App() {
  return (
    <div >
      <NavbarMain/>
      
      <Container fluid='lg'>
        <h1>test</h1>
      </Container>
    </div>
  );
}

export default App;
