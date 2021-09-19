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
const allSounds = [a_3, a_4, a_5, a3, a4, a5, b3, b4, b5, c_3, c_4, c_5, c3, c4, c5, c6, d_3, d_4, d_5 , d3, d4, d5, e3, e4, e5, f_3, f_4, f_5, f3, f4, f5, g_3, g_4, g_5, g3, g4, g5];
const allText = ["a_3", "a_4", "a_5", "a3", "a4", "a5", "b3", "b4", "b5", "c_3", "c_4", "c_5", "c3", "c4", "c5", "c6", "d_3", "d_4", "d_5", "d3", "d4", "d5", "e3", "e4", "e5", "f_3", "f_4", "f_5", "f3", "f4", "f5", "g_3", "g_4", "g_5", "g3", "g4", "g5"];

const audioLimit = 40;
const rawNoteSet = allSounds.map((audio, i)=>{
    return {name: allText[i], file: audio, amount: 0}
})
for(var i = 0; i <= audioLimit; i++){
    let index = Math.floor(Math.random() * rawNoteSet.length);
    rawNoteSet[index].amount++;
}
const noteSet = []
rawNoteSet.forEach((obj)=>{
    if(obj.amount > 0){
        noteSet.push(obj)
    }
})
console.log(noteSet)
const gridLength = 20;
const noteTime = 1000;

let startGrid = new Array(noteSet.length);
for (var i = 0; i < startGrid.length; i++) {
    startGrid[i] = new Array(gridLength).fill(0);
}

export default function MusicMaker() {
    const [replay, setReplay] = React.useState(true)
    const [grid, setGrid] = React.useState(startGrid)


    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }


    async function play(){
        let i = 0
        for(const item of grid[0]){
            console.log(i)
            const col = getCol(grid, i)
            col.forEach((val, num) => {
                if(val){
                    var snd = new Audio(noteSet[num].file);
                    snd.play()
                }
            })
            i++;
            await sleep(2000);
        }
    }

    
   
    return (

        <Container>
            <Button onClick={play}>Replay</Button>
            <div className="center">

                <div className="grid">
                    {noteSet.map((el, i) => {
                        return (
                            <Row grid={grid} setGrid={setGrid} index={i}/>
                        )
                    })}
                </div>
            </div>

        </Container>
    );
}

function Row(props){
    const {grid, setGrid, index} = props;
    return (
        <div className="row-container">
            <div>{`${noteSet[index].name} (${noteSet[index].amount})`}</div>
            <div className="row">
            {grid[0].map((el, i) => {
                return (
                    <Cell key={noteSet[i].name + index} enabled={grid[index][i]} onPress={()=>{
                        const clone = {...grid};
                        clone[index][i] = !grid[index][i]
                        setGrid(clone)
                        var snd = new Audio(noteSet[index].file);
                        snd.play()
                    }}/>
                )
            })}
            </div>
        </div>
    )
}


function Cell(props){
    const {enabled, onPress} = props
    return (
        <div className={enabled ? "cell_enabled" : "cell"} onClick={onPress}/>
    )
}

function Chain(props){
    const {grid, rate, finished} = props;
    const [pointer, setPointer] = React.useState(0)
    function next(){
        if(pointer != gridLength-1){
            setPointer(pointer + 1)
        }else {
            finished()
        }
    }

    const col = getCol(grid, pointer)
    console.log(col)
    const arr = [a_3]


}

function getCol(matrix, col){
    var column = [];
    for(var i=0; i<matrix.length; i++){
       column.push(matrix[i][col]);
    }
    return column;
 }
// {col.map((val, i) => {
//     if(!val) return
//     if(i == 0){
//         <Sound
//             url={noteSet[i].file}
//             playbackRate={props.rate}
//             playStatus={Sound.status.PLAYING}
//             onFinishedPlaying={next}
//             key={noteSet[i] + i + "player"}
//         />
//     }else {
//         <Sound
//             url={noteSet[i].file}
//             playbackRate={props.rate}
//             playStatus={Sound.status.PLAYING}
//             key={noteSet[i] + i + "player"}
//             />
//     }
// })}