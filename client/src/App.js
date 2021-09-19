import logo from './images/logo.svg';
import './css/app.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import NavbarMain from './components/Navbar';
import PaymentForm from './components/Payment';
import SongList from './components/SongList';
import { Button, Container, Row, Col } from 'react-bootstrap';


function App() {

  function handleClick() {
    axios.get('http://localhost:8080/getSongs')
      .then(function (response) {
        // handle success
        // console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);

      })
  }

  return (
    <div >
      <NavbarMain />

      <Container fluid='lg'>
        <h1>test</h1>
        <PaymentForm />
        <Button onClick={handleClick}>Add Button </Button>
        <SongList/>
        
      </Container>
    </div>
  );
}


export default App;
