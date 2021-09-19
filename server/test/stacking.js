var ffmpeg = require('fluent-ffmpeg');
const fs = require('fs')



inputlist = ['../files/a-3.mp3', '../files/c6.mp3', '../files/b3.mp3' ]


// Layer tracks on top of eachother
function mixAudio (filesArray, endPath, tempPath) {

    var chainedInputs = filesArray.reduce((result, inputItem) => result.addInput(inputItem), ffmpeg());
    
    chainedInputs
    .complexFilter([{
    filter: 'amix',
    inputs: chainedInputs.length,
    options: ['duration=first','dropout_transition=0']
    }])
    .output(endPath, tempPath);

}




// Add tracks to the back of eachother
function concatenateAudio (filesArray, endPath, tempPath) {
    var chainedInputs = filesArray.reduce((result, inputItem) => result.addInput(inputItem), ffmpeg());
    chainedInputs.mergeToFile(endPath, tempPath)
}






// concatenateAudio(inputlist, './conca.mp3', './')



 


