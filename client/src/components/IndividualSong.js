import { React, useState, useEffect } from 'react';
import { Container, Button, CardColumns, Card, CardGroup } from 'react-bootstrap';
import axios from 'axios';

import IndividualPart from './IndividualPart';


function IndividualSong(props) {

    const [showButton, setShowButton] = useState(false)
    const [audio, setAudio] = ("")

    useEffect(() => {
        if (props.completed != "") {
            setShowButton(true)
            // console.log(props.parts)

            axios.post('http://localhost:8080/songFinal', {
                'filePaths': props.filePaths

            })
                .then((res) => {
                    setAudio(res.data.audio)
                })



        }

    }, [])

    let parts = props.parts;



    function playAudio() {
        var snd = new Audio("data:audio/x-mp3;base64, " + audio);

        snd.play()

    }






    return (
        <Card style={{ backgroundColor: "#444444" }} className="mb-3 mt-1">
            <Card.Header as="h5" style={{ backgroundColor: "#333333" }}>{props.songName} | Song Number: {props.index + 1}</Card.Header>
            <Card.Body>
                <CardGroup>
                    {true &&
                        parts.map((entry, index) => {
                            // console.log(index);

                            return <IndividualPart songNo={props.index + 1} songId={props.songId} owner={entry.owner} index={index} audio={entry.audio} />

                        })
                    }

                </CardGroup>



                {/* <Card.Text>
                    With supporting text below as a natural lead-in to additional content.
                </Card.Text> */}
                {showButton &&
                    <Button variant="primary"></Button>
                }
                {(audio !== "") &&

                    <Button onClick={playAudio} className="mt-2">Play!</Button>


                }

            </Card.Body>

        </Card>


    )



}

export default IndividualSong;