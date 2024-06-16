
var cycleCounter = 0;

var timeSec = 25*60;
// var timeSec = 5; 

display(timeSec);

display(cycleCounter);

var started = false;

var paused = false;

var onBreak = false;

const newButton = document.createElement('button');

function pause() {
    if(!paused){
        paused = true;
        clearInterval(tickInterval);

        newButton.textContent = 'Resume';

    } else {
        tickInterval = setInterval(timer, 1000);
        paused = false;
        newButton.textContent = 'Pause';
    }
}

var tickInterval;

function start() {
    if(!started){
        tickInterval = setInterval(timer, 1000);
        started = true;

        document.querySelector('#buttons').appendChild(newButton);
        newButton.textContent = 'Pause';
        newButton.onclick = pause;
    }

    document.querySelector('#start').classList.add("hidden");
}


const resetButton = document.createElement('button')

function reset(){
    resetButton.remove();
    // timeSec = 25*60;
    timeSec = 5;
    if(!started){
        tickInterval = setInterval(timer, 1000);
        started = true;

        document.querySelector('#buttons').appendChild(newButton);
        newButton.textContent = 'Pause';
        newButton.onclick = pause;
    }

    document.querySelector('#start').classList.add("hidden");
}

var myParagraph = document.getElementById("break");

var count = document.getElementById("cycleCounter");


function timer() {
    timeSec = timeSec-1;
    display(timeSec)

    if(timeSec == 0){
        clearInterval(tickInterval);
        if(!onBreak){
            document.body.style.backgroundColor= "#1d7a14";
            // document.body.style.color = "black";
            myParagraph.innerText = "Take a Break";
            timeSec = 5*60;
            // timeSec = 6;
            tickInterval = setInterval(timer, 1000);
            onBreak = true;
            // Remove pause button during break
            newButton.remove();
        } else {
            document.body.style.backgroundColor= "#03040e";
            timeSec=25*60
            display(timeSec)
            cycleCounter++;
            count.innerText = "Cycle Count: " + cycleCounter;
            started = false;
            onBreak = false;

            document.querySelector('#buttons').appendChild(resetButton);
            resetButton.textContent = 'Start Next Cycle';
            myParagraph.innerText = null;
            resetButton.onclick = reset;

        }
    }
}

// setInterval(timer, 1000);

function display() {
    var timeMin = Math.floor(timeSec/60);
    var timeRem = timeSec%60
    
    if(timeRem < 10){
        timeRem = "0" + timeRem;
    }
    document.getElementById("countdown").innerText = timeMin + ":" + timeRem;
}