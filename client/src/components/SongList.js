import { React, useState, useEffect } from 'react';
import { Container, Button, CardColumns, Card } from 'react-bootstrap';
import axios from 'axios';

import IndividualSong from './IndividualSong';


function SongList() {

    const [dbData, setdbData] = useState();
    const [showCards, setShowCards] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8080/getSongs')
            .then(function (response) {
                // handle success
                // console.log(response.data.songs);

                let stateInput = response.data.songs;
                console.log(stateInput)
                // console.log(stateInput);
                setdbData(stateInput);
                
                setShowCards(true);


                //   setdbData(response.data.songs)
                // console.log(dbData)
            })
            .catch(function (error) {
                // handle error
                console.log(error);

            })



    }, [])

    function view () {
        console.log(dbData);
    }


    return (
        <div>
            <CardColumns>
                {showCards &&
                    dbData.map((entry, index) => {
                        return <IndividualSong songId={entry.songId} songName={entry.songName} parts={entry.parts} index={index} completed={entry.completed} filePaths={entry.filePaths} />
                    })
                }
            </CardColumns>
        </div>
    );
}

export default SongList;