import React from 'react';
import Sound from 'react-sound';
import { Button, Container } from 'react-bootstrap';
import "./MusicMaker.css"
import axios from "axios";

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

const _ = require('lodash');
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
const noteTime = 200;

let startGrid = new Array(noteSet.length);
for (var i = 0; i < startGrid.length; i++) {
    startGrid[i] = new Array(gridLength)
    for(var j = 0; j < gridLength; j++){
       startGrid[i][j] = false;
    }
}

export default function MusicMaker() {
    const [grid, setGrid] = React.useState(startGrid)

    async function play(){
        let i = 0;
        for(const itr of grid[0]){
            const col = getCol(grid, i)
            col.forEach((val, num)=>{
                if(val){
                    var snd = new Audio(noteSet[num].file);
                    snd.play()
                }
            })
            await sleep(noteTime);
            i++;
        }
    }
    async function submitAudio(){
        const inputlist = [['./files/a-3.mp3', './files/c6.mp3', './files/b3.mp3' ], ['./files/b3.mp3'], ['./files/a-3.mp3']]
        const res = await axios.post("http://localhost:8080/stackAudio", {
            "filesArray": inputlist
        })
        console.log(res)
    }

    return (
        <Container>
            <Button onClick={play}>Play</Button>
            <Button onClick={submitAudio}>Submit</Button>
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
                        const clone = _.cloneDeep(grid)
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

const getCol = (arr, n) => arr.map(x => x[n]);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}