var ffmpeg = require('fluent-ffmpeg');
const fs = require('fs')



inputlist = [['../files/a-3.mp3', '../files/c6.mp3', '../files/b3.mp3' ], ['../files/b3.mp3'], ['../files/a-3.mp3'], ['../files/a-3.mp3', '../files/c6.mp3', '../files/c4.mp3' ]]

input_single = ['../files/a-3.mp3', '../files/c6.mp3', '../files/b3.mp3' ]


// Layer tracks on top of eachother
function mixAudio (filesArray, endPath, tempPath) {

    var chainedInputs = filesArray.reduce((result, inputItem) => result.addInput(inputItem), ffmpeg());
    
    chainedInputs
    .complexFilter([{
    filter: 'amix',
    inputs: chainedInputs.length,
    options: ['duration=first','dropout_transition=0']
    }])
    .saveToFile(endPath, tempPath);

}


// Add tracks to the back of eachother
function concatenateAudio (filesArray, endPath, tempPath) {
    var chainedInputs = filesArray.reduce((result, inputItem) => result.addInput(inputItem), ffmpeg());
    chainedInputs.mergeToFile(endPath, tempPath)
}

let crypto = require("crypto");



function completeAudio (filesArray) {
    let final_list = []
    for(var i = 0; i < filesArray.length; i++)  {
        let filename = "./"+ crypto.randomBytes(20).toString('hex')+".mp3";
        if (filesArray[i].length > 1)  {
        
            mixAudio(filesArray[i], filename, './tmp')
            final_list.push(filename)

        }
        else {
            final_list.push(filesArray[i][0])
        }
    }

    return final_list
}

// concatenateAudio(completeAudio(filesArray), 'pleasework.mp3', './')



concatenateAudio(input_single, "bob23343.mp3", './')