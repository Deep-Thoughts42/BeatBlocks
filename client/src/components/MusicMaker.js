import React from 'react';
import Sound from 'react-sound';
import { Button, Container } from 'react-bootstrap';
import "./MusicMaker.css"

import a_3 from './audio/a-3.mp3' 
import a_4 from './audio/a-4.mp3'
import a_5 from './audio/a-5.mp3'
import a3 from './audio/a3.mp3'
import a4 from './audio/a4.mp3'
import a5 from './audio/a5.mp3'
import b3 from './audio/b3.mp3'
import b4 from './audio/b4.mp3'
import b5 from './audio/b5.mp3'
import c_3 from './audio/c-3.mp3'
import c_4 from './audio/c-4.mp3'
import c_5 from './audio/c-5.mp3'
import c3 from './audio/c3.mp3'
import c4 from './audio/c4.mp3'
import c5 from './audio/c5.mp3'
import c6 from './audio/c6.mp3'
import d_3 from './audio/d-3.mp3'
import d_4 from './audio/d-4.mp3'
import d_5 from './audio/d-5.mp3'
import d3 from './audio/d3.mp3'
import d4 from './audio/d4.mp3'
import d5 from './audio/d5.mp3'
import e3 from './audio/e3.mp3'
import e4 from './audio/e4.mp3'
import e5 from './audio/e5.mp3'
import f_3 from './audio/f-3.mp3'
import f_4 from './audio/f-4.mp3'
import f_5 from './audio/f-5.mp3'
import f3 from './audio/f3.mp3'
import f4 from './audio/f4.mp3'
import f5 from './audio/f5.mp3'
import g_3 from './audio/g-3.mp3'
import g_4 from './audio/g-4.mp3'
import g_5 from './audio/g-5.mp3'
import g3 from './audio/g3.mp3'
import g4 from './audio/g4.mp3'
import g5 from './audio/g5.mp3'


export default function MusicMaker() {
    const [replay, setReplay] = React.useState(true)

    const all = [a_3, a_4, a_5, a3, a4, a5, b3, b4, b5, c_3, c_4, c_5, c3, c4, c5, c6, d_3, d_4, d_5 , d3, d4, d5, e3, e4, e5, f_3, f_4, f_5, f3, f4, f5, g_3, g_4, g_5, g3, g4, g5];

    return (

        <Container>
            <Button onClick={()=>{setReplay(!replay)}}>Replay</Button>
            {replay &&  
                <Chain notes={[a3, a4, a5, a3, a3, a5]} finished={()=>{setReplay(false)}} rate={1.5}/>
            }
            <Cell />
        </Container>
    );
}

function Row(props){
    let render = props.allNotes.forEach(element => {
        
    });
}

function Cell(props){
    return (
        <div className="cell" >
            A4
        </div>
    )
}

function Chain(props){
    const [pointer, setPointer] = React.useState(0)
    function next(){
        if(pointer != props.notes.length-1){
            setPointer(pointer + 1)
        }else {
            props.finished()
        }
    }
    return (
        <Sound
        url={props.notes[pointer]}
        playbackRate={props.rate}
        playStatus={Sound.status.PLAYING}
        onFinishedPlaying={next}
      />
    )
}
