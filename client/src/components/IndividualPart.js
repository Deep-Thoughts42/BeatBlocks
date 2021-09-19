import { React, useState, useEffect } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import axios from 'axios';

import PaymentForm from './Payment';

function IndividualPart(props) {
    // console.log(props)

    const [showBuyButton, setShowBuyButton] = useState(false)
    const [showPlayButton, setShowPlayButton] = useState(false)
    const [playing, setPlaying] = useState(false)
    useEffect(() => {
        if (props.audio == null) {
            console.log("There is no audio")
            setShowBuyButton(true)
            console.log(props.songId)
        }
        if (props.owner !== "none") {
            setShowBuyButton(false)
        }
        if (props.audio != null) {
    
            setShowPlayButton(true)
        }

    }, [])

    // should handle the playback of the audio given props.audio
    function handlePlay() {
        var snd = new Audio("data:audio/x-mp3;base64, " + props.audio);
        
        snd.play()
           
            
        


    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);




    return (
        <div>
            <Card style={{ backgroundColor: "#111111" }} className="p-3 mr-1">
                <Card.Header as="h6" style={{ backgroundColor: "#333333" }} className="rounded mb-1">Part: {props.index + 1} | Owner: {props.owner.substring(props.owner.length - 4, props.owner.length)}</Card.Header>
                <Card.Text className="border border-white mt-2 rounded">
                    {showBuyButton &&
                        <Button className="w-100" onClick={handleShow}>Buy</Button>
                    }
                    {showPlayButton &&
                        <Button className="w-100" onClick={handlePlay}>Play</Button>
                    }
                </Card.Text>
            </Card>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                rounded

            >
                <Modal.Header style={{ backgroundColor: "#333333" }}>
                    <Modal.Title>Purchase Part {props.index + 1} for Song {props.songNo}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: "#222222" }}>
                    <PaymentForm songId={props.songId} songNo={props.songNo} part={props.index + 1}></PaymentForm>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: "#222222" }}>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>

        </div>

    )


}

export default IndividualPart;