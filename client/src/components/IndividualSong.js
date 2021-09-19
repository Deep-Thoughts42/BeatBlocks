import { React, useState, useEffect } from 'react';
import { Container, Button, CardColumns, Card, CardGroup } from 'react-bootstrap';
import axios from 'axios';

import IndividualPart from './IndividualPart';


function IndividualSong(props) {

    const [showButton, setShowButton] = useState(false)

    useEffect(() => {
        if (props.completed != "") {
            setShowButton(true)
            // console.log(props.parts)
        }

    }, [])

    let parts = props.parts;
    
    


    return (
        <Card style={{ backgroundColor: "#444444" }} className="mb-2 mt-1">
            <Card.Header as="h5" style={{ backgroundColor: "#333333" }}>{props.songName} | Song Number: {props.index + 1}</Card.Header>
            <Card.Body>
                <CardGroup>
                    {true &&
                        parts.map((entry, index) => {
                            // console.log(index);

                            return <IndividualPart songNo={props.index +1} songId={entry.songId} owner={entry.owner} index={index} audio={entry.audio}/>

                        })
                    }
     
                </CardGroup>


                <Card.Text>
                    With supporting text below as a natural lead-in to additional content.
                </Card.Text>
                {showButton &&
                    <Button variant="primary"></Button>
                }

            </Card.Body>

        </Card>


    )



}

export default IndividualSong;